// authentication using jwt:

const jwt = require("jsonwebtoken");
const secret = "seCret20@24";

function setUser(user) {
  return jwt.sign(
    {
      _id: user.id,
      email: user.email,
      role: user.role
    },
    secret
  );
}
function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, secret);
}

// authentication using cookies:

/*
  const sessionIdToUserMap = new Map();

  function setUser(id, user) {
    sessionIdToUserMap.set(id, user);
  }

  function getUser(id) {
    return sessionIdToUserMap.get(id);
  }
*/

module.exports = { setUser, getUser };
