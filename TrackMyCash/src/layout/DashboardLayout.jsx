import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
const DashboardLayout = () => {
  return (
    <div className="flex  min-h-screen bg-gray-50">
      <div className="w-[18%]">
        <h1 className="pt-10 pl-7 text-3xl font-bold flex ">
          <img className="h-10 w-10" src="src\assets\logo.png" alt="" />
          TrackMyCash/-</h1>
        <ul className=" pt-10 pl-10 pr-10">
          <li className="text-xl font-bold text-gray-800">
            <Link
              to="/dashboard"
              className=" p-2 rounded-xl hover:bg-blue-200 hover:text-gray-950 px-3 py-3 mb-5 flex gap-3 items-center bg-blue-50"
            > <img className="h-8 w-8" src="src\assets\dashboard.png" alt="" />
              Dashboard
            </Link>
          </li>
          <li className="text-xl font-bold text-gray-800">
            <Link
              to="/dashboard/budgets"
              className="flex gap-3 items-center bg-blue-50 p-2 rounded-xl hover:bg-blue-200 hover:text-gray-950 px-3 py-3  mb-5"
            >
              <img className="h-8 w-8" src="src\assets\budgets.png" alt="" />
              Budgets
            </Link>
          </li>
          <li className="text-xl font-bold text-gray-800">
            <Link
              to="/dashboard/expenses"
              className=" p-2 rounded-xl hover:bg-blue-200 hover:text-gray-950 px-3 py-3 flex gap-3 bg-blue-50"
            >
              <img className="h-8 w-8" src="src\assets\expenses.png" alt="" />
              Expenses
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-[5px] max-h-full bg-gray-100"></div>
      <div className="w-[100%]">
        <div className="flex justify-end py-2 px-3 h-16 items-center">
         
        </div>

        <div className="w-max-screen h-1 bg-gray-200"></div>

       <div className="pl-12 pt-10 bg-gray-50">
       <Outlet />
       </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
