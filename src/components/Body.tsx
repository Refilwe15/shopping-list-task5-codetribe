import GetStartedBtn from "./Button";

import SideIcon from "../assets/landingIcon.png"; // we’ll keep SideIcon as a separate component
// If landingIcon is a .tsx or .jsx component, use:


function Body() {
  return (
    <div className="relative flex items-center justify-between px-16 py-12">
      {/* Left text section */}
      <div className="max-w-lg">
        <h1 className="text-5xl font-extrabold leading-tight">
          MAKE SHOPPING
        </h1>
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          EASIER
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Welcome, this web application is here to make things easier for you.
          Here you can track and manage the items you want to buy, 
          and it won’t take much time.
        </p>

        {/* Button */}
        <GetStartedBtn />
      </div>



      {/* Floating side icon */}
      <SideIcon />
    </div>
  );
}

export default Body;
