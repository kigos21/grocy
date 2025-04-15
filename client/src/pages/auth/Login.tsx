import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/utils";
import { AuthService } from "@/services/AuthService";
import useAuthStore from "@/store/authStore";
import { ValidationErrors } from "@/types";
import { LoginFormValues } from "@/types/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Login() {
  const { toast } = useToast();

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>();

  const form = useForm<LoginFormValues>({
    // resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = useAuthStore();

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const { message, data } = await AuthService.login(values);
      setValidationErrors(undefined);
      login(data.user, data.token);
      toast({
        description: message,
      });
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        const errors: ValidationErrors = e.response?.data;
        setValidationErrors(errors);
        toast({
          variant: "destructive",
          description: errors.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "An unexpected error occured.",
          description: getErrorMessage(e),
        });
      }
    }
  };

  return (
    <div className="mx-auto max-w-screen-sm px-4 py-8 md:py-16">
      <TypographyH2>Login</TypographyH2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {validationErrors?.errors.email &&
                  validationErrors?.errors.email.map((error) => (
                    <FormMessage key={error}>{error}</FormMessage>
                  ))}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                {validationErrors?.errors.password &&
                  validationErrors?.errors.password.map((error) => (
                    <FormMessage key={error}>{error}</FormMessage>
                  ))}
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 items-center gap-2 pt-2">
            <Button type="submit" className="bg-brand-green">
              Login
            </Button>
            <TypographyMuted className="text-center">
              Don't have an account?{" "}
              <Link to={"/register"} className="link">
                Register
              </Link>
            </TypographyMuted>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Login;
