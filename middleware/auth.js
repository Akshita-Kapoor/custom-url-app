const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  // const userId = req.cookies?.uid;
  // if (!userId) return res.redirect("/login");
  // const user = getUser(userId);
  // if (!user) return res.redirect("/login");

  // authentication using jwt:
  // const token = req.cookies?.uid;
  // if (!token) return res.redirect("/login");
  // const user = getUser(token);
  // if (!user) return res.redirect("/login");

  // Authorization: Bearer token
  const userUid = req.headers['authorization'];
  if (!token) return res.redirect("/login");
  const token = userUid.split('Bearer ')[1];
  const user = getUser(token);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
   // const userId = req.cookies?.uid;
  // const user = getUser(userId);

  // authentication using jwt:
  // const token = req.cookies?.uid;
  // const user = getUser(token);

  // Authorization: Bearer token
  const userUid = req.headers['authorization'];
  const token = userUid.split('Bearer ')[1];
  const user = getUser(token);

  req.user = user;
  next();
}

module.exports = { restrictToLoggedinUserOnly, checkAuth };
