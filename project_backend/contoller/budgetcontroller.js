const Budget = require("../models/Budget");
const mongoose = require("mongoose");

const createBudget = async (req, res) => {
  try {
    const { name, amount } = req.body;
    const budget = await Budget({ name, amount, user: req.user.id });
    const savebudget = await budget.save();
    res.status(201).json(savebudget);
  } catch (error) {
    console.error("Error saving budget:", error);
    res
      .status(500)
      .json({ error: error.message, message: "Internal Server Error" });
  }
};

const getBudget = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Server error, could not fetch budgets" });
  }
};

const createExpenses = async (req, res) => {
  try {
    const { budgetid } = req.params;
    const { title, amount } = req.body;

    const budget = await Budget.findOne({ _id: budgetid, user: req.user.id });

    if (!budget) {
      return res
        .status(404)
        .json({ message: "Budget not foun and unauthorized" });
    }
    const newexpense = {
      _id: new mongoose.Types.ObjectId(),
      title,
      amount,
      date: new Date(),
    };

    budget.expenses.push(newexpense);
    budget.spend += amount;
    await budget.save();

    res.status(201).json({ message: "Expense Added Succesfully", budget });
  } catch (error) {
    console.error("Error adding expense ", error);
    res
      .status(500)
      .json({ message: `server error , could not add expense: ${error}` });
  }
};

const getExpenses = async (req, res) => {
  try {
    const { budgetid } = req.params;
    const budget = await Budget.findOne({ _id: budgetid, user: req.user.id });

    if (!budget) {
      return res
        .status(404)
        .json({ message: "Budget not found for get  or unauthorized" });
    }
    res.json({ expenses: budget.expenses });
  } catch (error) {
    console.error("Error fetching Expenses: ", error);
    res.status(500).json({ message: "server error, could not fetch expenses" });
  }
};

const deleteExpense = async (req,res) => {
  try {
    const { budgetid, expenseid } = req.params;
    const budget = await Budget.findOne({ _id: budgetid, user: req.user.id });

    if (!budget) {
      return res
        .status(404)
        .json({ message: "Budget not found or unauthorized" });
    }

    const expenseindex = budget.expenses.findIndex(
      (exp) => exp._id.toString() === expenseid
    );

    if (expenseindex === -1) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const deleteExpense = budget.expenses.splice(expenseindex, 1)[0];
    budget.spend -= deleteExpense.amount;
    await budget.save();
    res.status(200).json({ message: "Expense deleted successfully", budget });
  } catch (error) {
    console.error("Error deleting expense: ", error);
    res.status(500).json({ message: "Server error, could not delete expense" });
  }
};

const deleteBudget = async (req,res) => {
  try {
    const { budgetid } = req.params;
    const budget = await Budget.findOneAndDelete({
      _id: budgetid,
      user: req.user.id,
    });

    if (!budget) {
      return res
        .status(404)
        .json({ message: `Budget not found or unauthorized `});
    }

    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.error("Error deleting budget: ", error);
    res.status(500).json({ message: "Server error, could not delete budget" });
  }
};

const updateBudget = async (req, res) => {
  try {
    const { budgetid } = req.params;
    const { name, amount } = req.body;
    console.log("user ud:- ", req.user.id);
    const budget = await Budget.findOneAndUpdate(
      { _id: budgetid, user: req.user.id },
      { name, amount },
      { new: true, runValidators: true }
    );
    if (!budget) {
      return res
        .status(404)
        .json({ message: "Budget not found or unauthorized" });
    }

    res.status(200).json({ message: "Budget updated successfully", budget });
  } catch (error) {
    console.error("Error updating budget: ", error);
    res
      .status(500)
      .json({ message: `Server error, could not update budget ${error}` });
  }
};
module.exports = {
  createBudget,
  getBudget,
  createExpenses,
  getExpenses,
  deleteExpense,
  updateBudget,
  deleteBudget,
};
