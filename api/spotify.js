/* =========================================================================
   Vercel serverless function — live Spotify artist data.
   Uses the Client Credentials flow (no user login) to fetch public data:
   followers, popularity, top tracks, and album artwork.

   Requires two environment variables set in the Vercel project:
     SPOTIFY_CLIENT_ID
     SPOTIFY_CLIENT_SECRET
   Optional:
     SPOTIFY_ARTIST_ID  (defaults to Tinsley's artist id)

   If credentials are missing or Spotify errors, this returns a JSON body
   with { error: true } and the frontend falls back to curated data.
   ========================================================================= */

const ARTIST_ID = process.env.SPOTIFY_ARTIST_ID || "1encEkVjZ4iqby8BXZc8Pa";
const TTL_MS = 1000 * 60 * 60 * 6; // 6h in-memory cache (per warm lambda)

let cache = { data: null, ts: 0 };
let token = { value: null, exp: 0 };

async function getToken() {
  if (token.value && Date.now() < token.exp) return token.value;
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!id || !secret) throw new Error("missing_credentials");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(id + ":" + secret).toString("base64")
    },
    body: "grant_type=client_credentials"
  });
  if (!res.ok) throw new Error("token_failed_" + res.status);
  const json = await res.json();
  token = { value: json.access_token, exp: Date.now() + (json.expires_in - 60) * 1000 };
  return token.value;
}

module.exports = async (req, res) => {
  try {
    if (cache.data && Date.now() - cache.ts < TTL_MS) {
      res.setHeader("Cache-Control", "public, s-maxage=21600, stale-while-revalidate=86400");
      res.setHeader("X-Cache", "HIT");
      return res.status(200).json(cache.data);
    }

    const tok = await getToken();
    const headers = { Authorization: "Bearer " + tok };
    const market = "US";

    const [artistRes, topRes, albumsRes] = await Promise.all([
      fetch("https://api.spotify.com/v1/artists/" + ARTIST_ID, { headers }),
      fetch("https://api.spotify.com/v1/artists/" + ARTIST_ID + "/top-tracks?market=" + market, { headers }),
      fetch("https://api.spotify.com/v1/artists/" + ARTIST_ID + "/albums?include_groups=album,single&market=" + market + "&limit=50", { headers })
    ]);

    if (!artistRes.ok) throw new Error("artist_failed_" + artistRes.status);
    const artist = await artistRes.json();
    const top = topRes.ok ? await topRes.json() : { tracks: [] };
    const albums = albumsRes.ok ? await albumsRes.json() : { items: [] };

    const pickImg = (imgs) => (imgs && imgs.length ? (imgs[1] || imgs[0]).url : null);

    const artMap = {};
    (albums.items || []).forEach((a) => {
      if (a && a.name && a.images && a.images.length) artMap[a.name.toLowerCase()] = pickImg(a.images);
    });

    const payload = {
      updatedAt: new Date().toISOString(),
      artist: {
        name: artist.name,
        followers: (artist.followers && artist.followers.total) != null ? artist.followers.total : null,
        popularity: artist.popularity != null ? artist.popularity : null,
        genres: artist.genres || [],
        image: pickImg(artist.images),
        url: artist.external_urls ? artist.external_urls.spotify : null
      },
      topTracks: (top.tracks || []).slice(0, 8).map((t) => ({
        name: t.name,
        popularity: t.popularity,
        url: t.external_urls ? t.external_urls.spotify : null,
        album: t.album ? t.album.name : null,
        releaseDate: t.album ? t.album.release_date : null,
        image: t.album ? pickImg(t.album.images) : null
      })),
      albumArt: artMap
    };

    cache = { data: payload, ts: Date.now() };
    res.setHeader("Cache-Control", "public, s-maxage=21600, stale-while-revalidate=86400");
    res.setHeader("X-Cache", "MISS");
    return res.status(200).json(payload);
  } catch (e) {
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ error: true, reason: String((e && e.message) || e) });
  }
};
