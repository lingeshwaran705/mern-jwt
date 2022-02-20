const express = require("express");
const router = express.Router();
const {
  getGoals,
  createGoal,
  deleteGoal,
  updateGoal,
} = require("../contorller/goals.controller");
const protect = require("../middlewares/auth.middleware");

router.route("/").get(protect, getGoals).post(protect, createGoal);

router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
