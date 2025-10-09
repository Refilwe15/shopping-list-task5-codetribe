import { Link } from "react-router-dom";

function GetStartedBtn() {
  return (
    <div className=" mt-5 ">
    <Link to="/login">
      
      <button
        className="bg-blue-600 font-medium py-3 px-10 ml-100 rounded-full 
                   shadow-md border border-gray-200 hover:bg-gray-200 
                   transition duration-300 text-white " 
>
        Get Started
      </button>
    </Link>
    </div>
  );
}

export default GetStartedBtn;
