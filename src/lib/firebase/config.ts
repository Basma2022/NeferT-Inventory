import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, initializeAuth, type Auth } from "firebase/auth";
import { authPersistence } from "./authPersistence";

// 1. Read and validate environment variables
function getEnv(value: string | undefined, key: string): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

// 2. Firebase configuration object
export const firebaseConfig = {
  apiKey: getEnv(
    process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    "EXPO_PUBLIC_FIREBASE_API_KEY",
  ),
  authDomain: getEnv(
    process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    "EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN",
  ),
  projectId: getEnv(
    process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    "EXPO_PUBLIC_FIREBASE_PROJECT_ID",
  ),
  storageBucket: getEnv(
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    "EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET",
  ),
  messagingSenderId: getEnv(
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    "EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  ),
  appId: getEnv(
    process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    "EXPO_PUBLIC_FIREBASE_APP_ID",
  ),
};

// 3. Initialize Firebase only once
export const firebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

function initializeFirebaseAuth(app: typeof firebaseApp) {
  try {
    return initializeAuth(app, {
      persistence: authPersistence,
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "auth/already-initialized"
    ) {
      return getAuth(app);
    }

    throw error;
  }
}

export const auth: Auth = initializeFirebaseAuth(firebaseApp);
