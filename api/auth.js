const crypto = require("crypto");

module.exports = (req, res) => {
  const auth = req.headers.authorization || "";

  if (auth !== `Bearer ${process.env.SCRIPT_TOKEN}`) {
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }

  const token = crypto.randomBytes(32).toString("hex");

  res.status(200).json({
    token
  });
};
