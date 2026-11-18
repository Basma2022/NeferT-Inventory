import { auth } from "@/lib/firebase/config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { AuthUser } from "./auth.types";

// Convert Firebase User into our app's AuthUser model
function mapFirebaseUser(user: User): AuthUser {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
}

// Sign in with email and password
export async function signIn(
  email: string,
  password: string,
): Promise<AuthUser> {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return mapFirebaseUser(credential.user);
}

// Sign out the current user
export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

//subscription to authentication state changes
export function subscribeToAuthChanges(
  callback: (user: AuthUser | null) => void,
) {
  return onAuthStateChanged(auth, (firebaseUser) => {
    callback(firebaseUser ? mapFirebaseUser(firebaseUser) : null);
  });
}
