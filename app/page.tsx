"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchHolidays } from "./firebaseHolidayFetcher";
import dynamic from "next/dynamic";
import { processHolidays } from "./utils/HolidayProcessor";

const Closed = dynamic(() => import("./components/Closed"));
const Open = dynamic(() => import("./components/Open"));
const OpenHalfdayAM = dynamic(() => import("./components/OpenHalfdayAM"));
const OpenHalfdayPM = dynamic(() => import("./components/OpenHalfdayPM"));
const WhatsAppIcon = dynamic(() => import("./components/WhatsappIcon"), {
  ssr: false,
});
const Nav = dynamic(() => import("./components/Nav"));
const LoadingOverlay = dynamic(() => import("./components/LoadingOverlay"), {
  ssr: false,
});

export default function Home() {
  const [holidays, setHolidays] = useState<Record<string, string>>({});
  const [halfDayAMHolidays, setHalfDayAMHolidays] = useState<
    Record<string, string>
  >({});
  const [halfDayPMHolidays, setHalfDayPMHolidays] = useState<
    Record<string, string>
  >({});
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true); // Set loading state initially true

  useEffect(() => {
    // Set a timer to hide the overlay after 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchHolidays()
      .then((data) => {
        const { fullDayHolidays, halfDaysAM, halfDaysPM } =
          processHolidays(data);
        setHolidays(fullDayHolidays);
        setHalfDayAMHolidays(halfDaysAM);
        setHalfDayPMHolidays(halfDaysPM);
      })
      .catch((error) => console.error("Error fetching holidays: ", error));
  });

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
      {/* Show overlay while loading is true */}
      {loading && <LoadingOverlay />}

      {/* Main content, shown after loading */}
      {!loading && (
        <>
          {/* Navigation Component */}
          <Nav
            onLanguageChange={{
              currentLanguage: language,
              onChange: toggleLanguage,
            }}
          />

          {/* Opening Status Components */}
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

          {/* Directions Button */}
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

          {/* Working Days Information */}
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

          {/* WhatsApp Icon */}
          <WhatsAppIcon />
        </>
      )}
    </div>
  );
}