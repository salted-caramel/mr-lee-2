import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export default async function SignIn(email: string, password: string) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
