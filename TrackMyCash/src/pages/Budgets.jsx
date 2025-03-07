import Budgetlist from "../components/Budgetlist";
const Budgets = () => {
  return (
    <>
      <div className="flex flex-col ">
        <p className="text-3xl font-bold">
        💡 Smart Budgeting Starts Here!
        </p>
        <span className="pt-2 pl-10 text-gray-600 font-bold">Give every rupee a job – make your money work for you! 💰</span>
        <div className="flex flex-wrap gap-5">
          <Budgetlist />
        </div>
      </div>
    </>
  );
};

export default Budgets;
