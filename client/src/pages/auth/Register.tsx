import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/utils";
import { AuthService } from "@/services/AuthService";
// import useAuthStore from "@/store/authStore";
import { ValidationErrors } from "@/types";
import { RegisterFormValues } from "@/types/zod";

function Register() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>();

  const form = useForm<RegisterFormValues>({
    // resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const { message } = await AuthService.register(values);
      setValidationErrors(undefined);
      toast({
        description: message,
      });
      navigate("/login");
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
      <TypographyH2>Register</TypographyH2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {validationErrors?.errors.name &&
                  validationErrors?.errors.name.map((error) => (
                    <FormMessage key={error}>{error}</FormMessage>
                  ))}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
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
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Confirmation</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                {validationErrors?.errors.password_confirmation &&
                  validationErrors?.errors.password_confirmation.map(
                    (error) => <FormMessage key={error}>{error}</FormMessage>,
                  )}
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 items-center gap-2 pt-2">
            <Button type="submit">Register</Button>
            <TypographyMuted className="text-center">
              Already have an account?{" "}
              <Link to={"/login"} className="link">
                Login
              </Link>
            </TypographyMuted>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Register;
