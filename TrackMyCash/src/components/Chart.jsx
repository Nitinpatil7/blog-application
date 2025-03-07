import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";

const Chart = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetchdata();
  }, []);

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

    console.log("charts fetched data :- ", resdata);
    setdata(resdata)
  };

  return (
    <ResponsiveContainer
      width="100%"
      height={500}
      className={"border-4 border-gray-100 rounded-xl mt-10 pt-2 pb-2 pr-20"}
    >
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="spend" stackId="a" fill="#4C51BF" />
        <Bar dataKey="amount" stackId="a" fill="#A3BFFA" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
