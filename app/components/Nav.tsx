import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LanguageChangeProps } from "./types"; // Import the interface

const Nav = ({
  onLanguageChange,
}: {
  onLanguageChange: LanguageChangeProps;
}) => {
  const [clickCount, setClickCount] = useState(0); // State to track button clicks
  const router = useRouter();

  const handleFirstButtonClick = () => {
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount >= 7) {
        router.push("/add"); // Redirect to /add
        return 0; // Reset counter after redirect
      }
      return newCount;
    });
  };

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
        <button
          className="btn btn-ghost text-xl"
          onClick={handleFirstButtonClick} // Attach click handler
        >
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
