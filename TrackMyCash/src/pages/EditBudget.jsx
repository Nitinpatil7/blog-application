import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const EditBudget = () => {
  const [eform, seteform] = useState({ ename: "", eamount: "" });
  const [data, setdata] = useState([]);
  const [isopen, setisopen] = useState(false);
  const [budget, setbudget] = useState(null);
  const [editdata, seteditdata] = useState({ editname: "", editamount: "" });
  const [openbox, setopenbox] = useState(false);

  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { budget: initialBudget } = location.state || {};

  useEffect(() => {
    if (initialBudget) {
      setbudget(initialBudget);
      seteditdata({
        editname: initialBudget.name || "",
        editamount: initialBudget.amount || "",
      });
    }
    fetchexpense();
    fetchBudget();
  }, [category, initialBudget]);

  //fetched expenes according budget
  const fetchexpense = async () => {
    try {
      console.log("Ctegory id:- ", category);
      const res = await fetch(
        `http://localhost:5000/api/budgets/${category}/expenses`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch expenses");
      }
      const result = await res.json();
      setdata(result.expenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      // alert("Failed to load expenses.");
    }
  };

  //deleting budget
  const deletebudget = async () => {
    try {
      console.log("delete budget id :- ", category);
      const res = await fetch(`http://localhost:5000/api/budgets/${category}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch delte reponse");
    } catch (error) {
      console.error("Error Deleting budget : ", error);
    }
  };
  const deletebudgethandler = async () => {
    await deletebudget();
    setbudget(null);
    navigate("/dashboard/budgets");
  };

  //update budget
  const editchangehandler = (e) => {
    seteditdata({ ...editdata, [e.target.name]: e.target.value });
  };
  const updatebudget = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/budgets/${category}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: editdata.editname || budget.name,
            amount: editdata.editamount || budget.amount,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Error updating the budget");
      setbudget((prev) => ({
        ...prev,
        name: editdata.editname || prev.name,
        amount: editdata.editamount || prev.amount,
      }));
    } catch (error) {
      console.error("Error updating the budget:", error);
    }
  };

  const edithandler = () => {
    console.log(editdata);
    updatebudget();
    seteditdata({ editname: "", editamount: "" });
    setisopen(false);
    fetchBudget();
  };

  //fetch budget details
  const fetchBudget = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/budgets/${category}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch budget");
      }
      const result = await res.json();
      setbudget(result.budget);
    } catch (error) {
      console.error("Error fetching budget:", error);
    }
  };

  //get input values
  const changehandler = (e) => {
    seteform({ ...eform, [e.target.name]: e.target.value });
  };

  //delete expense route
  const deleteExpense = async (id, amount) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/budgets/${category}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete expense");
      }
      const  dexpense = await res.json();
      console.log("Deleted Expense:", dexpense);

      setdata((lastdata)=> lastdata.filter((item)=> item._id !== id));

      setbudget((prevBudget) => {
        const newSpend = prevBudget.spend - amount; 
        return {
          ...prevBudget,
          spend: newSpend,
          remaining: prevBudget.amount - newSpend, // Adjust remaining budget
        };
      });
     
    } catch (error) {
      console.error("Error Deleting Expense : ", error);
    }
  };

  //delete expense handler
  const deleteexpensehandler = (id , amount) => {
    deleteExpense(id , amount);
    console.log("expense id :- ", id);
  };
  //on click add new expense add expense in budget
  const submithandler = async () => {
    if (eform.ename.length > 3 || eform.eamount.length >= 2) {
      const amount = Number(eform.eamount);
      if (!amount || amount <= 0) {
        alert("Enter a Valid amount");
        seteform({ ename: "", eamount: "" });
        return;
      }
      try {
        const res = await fetch(
          `http://localhost:5000/api/budgets/${category}/expenses`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              title: eform.ename,
              amount: Number(eform.eamount),
            }),
          }
        );

        if (!res.ok) {
          const errorMessage = await res.text();
          throw new Error(`Failed to add expense: ${errorMessage}`);
        }

        seteform({ ename: "", eamount: "" });

        const result = await res.json();
        console.log("res data :- ", result);
        setdata((prevData) => [
          ...prevData,
          {
            title: eform.ename,
            amount: eform.eamount,
            date: moment().format("YYYY-MM-DD"),
          },
        ]);

        const updatebudget = {
          ...budget,
          spend: budget.spend + Number(eform.eamount),
        };
        updatebudget.remaining = updatebudget.amount - updatebudget.spend;
        setbudget(updatebudget);

        fetchexpense();
        fetchBudget();
      } catch (error) {
        console.error("Error adding expense:", error);
        alert("Failed to add expense.");
      }
    } else {
      alert("Please fill the form correctly");
    }
  };

  return (
    <div className="pl-10 pr-20 flex flex-col gap-5">
      <div className="flex justify-between pr-10">
        <p className="text-2xl font-bold">
          📌 Record Every Expense, Stay Ahead!
        </p>
        <div className="flex gap-5">
          <button
            onClick={() => setisopen(true)}
            className="py-2 px-10 bg-blue-700 text-white font-semibold text-lg rounded-xl"
          >
            Edit
          </button>
          <button
            onClick={() => setopenbox(true)}
            className="py-2 px-10 bg-red-700 text-white font-semibold text-lg rounded-xl"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="w-full flex gap-10">
        {budget && (
          <div className="w-1/2 p-5 bg-white border-[4px] border-gray-200  shadow-md rounded-lg  h-44 relative">
            <div className="flex justify-between my-5">
              <span className="font-semibold text-xl">{budget.name}</span>
              <span className="text-blue-500 text-lg">${budget.amount}</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 ">
              <div
                className="bg-blue-500 h-3 rounded-full w-full "
                style={{ width: `${(budget.spend / budget.amount) * 100}%` }}
              ></div>
            </div>
            <p className="text-gray-500 my-3">
              ${budget.spend} Spent | $
              {budget.amount - budget.spend || budget.remaining}
              Remaining
            </p>
          </div>
        )}
        <div className="w-1/2 flex flex-col gap-5 border-[4px] rounded-2xl p-5 border-gray-200 pl-10">
          <p className="text-2xl font-bold">Add Expense</p>
          <label className="flex gap-2 flex-col text-xl font-semibold">
            Expense Name
            <input
              type="text"
              name="ename"
              value={eform.ename}
              onChange={changehandler}
              placeholder="e.g. Bedroom Decor"
              className="border-[3px] border-gray-200 rounded-xl py-2 w-[95%] pl-5"
            />
          </label>
          <label className="flex gap-2 flex-col text-xl font-semibold">
            Expense Amount
            <input
              type="text"
              name="eamount"
              onChange={changehandler}
              value={eform.eamount}
              placeholder="e.g. 1000"
              className="border-[3px] border-gray-200 rounded-xl py-2 w-[95%] pl-5"
            />
          </label>

          <button
            onClick={submithandler}
            className="bg-blue-600 rounded-xl py-2 text-white text-xl font-bold w-[95%] "
          >
            Add New Expense
          </button>
        </div>
        <div></div>
      </div>
      <div className="flex flex-col gap-5 pt-10 ">
        <p className="text-2xl font-bold ">Latest Expense</p>
        <table className="min-w-full border-collapse border border-gray-300 text-center text-xl">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          {data.length === 0 && <tbody>No Expense Here</tbody>}
          {data.map((item, index) => {
            return (
              <>
                <tbody>
                  <tr className="bg-white">
                    <td
                      key={index}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {item.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.amount}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {moment(item.date).format("DD-MM-YYYY")}
                    </td>
                    <td
                      onClick={() => deleteexpensehandler(item._id , item.amount)}
                      className="border border-gray-300 px-4 py-2 text-red-500 cursor-pointer hover:underline"
                    >
                      Delete
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
      </div>
      {isopen && (
        <div className="w-1/2 flex flex-col gap-5 border-[4px] rounded-2xl p-5 border-gray-200 bg-gray-200 pl-10 absolute ml-50">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">Update Budget</p>{" "}
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
              name="editname"
              onChange={editchangehandler}
              value={editdata.editname}
              placeholder="e.g. Bedroom Decor"
              className="border-[3px] border-black rounded-xl py-2 w-[95%] pl-5"
            />
          </label>
          <label className="flex gap-2 flex-col text-xl font-semibold">
            Budget Amount
            <input
              type="text"
              name="editamount"
              onChange={editchangehandler}
              value={editdata.editamount}
              placeholder="e.g. 1000"
              className="border-[3px] border-black rounded-xl py-2 w-[95%] pl-5"
            />
          </label>

          <button
            onClick={edithandler}
            className="bg-blue-600 rounded-xl py-2 text-white text-xl font-bold w-[95%] "
          >
            Update Budget
          </button>
        </div>
      )}
      {openbox && (
        <div className="flex flex-col gap-5 border-[5px] rounded-2xl p-5 border-x-green-500 border-y-blue-500 bg-black pl-10 absolute align-middle  ml-96 mt-56">
          <div className="flex flex-col h-48 w-96 p-10  ">
            <p className="text-2xl font-semibold text-white">
              Are you Sure to deleting <b>{budget.name}</b> budget?
            </p>
            <div className="flex justify-between pt-5 px-5">
              <p
                onClick={() => setopenbox(false)}
                className="text-xl text-white px-10 py-2 rounded-xl font-bold bg-green-500"
              >
                No
              </p>
              <p
                onClick={deletebudgethandler}
                className="text-xl text-white px-10 py-2 rounded-xl font-bold bg-red-500"
              >
                Yes
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBudget;
