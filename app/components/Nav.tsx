import React from "react";
import { LanguageChangeProps } from "./types"; // Import the interface

const Nav = ({
  onLanguageChange,
}: {
  onLanguageChange: LanguageChangeProps;
}) => {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof onLanguageChange.onChange === "function") {
      onLanguageChange.onChange(event);
    } else {
      console.error("onChange is not a function"); // Handle the error gracefully
    }
  };

  return (
    <div className="navbar bg-gray-800">
      <div className="navbar-start">
        <button className="btn btn-ghost text-xl" onClick={handleButtonClick}>
          <p className="text-xl">Mr Lee</p>
        </button>
      </div>
      <div className="navbar-end">
        <button className="btn" onClick={handleButtonClick}>
          {onLanguageChange.currentLanguage === "en" ? "中文" : "English"}
        </button>
      </div>
    </div>
  );
};

export default Nav;
