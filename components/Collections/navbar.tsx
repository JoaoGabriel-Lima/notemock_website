import React from "react";

const Navbar = () => {
  return (
    <div className="bg-white drop-shadow-md w-full h-20 flex justify-center ">
      <div className="flex justify-between h-full items-center w-[90%]">
        <div className="text-black font-bold text-2xl">LOGO</div>
        <div className="bg-red-500">
          <ul className="flex ">
            <li>Home</li>
            <li>Oportunidades</li>
            <li>Fale Conosco</li>
          </ul>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Navbar;
