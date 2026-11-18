import { useAuth } from "@/features/auth/hooks/useAuth";
import { AuthProvider } from "@/features/auth/providers/AuthProvider";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

void SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      void SplashScreen.hideAsync();
    }
  }, [isLoading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
