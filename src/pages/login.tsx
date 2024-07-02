import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";
import { useState } from "react";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const registerSchema = z
  .object({
    name: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    passwordConfirm: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

export default function Login() {
  const [selected, setSelected] = useState("login");
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onLoginSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log("Login data:", data);
    // Handle login logic here
  };

  const onRegisterSubmit = async (data: z.infer<typeof registerSchema>) => {
    console.log("Register data:", data);
    // Handle registration logic here
  };

  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden">
      <GradientBackground />
      <Card className="max-w-full w-[340px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            aria-label="Tabs form"
            selectedKey={selected}
            size="md"
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <form
                className="flex flex-col gap-4"
                onSubmit={handleLoginSubmit(onLoginSubmit)}
              >
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  {...loginRegister("email")}
                  errorMessage={loginErrors.email?.message}
                  isInvalid={!!loginErrors.email}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  {...loginRegister("password")}
                  errorMessage={loginErrors.password?.message}
                  isInvalid={!!loginErrors.password}
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" type="submit">
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form
                className="flex flex-col gap-4 h-full"
                onSubmit={handleRegisterSubmit(onRegisterSubmit)}
              >
                <Input
                  isRequired
                  label="Name"
                  placeholder="Enter your name"
                  {...registerRegister("name")}
                  errorMessage={registerErrors.name?.message}
                  isInvalid={!!registerErrors.name}
                />
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  {...registerRegister("email")}
                  errorMessage={registerErrors.email?.message}
                  isInvalid={!!registerErrors.email}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  {...registerRegister("password")}
                  errorMessage={registerErrors.password?.message}
                  isInvalid={!!registerErrors.password}
                />
                <Input
                  isRequired
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  type="password"
                  {...registerRegister("passwordConfirm")}
                  errorMessage={registerErrors.passwordConfirm?.message}
                  isInvalid={!!registerErrors.passwordConfirm}
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" type="submit">
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

const GradientBackground = () => {
  return (
    <motion.div
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(45deg, #2c0052, #000066, #006666)",
        backgroundSize: "400% 400%",
      }}
      transition={{
        duration: 15,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    />
  );
};
