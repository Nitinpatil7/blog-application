import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BudgetList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const showCreateBox = location.pathname.includes("budgets");

  const [isopen, setisopen] = useState(false);
  const [budgetform, setbudgetform] = useState({ bname: "", bamount: "" });
  const [data, setdata] = useState([]);

  const fetchbudget=async()=>{
    try {
      const  token = localStorage.getItem("token");
      if(!token){
        console.log("No token found, user must log in")
        return;
      }

      const res = await fetch("http://localhost:5000/api/budgets",{
        method:"GET",
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      if(!res.ok){
        throw new Error("Failed to fethced data");
      }
      const budgetdata = await res.json();
      setdata(budgetdata)

    } catch (error) {
      console.error("Error fetching budgets : ",error.message);
    
    }

  }
  useEffect(() => {
    fetchbudget();
  }, [])
  

  const changehandler = (e) => {
    setbudgetform({ ...budgetform, [e.target.name]: e.target.value });
  };

  const addbudget = async (budgetdata) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, user must log in.");
        return;
      }
      const res = await fetch("http://localhost:5000/api/budgets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(budgetdata),
      });
      if (!res.ok) {
        throw new Error("failed to create budget");
      }

      const resdata = await res.json();
      console.log("Budget successfully added to the backend", resdata);
      setdata((prevData) => [...prevData, resdata]); 
    } catch (error) {
      console.error("Error adding budget: ", error.message);
    }
  };
 
  const submithandler = () => {
    if (!budgetform.bname || !budgetform.bamount) {
      alert("Please fill out all fields before submitting.");
      console.log(data);
      return;
    }
    // addbudget(budgetform)
    const newbudget = {
      name: budgetform.bname,
      spend: 0,
      amount: Number(budgetform.bamount),
    };
    addbudget(newbudget);
    setbudgetform({ bname: "", bamount: "" });
    setisopen(false);
   // setdata([...data, newbudget]);
    console.log(data);
    // console.log("Budget created")
    // console.log(data)
  };
  return (
    <div className="space-y-4 w-full gap-5 flex flex-wrap  p-5 ">
      {showCreateBox && (
        <div
          className="p-3 bg-gray-100 border-2 border-gray-300 border-dotted rounded-lg w-[400px] h-40 flex flex-col justify-center items-center cursor-pointer"
          onClick={() => {
            console.log("create budget clicked!");
            setisopen(true);
          }}
        >
          <p className="font-bold text-2xl">+</p>
          <p className="font-semibold text-xl">Create New Budget</p>
        </div>
      )}
      {data.length == 0 ? <p className="text-black">No budgets</p> : ""}
      {data.map((item, index) => {
        const percentage = (item.spend / item.amount) * 100;
        return (
          <div
            key={index}
            className="p-3 bg-white shadow-md rounded-lg w-[400px] h-44"
            onClick={() =>
              navigate(`/dashboard/budgets/${item._id.toLowerCase()}`,{
                state:{budget : item}
              })
            }
          >
            <div className="flex justify-between my-5">
              <span className="font-semibold text-xl">{item.name}</span>
              <span className="text-blue-500 text-lg">${item.amount}</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full "
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="text-gray-500 my-3">
              {item.spend} Spent | ${item.amount - item.spend} Remaining
            </p>
          </div>
        );
      })}

      {isopen && (
        <div className="w-1/2 flex flex-col gap-5 border-[4px] rounded-2xl p-5 border-gray-200 bg-gray-200 pl-10 absolute ml-50">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">Add Budget</p>{" "}
            <p
              className="text-4xl text-red-500 font-bold cursor-pointer"
              onClick={() => setisopen(false)}
            >
              ×
            </p>
          </div>
          <label className="flex gap-2 flex-col text-xl font-semibold">
            Budget Name
            <input
              type="text"
              name="bname"
              value={budgetform.bname}
              onChange={changehandler}
              placeholder="e.g. Bedroom Decor"
              className="border-[3px] border-black rounded-xl py-2 w-[95%] pl-5"
            />
          </label>
          <label className="flex gap-2 flex-col text-xl font-semibold">
            Budget Amount
            <input
              type="text"
              name="bamount"
              onChange={changehandler}
              value={budgetform.bamount}
              placeholder="e.g. 1000"
              className="border-[3px] border-black rounded-xl py-2 w-[95%] pl-5"
            />
          </label>

          <button
            onClick={submithandler}
            className="bg-blue-600 rounded-xl py-2 text-white text-xl font-bold w-[95%] "
          >
            Add New Budget
          </button>
        </div>
      )}
    </div>
  );
};

export default BudgetList;
