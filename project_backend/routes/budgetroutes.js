const express=require("express");
const {
    createBudget, 
    getBudget , 
    createExpenses , 
    getExpenses,
    deleteBudget,
    updateBudget,
    deleteExpense}= require("../contoller/budgetcontroller");
const authMiddlewere=require("../config/auth");

const router = express.Router();
router.post("/", authMiddlewere , createBudget);

router.get("/" , authMiddlewere , getBudget)

router.post("/:budgetid/expenses",authMiddlewere,createExpenses)

router.get("/:budgetid/expenses", authMiddlewere , getExpenses)

router.delete("/:budgetid/:expenseid", authMiddlewere, deleteExpense);

router.delete("/:budgetid", authMiddlewere, deleteBudget);

router.put("/:budgetid", authMiddlewere, updateBudget);

module.exports = router;