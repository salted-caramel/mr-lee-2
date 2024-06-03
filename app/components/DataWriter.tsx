"use client";
import { useState } from "react";
import { database } from "../firebaseConfig";
import { ref, update } from "firebase/database";

function DataWriter() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const dataRef = ref(database); // Reference to the root of the database
      const updates = { [key]: value }; // Object with key-value pair to update
      await update(dataRef, updates); // Update data at the root of the database with the specified key and value
      setKey(""); // Clear the input fields
      setValue("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="form-wrapper w-full max-w-md">
        <h1 className="mt-8 mb-6 text-center text-2xl font-bold">
          Update Data
        </h1>
        <div className="mb-4">
          <label
            htmlFor="key"
            className="block text-sm font-medium text-gray-700"
          >
            Key:
          </label>
          <input
            type="text"
            id="key"
            className="mt-1 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border border-gray-300"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="value"
            className="block text-sm font-medium text-gray-700"
          >
            Value:
          </label>
          <input
            type="text"
            id="value"
            className="mt-1 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border border-gray-300"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          {isLoading ? "Updating..." : "Update Data"}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}

export default DataWriter;
