"use client";

import { useEffect, useState } from "react";
import Closed from "./components/Closed";
import Nav from "./components/Nav";
import Open from "./components/Open";
import OpenHalfdayAM from "./components/OpenHalfdayAM"; // Component for AM half-day opening
import OpenHalfdayPM from "./components/OpenHalfdayPM"; // Component for PM half-day opening
import { fetchHolidays } from "./firebaseHolidayFetcher";
import WhatsAppIcon from "./components/WhatsappIcon";

export default function Home() {
  const [holidays, setHolidays] = useState<Record<string, string>>({});
  const [halfDayAMHolidays, setHalfDayAMHolidays] = useState<
    Record<string, string>
  >({});
  const [halfDayPMHolidays, setHalfDayPMHolidays] = useState<
    Record<string, string>
  >({});
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    fetchHolidays()
      .then((data) => {
        const fullDayHolidays: Record<string, string> = {};
        const halfDaysAM: Record<string, string> = {};
        const halfDaysPM: Record<string, string> = {};

        Object.keys(data).forEach((key) => {
          const date = data[key];
          if (key.startsWith("halfday_am")) {
            halfDaysAM[date] = key;
          } else if (key.startsWith("halfday_pm")) {
            halfDaysPM[date] = key;
          } else {
            fullDayHolidays[date] = key;
          }
        });

        setHolidays(fullDayHolidays);
        setHalfDayAMHolidays(halfDaysAM);
        setHalfDayPMHolidays(halfDaysPM);
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
    month: "2-digit",
    day: "2-digit",
  });

  const isHoliday = holidays && holidays.hasOwnProperty(todaysDate);
  const isHalfDayAM =
    halfDayAMHolidays && halfDayAMHolidays.hasOwnProperty(todaysDate);
  const isHalfDayPM =
    halfDayPMHolidays && halfDayPMHolidays.hasOwnProperty(todaysDate);

  const isOpen = isOpenDay && !isHoliday && !isHalfDayAM && !isHalfDayPM;
  const isOpenHalfDayAM = isOpenDay && isHalfDayAM;
  const isOpenHalfDayPM = isOpenDay && isHalfDayPM;

  const isWorkingDay = (date: Date) => {
    const day = date.getDay();
    const formattedDate = date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const isHoliday = holidays && holidays.hasOwnProperty(formattedDate);
    const isHalfDayAM =
      halfDayAMHolidays && halfDayAMHolidays.hasOwnProperty(formattedDate);
    const isHalfDayPM =
      halfDayPMHolidays && halfDayPMHolidays.hasOwnProperty(formattedDate);

    return (
      [1, 3, 5].includes(day) && !isHoliday && !isHalfDayAM && !isHalfDayPM
    );
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
        {isOpen ? (
          <Open language={language} />
        ) : isOpenHalfDayAM ? (
          <OpenHalfdayAM language={language} />
        ) : isOpenHalfDayPM ? (
          <OpenHalfdayPM language={language} />
        ) : (
          <Closed language={language} />
        )}
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
        <div>
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
        </div>
      ) : (
        <p className="mt-8">
          {language === "en"
            ? "There are no working days in the next two weeks."
            : "未来两周没有工作日"}
        </p>
      )}
      <WhatsAppIcon />
    </div>
  );
}
