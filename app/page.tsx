"use client";
import { useEffect, useState } from "react";
import Closed from "./components/Closed";
import Nav from "./components/Nav";
import Open from "./components/Open";
import { fetchHolidays } from "./firebaseHolidayFetcher";
import WhatsAppIcon from "./components/WhatsappIcon";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [holidays, setHolidays] = useState<any>({});
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    fetchHolidays()
      .then((data) => {
        console.log("Fetched Holidays: ", data);

        // Reverse the holidays object
        const reversedHolidays = Object.keys(data).reduce(
          (acc: Record<string, string>, key) => {
            const date = data[key];
            acc[date] = key;
            return acc;
          },
          {}
        );

        setHolidays(reversedHolidays);
      })
      .catch((error) => {
        console.error("Error fetching holidays: ", error);
      });
  }, []);

  const today = new Date();
  const dayOfWeek = today.getDay();

  const isOpenDay = [1, 3, 5].includes(dayOfWeek);

  const todaysDate = today.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  console.log("Today's Date: ", todaysDate); // Log today's date
  console.log("Is Holiday: ", holidays.hasOwnProperty(todaysDate)); // Check if today is a holiday

  const isHoliday = holidays && holidays.hasOwnProperty(todaysDate);
  const isOpen = isOpenDay && !isHoliday;

  console.log("Is Open: ", isOpen); // Log if it's open

  const isWorkingDay = (date: Date) => {
    const day = date.getDay();
    const formattedDate = date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const isHoliday =
      holidays && Object.values(holidays).includes(formattedDate);
    return [1, 3, 5].includes(day) && !isHoliday;
  };

  const workingDays = [];
  for (let i = 0; i < 14; i++) {
    const nextDay = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    if (isWorkingDay(nextDay)) {
      const day = String(nextDay.getDate()).padStart(2, "0");
      const month = String(nextDay.getMonth() + 1).padStart(2, "0");
      const year = nextDay.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      workingDays.push(formattedDate);
    }
  }

  const hasWorkingDays = workingDays.length > 0;

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "cn" : "en");
  };

  return (
    <div className="px-6 bg-gray-800 text-lg text-white">
      <div>
        <Nav
          onLanguageChange={{
            currentLanguage: language,
            onChange: toggleLanguage,
          }}
        />
      </div>

      <div>
        {isOpen ? <Open language={language} /> : <Closed language={language} />}{" "}
      </div>
      <div className="flex flex-col gap-4 items-center mt-8">
        <a
          role="button"
          className="btn btn-primary w-24"
          href="https://www.google.com/maps/dir//Block+39+Upper+Boon+Keng+Road+%2310-2412,+Singapore+380039"
          target="_blank"
        >
          {language === "en" ? "Directions" : "路线"}
        </a>
      </div>
      {hasWorkingDays ? (
        <>
          <h2 className="text-2xl mt-8">
            {language === "en"
              ? "Working Days in the Next Two Weeks:"
              : "未来两周工作日"}
          </h2>
          <ul className="list-disc list-inside">
            {workingDays.map((day) => (
              <li key={day}>{day}</li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-8">
          {language === "en"
            ? "There are no working days in the next two weeks."
            : "未来两周没有工作日 (Wèi lái liǎng zhōu méi yǒu gōngzuò rì)"}
        </p>
      )}
      <WhatsAppIcon />
    </div>
  );
}
