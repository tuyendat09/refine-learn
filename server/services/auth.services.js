const User = require("../model/User");
const bcrypt = require("bcrypt");
const SALT = 10;
const verifyUtils = require("../utils/verify.utils");
const jwtUtils = require("../utils/jwt.utils");

async function handleCreateUser(username, password) {
  const hashPassword = bcrypt.hashSync(password, SALT);
  const user = new User({ username, password: hashPassword });
  await user.save();
}

exports.handleRegister = async (username, password) => {
  const duplicatedResult = await verifyUtils.handleCheckDuplicatedUser(
    username
  );
  console.log(duplicatedResult);
  if (!duplicatedResult.success) return duplicatedResult;

  await handleCreateUser(username, password);

  return { success: true };
};

exports.handleLogin = async (username, password) => {
  const verifyPasswordResult = await verifyUtils.handleVerifyUserPassword(
    username,
    password
  );

  if (!verifyPasswordResult.success) return verifyPasswordResult;
  console.log(verifyPasswordResult);
  const token = jwtUtils.generateToken(verifyPasswordResult.user);
  return { success: true, token: token };
};
