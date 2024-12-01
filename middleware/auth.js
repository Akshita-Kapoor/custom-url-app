const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req?.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);
  req.user = user;
  return next();
}

function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("Unauthorized");

    return next();
  };
}

// async function restrictToLoggedinUserOnly(req, res, next) {
//   // const userId = req.cookies?.uid;
//   // if (!userId) return res.redirect("/login");
//   // const user = getUser(userId);
//   // if (!user) return res.redirect("/login");

//   // authentication using jwt:
//   // const token = req.cookies?.uid;
//   // if (!token) return res.redirect("/login");
//   // const user = getUser(token);
//   // if (!user) return res.redirect("/login");

//   // Authorization: Bearer token
//   const userUid = req.headers["authorization"];
//   if (!token) return res.redirect("/login");
//   const token = userUid.split("Bearer ")[1];
//   const user = getUser(token);
//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   // const userId = req.cookies?.uid;
//   // const user = getUser(userId);

//   // authentication using jwt:
//   // const token = req.cookies?.uid;
//   // const user = getUser(token);

//   // Authorization: Bearer token
//   const userUid = req.headers["authorization"];
//   const token = userUid.split("Bearer ")[1];
//   const user = getUser(token);

//   req.user = user;
//   next();
// }

module.exports = {
  checkForAuthentication,
  restrictTo,
};
