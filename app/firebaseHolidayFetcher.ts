import { database } from "./firebaseConfig";
import { ref, get } from "firebase/database";

export const fetchHolidays = async (): Promise<any> => {
  try {
    const dataRef = ref(database, "/");
    const snapshot = await get(dataRef);
    return snapshot.val();
  } catch (error) {
    console.error("Error fetching holidays:", error);
    throw error;
  }
};
