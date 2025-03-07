import {useState, useEffect } from "react";
import moment from "moment";
import { useLocation } from "react-router-dom";
const History = () => {
  const [data, setdata] = useState([])
  const location=useLocation();
  const expenses = location.pathname.includes("expenses");
  const action = location.pathname.includes("budgets");
  


  const fetchdata = async()=>{
    const res = await  fetch("http://localhost:5000/api/budgets",{
      method:"GET",
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }

    });
    if(!res.ok){
      throw new Error("Failed to fetched data"); 
    }
    const resdata = await res.json();
    
    console.log("History fetched data :- ", resdata);

    const allexpenses = resdata.flatMap((budget)=>budget.expenses);
    console.log("Extracted expenses: ",allexpenses);
    setdata(allexpenses)
  }

  useEffect(() => {
   fetchdata();
  }, [])
  const displayexpense = expenses ? data : data.slice(0, 5);

  console.log(data)
 

  return (
    <>
      <div>
        <p className="text-2xl font-semibold  text-gray-700 py-5">{expenses?"All Expenses":"Latest Expenses"}</p>
        <div className="border-[5px] border-gray-100 p-5">
       {displayexpense.length >0 ? (
          <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#4C51BF] text-white text-xl">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
            {action &&   <th className="border border-gray-300 px-4 py-2">Action</th>}
            </tr>
          </thead>
          <tbody>
            {displayexpense.map((item, index) => (
              <tr key={index} className=" font-semibold text-center text-xl">
                <td className="border border-gray-300 px-4 py-2">{item.title}</td>
                <td className="border border-gray-300 px-4 py-2">{item.amount}</td>
                <td className="border border-gray-300 px-4 py-2">{moment(item.date).format("DD-MM-YYYY")}</td>
                {action && <td className="border border-gray-300 px-4 py-2 text-red-500 cursor-pointer hover:underline">
                  Delete
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
       ):( <p className="text-gray-500">No expenses found</p>)}
        </div>
      </div>
    </>
  );
};

export default History;
