import React from "react";

function Header() {
  return (
    <div className="flex flex-row items-center justify-between px-[10vw] w-[100%] h-[30vw]">
      <img src="/header/bell.svg" className="w-[6.773vw]" alt="" />
      <a href="/profile"><img src="/header/profile.svg" className="w-[11.883vw]" alt="" /></a>
    </div>
  );
}

export default Header;
