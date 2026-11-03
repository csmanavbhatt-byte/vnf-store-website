// Vercel serverless proxy for the VNF Store Google Apps Script backend.
// Set GOOGLE_APPS_SCRIPT_URL in Vercel Project Settings > Environment Variables.
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  const backendUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!backendUrl) {
    return res.status(500).json({
      success: false,
      message: "Server configuration missing: GOOGLE_APPS_SCRIPT_URL"
    });
  }

  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const options = req.method === "POST"
      ? {
          method: "POST",
          redirect: "follow",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(req.body || {})
        }
      : { method: "GET", redirect: "follow" };

    const upstream = await fetch(backendUrl, options);
    const raw = await upstream.text();

    let payload;
    try {
      payload = JSON.parse(raw);
    } catch {
      return res.status(502).json({
        success: false,
        message: "The Google Apps Script backend returned a non-JSON response.",
        upstreamStatus: upstream.status
      });
    }

    return res.status(upstream.ok ? 200 : upstream.status).json(payload);
  } catch (error) {
    return res.status(502).json({
      success: false,
      message: "Could not reach the Google Apps Script backend.",
      detail: error.message
    });
  }
}
