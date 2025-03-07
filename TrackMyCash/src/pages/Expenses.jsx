import History from "../components/History"
const Expenses = () => {
  return (
    <>
    <div className="pr-10">
      <p className="text-5 font-bold text-4xl">
      🔍 See Where Your Money Goes!
      </p>
      <span className="mt-2 pl-16 text-gray-600 font-bold ">Every rupee spent should have a reason – track it, control it! 📉</span>
     <div className="pl-10 pr-10">
     <History/>
     </div>
    </div>
    </>
  )
}

export default Expenses