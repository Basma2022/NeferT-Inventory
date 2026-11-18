import type { Persistence } from "firebase/auth";

// Firebase's React Native runtime exports this API, but its shared typings omit it.
declare module "firebase/auth" {
  export function getReactNativePersistence(storage: {
    setItem(key: string, value: string): Promise<void>;
    getItem(key: string): Promise<string | null>;
    removeItem(key: string): Promise<void>;
  }): Persistence;
}
