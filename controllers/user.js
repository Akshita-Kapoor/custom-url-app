const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  // we can do validations.

  await User.create({
    name,
    email,
    password,
  });
  return res.render("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  // we can do validations.

  // user authentication
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "Invalid username or password",
    });
  // const sessionId = uuidv4();

  const token = setUser(user);
 // return res.json({token});

  res.cookie('token', token);

  // setUser(sessionId, user);
  // res.cookie('uid', sessionId);
  return res.redirect("/");
}
module.exports = { handleUserSignUp, handleUserLogin };
