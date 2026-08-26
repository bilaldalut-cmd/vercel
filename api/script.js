const PASTE_URL = "https://pastebin.com/raw/259cWB0A";

function denied(res) {
  res.statusCode = 403;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Access Denied</title>
<style>
*{box-sizing:border-box}
body{
  margin:0;
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#090909;
  color:#fff;
  font-family:Arial,Helvetica,sans-serif;
}
.card{
  width:min(418px,calc(100% - 32px));
  padding:46px 28px 38px;
  text-align:center;
  background:#0d0d0d;
  border:1px solid #252525;
  border-radius:9px;
}
h1{margin:0 0 22px;color:#ff4b4b;font-size:23px}
p{margin:12px 0;color:#a9a9a9;line-height:1.6;font-size:14px}
.small{margin-top:26px;color:#555;font-size:12px}
</style>
</head>
<body>
  <div class="card">
    <h1>ACCESS DENIED</h1>
    <p>This lua script is protected.</p>
    <p>Direct browser access is not permitted.</p>
    <p>This script can only be executed through an authorized client.</p>
    <p class="small">Return Home</p>
  </div>
</body>
</html>`);
}

module.exports = async (req, res) => {
  const configuredKey = process.env.SCRIPT_KEY;

  // Put your secret in Vercel Environment Variables as SCRIPT_KEY.
  // Example request:
  // /api/script?key=YOUR_KEY
  const suppliedKey =
    typeof req.query.key === "string" ? req.query.key : "";

  if (!configuredKey || suppliedKey !== configuredKey) {
    return denied(res);
  }

  try {
    const response = await fetch(PASTE_URL, {
      headers: { "User-Agent": "protected-script-server/1.0" }
    });

    if (!response.ok) {
      return res.status(502).send("Failed to fetch the script source.");
    }

    const code = await response.text();

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(code);
  } catch {
    res.status(500).send("Internal server error.");
  }
};