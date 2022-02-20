const asyncHandler = require("express-async-handler");
const Goal = require("../model/goals.model");
const User = require("../model/users.model");

// @desc Get goals
// @route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.find({ user: req.user.id });

  res.json({ message: "display goals", goals: goal });
});

// @desc create goals
// @route POST /api/goals
//@access Private
const createGoal = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (text) {
    const goal = await Goal.create({
      text,
      user: req.user.id,
    });
    res.json({ message: "set goals", goal });
  } else {
    res.status(400);
    throw new Error("Text field required");
  }
});

// @desc Update goals
// @route PUT /api/goals/id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    throw new Error("Id not found");
  }

  //check user
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorised");
  } else {
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      message: `updated ${req.params.id}`,
      updatedGoal,
    });
  }
});

// @desc delete goals
// @route DELETE /api/goals/id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    throw new Error("Id not found");
  }

  //check user
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorised");
  } else {
    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: `deleted ${req.params.id}` });
  }
});

module.exports = { getGoals, createGoal, updateGoal, deleteGoal };
