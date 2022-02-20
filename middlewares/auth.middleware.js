const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/users.model");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      //Get token from header
      token = authHeader.split(" ")[1];

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get user from token
      req.user = await User.findById(decoded.id).select(
        "-password -createdAt -updatedAt"
      );

      next();
    } catch (err) {
      console.log(err.message);
      res.send(401);
      throw new Error("Not authorised");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorised");
  }
});

module.exports = protect;
