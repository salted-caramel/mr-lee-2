import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Nav = () => {
  const [clickCount, setClickCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (clickCount === 7) {
      router.push("/add");
    }
  }, [clickCount, router]);

  const handleButtonClick = () => {
    setClickCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="navbar bg-gray-800">
      <div className="navbar-start">
        <button className="btn btn-ghost text-xl" onClick={handleButtonClick}>
          <p className="text-xl">Mr Lee</p>
        </button>
      </div>
      <div className="navbar-end">{/* <a className="btn">中文</a> */}</div>
    </div>
  );
};

export default Nav;
