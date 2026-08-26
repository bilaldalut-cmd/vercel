const crypto = require("crypto");

module.exports = (req, res) => {
  const token = crypto.randomBytes(32).toString("hex");

  res.status(200).json({
    token
  });
};
