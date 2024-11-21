import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Link } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8),
});
type LoginFormValues = z.infer<typeof loginFormSchema>;

function Login() {
  const form = useForm<LoginFormValues>({
    // resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    console.log(JSON.stringify(values, null, 2));
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
