import Chart from "../components/Chart";
import Budgetlist from "../components/Budgetlist";
import History from "../components/History";
import { useState, useEffect ,useMemo } from "react";
import { Link } from "react-router-dom";
const Dashboard = () => {

  const [spend, setspend] = useState([]);
  const [total , settotal] = useState([]);
  const [budgets, setbudgets] = useState([])
  useEffect(()=>{
    fetchdata();
  },[]);
  const fetchdata = async () => {
    const res = await fetch("http://localhost:5000/api/budgets", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetched data");
    }
    const resdata = await res.json();
    const allspends = resdata.flatMap((budget)=>budget.spend);
    setspend(allspends);
    const totals = resdata.flatMap((budget)=>budget.amount);
    settotal(totals)
    console.log("charts fetched data :- ", resdata);
    
    setbudgets(resdata);
  };

  const totalspend = useMemo(()=> spend.reduce((acc , num)=> acc+num,0),[spend]);
  const totalbudget = useMemo(()=> total.reduce((acc , num)=> acc+num,0),[total]);
  return (
    <>
    
      <div className="pb-20">
        {budgets.length!==0? (<>
          <h1 className="text-4xl font-bold">Good to see you! 🎯</h1>
        <p className="text-gray-600 font-semibold">
        Manage your money like a pro – every penny counts! 💰
        </p>
        <div className="flex gap-5 mt-5 pr-20 w-full">
          <div className="flex justify-between border-5 border-gray-100 py-5 px-5 items-center  w-full rounded-xl">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl ">Total Budget</p>
              <span className="text-4xl  font-semibold">{totalbudget}/-</span>
            </div>
            <div>
              <div className="h-12 w-12 bg-white rounded-full">
                <img src="src\assets\total.png" alt=""  /></div>
            </div>
          </div>
          <div className="flex justify-between border-5 border-gray-100 py-5 px-5 items-center  w-full rounded-xl">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl ">Total Spend</p>
              <span className="text-4xl  font-semibold">{totalspend}/-</span>
            </div>
            <div>
              <div className="h-12 w-12 rounded-full"> 
                <img src="src\assets\spend.png" alt="" /></div>
            </div>
          </div>
          <div className="flex justify-between border-5 border-gray-100 py-5 px-5 items-center  w-full rounded-xl">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl ">No.of Budget</p>
              <span className="text-4xl  font-semibold">{budgets.length}</span>
            </div>
            <div>
              <div className="h-12 w-12 rounded-full"><img src="src\assets\nobudgets.png" alt=""/></div>
            </div>
          </div>
        </div>

        <div className="flex p-0 m-0 w-full">
          <div className="w-3/4 h-fit">
            <Chart />
            <History/>
          </div>
          <div className="w-2/4 flex flex-col gap-5 pl-15 pr-20  ">
            <p className="font-semibold text-2xl pt-10">Latest Budgets</p>
           <div className="flex justify-center pl-3 pt-3 pb-3  items-center  w-full rounded-xl border-[5px] border-gray-100 ">
           <Budgetlist />
           </div>
          </div>
        </div>

        </>):(<>
          <div>
            <p className="text-2xl font-bold">🎉 Welcome, New User! 🎉</p>
            <div className="flex gap-2 item-center">
              <p className="font-semibold pt-2">We’re excited to have you here! 🌟 Before diving in, take a moment to set your budget 🏦</p>
              <Link to={"/dashboard/budgets"}><span className="font-bold text-xl underline text-blue-700 ">{"let's Start"}</span></Link>
            </div>
          </div>
        </>)}
              </div>
    </>
  );
};

export default Dashboard;
