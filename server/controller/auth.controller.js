const asyncHandler = require("../middleware/asyncHandler");
const authServices = require("../services/auth.services");

exports.handleLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const { success, code, token } = await authServices.handleLogin(
    username,
    password
  );
  if (!success) {
    let message = "Something wrong";
    switch (code) {
      case "INVALID_PASSWORD":
        message = "Username or password invalid!";
        break;
      case "USER_NOT_EXIST":
        message = "Username or password invalid!";
        break;
    }
    return res.status(400).json({ success: false, message: message });
  }
  return res.status(200).json({ success: true, token: token });
});

exports.handleRegister = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const { success, code } = await authServices.handleRegister(
    username,
    password
  );
  if (!success) {
    let message = "Something wrong";
    let httpCode = 400;
    switch (code) {
      case "USER_EXIST":
        message = "This username already exist";
        httpCode = 406;
        break;
    }
    return res.status(httpCode).json({ success: false, message: message });
  }

  return res
    .status(200)
    .json({ success: true, message: "Your account is created" });
});

exports.handleGetIdentity = asyncHandler(async (req, res) => {
  const publicUser = { username: req.user.username };

  return res.status(200).json({ success: true, user: publicUser });
});
