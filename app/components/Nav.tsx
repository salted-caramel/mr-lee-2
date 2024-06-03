import React from "react";

const Nav = () => {
  return (
    <div className="navbar bg-gray-800">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">
          <p className="text-xl">Mr Lee</p>
        </a>
      </div>
      <div className="navbar-end">{/* <a className="btn">中文</a> */}</div>
    </div>
  );
};

export default Nav;
