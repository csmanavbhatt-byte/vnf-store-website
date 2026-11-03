
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  const backendUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!backendUrl) {
    return res.status(500).json({
      success: false,
      message: "Missing GOOGLE_APPS_SCRIPT_URL environment variable."
    });
  }

  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed."
    });
  }

  try {
    const options = {
      method: req.method,
      redirect: "follow"
    };

    if (req.method === "POST") {
      options.headers = {
        "Content-Type": "text/plain;charset=utf-8"
      };
      options.body = JSON.stringify(req.body || {});
    }

    const upstream = await fetch(backendUrl, options);
    const raw = await upstream.text();

    let payload;

    try {
      payload = JSON.parse(raw);
    } catch {
      return res.status(502).json({
        success: false,
        message: "Google Apps Script returned a non-JSON response.",
        upstreamStatus: upstream.status
      });
    }

    return res.status(upstream.ok ? 200 : upstream.status).json(payload);

  } catch (error) {
    return res.status(502).json({
      success: false,
      message: "Could not reach Google Apps Script.",
      detail: error.message
    });
  }
}
