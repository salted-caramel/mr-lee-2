import React from "react";

const Open = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Jan = 0, so add 1
  const yyyy = today.getFullYear();

  const formattedDate = `${dd}/${mm}/${yyyy}`;
  return (
    <div>
      <h2 className="text-center text-xl bg-green-500 p-4">
        Open today: 10am - 12pm, 2.30pm to 5pm
      </h2>
      <div className="flex flex-col gap-1 my-8">
        <p>Today's Date: {formattedDate} </p>
        <p>Address: Block 39 Upper Boon Keng Road #10-2412 (S) 380039</p>
      </div>
    </div>
  );
};

export default Open;
