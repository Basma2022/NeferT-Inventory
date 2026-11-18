import { createContext, useEffect, useMemo, useState } from "react";
import {
    signIn,
    signOutUser,
    subscribeToAuthChanges,
} from "../services/auth.services";
import { AuthUser } from "../services/auth.types";

type AuthContextValues = {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: typeof signIn;
  signOut: typeof signOutUser;
};

export const AuthContext = createContext<AuthContextValues | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo<AuthContextValues>(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      signIn,
      signOut: signOutUser,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
