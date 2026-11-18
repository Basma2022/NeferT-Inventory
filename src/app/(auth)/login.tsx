import { Controller } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useLoginForm } from "@/features/auth/hooks/useLoginForm";

export default function LoginScreen() {
  const { form, onSubmit } = useLoginForm();

  const {
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.brand}>NEFER-T</Text>
        <Text style={styles.subtitle}>INVENTORY MANAGEMENT</Text>

        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.description}>
          Sign in to manage your inventory.
        </Text>

        <Text style={styles.label}>Email Address</Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Enter your email"
              placeholderTextColor="#A5A5A5"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              editable={!isSubmitting}
            />
          )}
        />

        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        <Text style={styles.label}>Password</Text>

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Enter your password"
              placeholderTextColor="#A5A5A5"
              secureTextEntry
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              editable={!isSubmitting}
            />
          )}
        />

        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        {errors.root?.server && (
          <Text style={styles.errorText}>{errors.root.server.message}</Text>
        )}

        <Pressable
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={() => void onSubmit()}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </Pressable>

        <Text style={styles.footer}>Nefer-T Inventory © 2026</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  brand: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: 5,
    color: "#B08D45",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 10,
    letterSpacing: 3,
    color: "#77716A",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 55,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#29251F",
  },
  description: {
    fontSize: 14,
    color: "#817B72",
    marginTop: 8,
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#39342D",
    marginBottom: 9,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E4DFD5",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#29251F",
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
  },
  inputError: {
    borderColor: "#C94C4C",
  },
  errorText: {
    color: "#C94C4C",
    fontSize: 12,
    marginTop: -13,
    marginBottom: 15,
  },
  button: {
    height: 52,
    backgroundColor: "#B08D45",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  footer: {
    textAlign: "center",
    color: "#A39C91",
    fontSize: 12,
    marginTop: 45,
  },
});
