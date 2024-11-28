// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import { LoginFormValues } from "@/types/zod";
import { AuthService } from "@/services/AuthService";
import useAuthStore from "@/store/authStore";
import { AxiosError } from "axios";

function Login() {
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
      const { data } = await AuthService.login(values);
      login(data.user, data.token);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(JSON.stringify(error.response?.data, null, 2));
      } else {
        console.log("An unexpected error occurred:", error);
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
                  <Input placeholder="Email" {...field} />
                </FormControl>
                {/* <FormMessage /> */}
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
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 items-center gap-2">
            <Button type="submit">Login</Button>
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
