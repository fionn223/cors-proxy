import fetch from 'node-fetch';

export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  try {
    const response = await fetch(targetUrl);
    const data = await response.text();

    // ✅ Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    res.status(200).send(data);
  } catch (err) {
    console.error("Proxy Error:", err);
    res.status(500).json({ error: "Failed to fetch target URL" });
  }
}
