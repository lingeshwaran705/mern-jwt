const express = require("express");
const router = express.Router();
const {
  getGoals,
  createGoal,
  deleteGoal,
  updateGoal,
} = require("../contorller/goals.controller");

router.route("/").get(getGoals).post(createGoal);

router.route("/:id").put(updateGoal).delete(deleteGoal);

module.exports = router;
