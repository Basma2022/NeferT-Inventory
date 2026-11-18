import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signIn } from "../services/auth.services";
import { LoginFormValues, loginSchema } from "../validation/login.schema";

export function useLoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await signIn(values.email, values.password);
    } catch {
      form.setError("root.server", {
        message:
          "Unable to sign in. Please check your credentials and try again.",
      });
    }
  });

  return {
    form,
    onSubmit,
  };
}
