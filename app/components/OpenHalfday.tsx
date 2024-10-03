import React from "react";

const OpenHalfday = ({ language }: { language: string }) => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Jan = 0, so add 1
  const yyyy = today.getFullYear();

  const formattedDate = `${dd}/${mm}/${yyyy}`;

  const text = {
    en: {
      openToday: "Open today: 10am - 12pm",
      todaysDate: "Today's Date:",
      address: "Address: Block 39 Upper Boon Keng Road #10-2412 (S) 380039",
    },
    cn: {
      openToday: "今天营业时间: 上午10点至12点",
      todaysDate: "今天的日期:",
      address: "地址: 大牌39 Upper Boon Keng Road #10-2412 (S) 380039",
    },
  };

  return (
    <div>
      <h2 className="text-center text-xl bg-amber-500 p-4">
        {language === "en" ? text.en.openToday : text.cn.openToday}
      </h2>
      <div className="flex flex-col gap-1 my-8">
        <p>
          {language === "en" ? text.en.todaysDate : text.cn.todaysDate}{" "}
          {formattedDate}{" "}
        </p>
        <p>{language === "en" ? text.en.address : text.cn.address}</p>
      </div>
    </div>
  );
};

export default OpenHalfday;
