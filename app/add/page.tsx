"use client";
import React, { useEffect, useState } from "react";
import DataWriter from "../components/DataWriter";
import SignIn from "../components/SignIn";
import { useRouter } from "next/navigation";
import { fetchHolidays } from "../firebaseHolidayFetcher";

const Page = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const [holidays, setHolidays] = useState(null);
  const [deviceModel, setDeviceModel] = useState("");

  // Device detection function
  const detectDeviceModel = () => {
    const userAgent = navigator.userAgent;
    let model = "Unknown Device";

    // iOS devices
    if (/iPad/.test(userAgent)) {
      model = "iPad";
    } else if (/iPhone/.test(userAgent)) {
      model = "iPhone";
    } else if (/iPod/.test(userAgent)) {
      model = "iPod";
    }
    // Android devices
    else if (/Android/.test(userAgent)) {
      // Try to extract specific Android device model
      const androidMatch = userAgent.match(/\(Linux.*?;\s*([^;)]+)/);
      if (androidMatch) {
        model = androidMatch[1].trim();
      } else {
        model = "Android Device";
      }
    }
    // Desktop browsers
    else if (/Windows/.test(userAgent)) {
      model = "Windows Desktop";
    } else if (/Mac OS X/.test(userAgent)) {
      model = "Mac Desktop";
    } else if (/Linux/.test(userAgent)) {
      model = "Linux Desktop";
    }

    return model;
  };

  // Run device detection on page load
  useEffect(() => {
    const detectedModel = detectDeviceModel();
    setDeviceModel(detectedModel);
    console.log("Detected device model:", detectedModel);
  }, []);

  const handleFetchHolidays = () => {
    fetchHolidays()
      .then((data) => {
        setHolidays(data);
        // console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching holidays: ", error);
      });
  };

  const handleForm = async (event: any) => {
    event.preventDefault();

    const { result, error } = await SignIn(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/admin");
  };

  return (
    <div className="wrapper flex justify-center items-center h-screen">
      <div className="form-wrapper w-full max-w-md">
        <h1 className="mt-8 mb-6 text-center text-2xl font-bold">Sign in</h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="email" className="block mb-2">
            <span>Email</span>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
          <label htmlFor="password" className="block mb-4">
            <span>Password</span>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign in
          </button>
        </form>
        <button
          onClick={handleFetchHolidays}
          className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Retrieve current holidays
        </button>
        {holidays && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Current Holidays</h2>
            <pre>{JSON.stringify(holidays, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
