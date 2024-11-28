const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  // const userId = req.cookies?.uid;
  // if (!userId) return res.redirect("/login");
  // const user = getUser(userId);
  // if (!user) return res.redirect("/login");

  // authentication using jwt:
  const token = req.cookies?.uid;
  if (!token) return res.redirect("/login");
  const user = getUser(token);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

module.exports = { restrictToLoggedinUserOnly };
