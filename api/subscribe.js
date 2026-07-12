/* =========================================================================
   Vercel serverless — email list subscribe.
   Supports (first match wins):
     1. KIT_API_KEY + KIT_FORM_ID  → Kit / ConvertKit forms API
     2. EMAIL_WEBHOOK_URL         → POST JSON { email, source, name? }
   Without credentials, returns { ok: false, reason: "not_configured" }
   so the Listen page can fall back to Linktree / emailSignup URL.
   ========================================================================= */

function okEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

async function subscribeKit(email, name) {
  const key = process.env.KIT_API_KEY || process.env.CONVERTKIT_API_KEY;
  const formId = process.env.KIT_FORM_ID || process.env.CONVERTKIT_FORM_ID;
  if (!key || !formId) return null;
  const body = { api_key: key, email: email };
  if (name) body.first_name = name;
  const res = await fetch("https://api.convertkit.com/v3/forms/" + formId + "/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error("kit_failed_" + res.status + (text ? "_" + text.slice(0, 120) : ""));
  }
  return { provider: "kit" };
}

async function subscribeWebhook(email, name, source) {
  const url = process.env.EMAIL_WEBHOOK_URL;
  if (!url) return null;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, name: name || null, source: source || "listen" })
  });
  if (!res.ok) throw new Error("webhook_failed_" + res.status);
  return { provider: "webhook" };
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    return res.status(200).json({
      ok: false,
      reason: "method_not_allowed",
      configured: !!(
        process.env.EMAIL_WEBHOOK_URL ||
        ((process.env.KIT_API_KEY || process.env.CONVERTKIT_API_KEY) &&
          (process.env.KIT_FORM_ID || process.env.CONVERTKIT_FORM_ID))
      )
    });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};
  const email = String(body.email || "").trim().toLowerCase();
  const name = String(body.name || "").trim().slice(0, 80);
  const source = String(body.source || "listen").slice(0, 40);

  if (!okEmail(email)) {
    return res.status(400).json({ ok: false, reason: "invalid_email" });
  }

  try {
    let result = await subscribeKit(email, name);
    if (!result) result = await subscribeWebhook(email, name, source);
    if (!result) {
      return res.status(200).json({ ok: false, reason: "not_configured" });
    }
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ ok: true, provider: result.provider });
  } catch (e) {
    console.error("[subscribe]", e);
    return res.status(200).json({ ok: false, reason: String((e && e.message) || e) });
  }
};
