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
    Checkbox,
} from "@nextui-org/react";
import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { accountRegister, accountLogin } from "@/types";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import useAuthStore from "@/provider/auth";
import { useEffect } from "react";

const loginSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

const registerSchema = z
    .object({
        firstName: z
            .string()
            .min(1, "First Name must be at least 1 character long"),
        lastName: z
            .string()
            .min(1, "Last Name must be at least 1 character long"),
        username: z
            .string()
            .min(3, "Username must be at least 3 characters long"),
        email: z.string().email("Invalid email address"),
        schoolID: z
            .string()
            .min(3, "School ID must be at least 3 character long"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long"),
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
    const navigate = useNavigate();
    const { user, isAuthenticated, login } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated && user !== null) {
            switch (user.role) {
                case "ADMIN":
                    navigate("/admin");
                    break;
                case "ORGANIZER":
                    navigate("/organizer");
                    break;
                case "PARTICIPANT":
                    navigate("/participant");
                    break;
            }
        }
    }, [isAuthenticated, user, navigate]);

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
        const loginData: accountLogin = {
            username: data.username,
            password: data.password,
        };
        try {
            await login(loginData);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else if (typeof error === "string") {
                toast.error(error);
            } else {
                toast.error("An unknown error occurred");
            }
        }
    };

    const onRegisterSubmit = async (data: z.infer<typeof registerSchema>) => {
        try {
            const registerData: accountRegister = {
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
                email: data.email,
                schoolID: data.schoolID,
                password: data.password,
            };

            const response = await fetch(
                "http://localhost:8080/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(registerData),
                    credentials: "include",
                },
            );

            if (response.ok) {
                toast.success("Registration successful!");
            } else {
                const errorMessage = await response.text();
                toast.error(errorMessage || "Registration Failed")
            }
            await login({ username: data.username, password: data.password });
            return response;
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <div className="relative flex items-center justify-center h-screen overflow-hidden">
            <Toaster
                position="bottom-right"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: "",
                    duration: 5000,
                    style: {
                        background: "#800000",
                        color: "#fff",
                    },
                }}
            />
            <Card className="max-w-full">
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
                                className="flex flex-col gap-4 w-[340px]"
                                onSubmit={handleLoginSubmit(onLoginSubmit)}
                            >
                                <Input
                                    label="Username"
                                    placeholder="Enter your username"
                                    type="username"
                                    {...loginRegister("username")}
                                    errorMessage={loginErrors.username?.message}
                                    isInvalid={!!loginErrors.username}
                                />
                                <Input
                                    endContent={
                                        <button
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={toggleVisibility}
                                        >
                                            {isVisible ? (
                                                <IconEye className="text-2xl pointer-events-none text-default-400" />
                                            ) : (
                                                <IconEyeOff className="text-2xl pointer-events-none text-default-400" />
                                            )}
                                        </button>
                                    }
                                    label="Password"
                                    placeholder="Enter your password"
                                    type={isVisible ? "text" : "password"}
                                    {...loginRegister("password")}
                                    errorMessage={loginErrors.password?.message}
                                    isInvalid={!!loginErrors.password}
                                />
                                <p className="text-center text-small">
                                    Need to create an account?{" "}
                                    <Link
                                        size="sm"
                                        onPress={() => setSelected("sign-up")}
                                    >
                                        Sign up
                                    </Link>
                                </p>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        fullWidth
                                        color="primary"
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                        <Tab key="sign-up" title="Sign up">
                            <form
                                className="grid gap-4 lg:grid-cols-2 sm:grid-cols-1 "
                                onSubmit={handleRegisterSubmit(
                                    onRegisterSubmit,
                                )}
                            >
                                <Input
                                    label="First Name"
                                    placeholder="Enter your first name"
                                    {...registerRegister("firstName")}
                                    errorMessage={
                                        registerErrors.firstName?.message
                                    }
                                    isInvalid={!!registerErrors.firstName}
                                />
                                <Input
                                    label="Last Name"
                                    placeholder="Enter your last name"
                                    {...registerRegister("lastName")}
                                    errorMessage={
                                        registerErrors.lastName?.message
                                    }
                                    isInvalid={!!registerErrors.lastName}
                                />
                                <Input
                                    label="Username"
                                    placeholder="Enter your username"
                                    type="username"
                                    {...registerRegister("username")}
                                    errorMessage={
                                        registerErrors.username?.message
                                    }
                                    isInvalid={!!registerErrors.username}
                                />
                                <Input
                                    label="School ID"
                                    placeholder="Enter your school ID"
                                    type="schoolId"
                                    {...registerRegister("schoolID")}
                                    errorMessage={
                                        registerErrors.schoolID?.message
                                    }
                                    isInvalid={!!registerErrors.schoolID}
                                />
                                <Input
                                    label="Email"
                                    placeholder="Enter your email"
                                    type="email"
                                    className="col-span-2"
                                    {...registerRegister("email")}
                                    errorMessage={registerErrors.email?.message}
                                    isInvalid={!!registerErrors.email}
                                />

                                <Input
                                    endContent={
                                        <button
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={toggleVisibility}
                                        >
                                            {isVisible ? (
                                                <IconEye className="text-2xl pointer-events-none text-default-400" />
                                            ) : (
                                                <IconEyeOff className="text-2xl pointer-events-none text-default-400" />
                                            )}
                                        </button>
                                    }
                                    label="Password"
                                    placeholder="Enter your password"
                                    {...registerRegister("password")}
                                    errorMessage={
                                        registerErrors.password?.message
                                    }
                                    isInvalid={!!registerErrors.password}
                                    type={isVisible ? "text" : "password"}
                                />
                                <Input
                                    endContent={
                                        <button
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={toggleVisibility}
                                        >
                                            {isVisible ? (
                                                <IconEye className="text-2xl pointer-events-none text-default-400" />
                                            ) : (
                                                <IconEyeOff className="text-2xl pointer-events-none text-default-400" />
                                            )}
                                        </button>
                                    }
                                    label="Confirm Password"
                                    placeholder="Confirm your password"
                                    type={isVisible ? "text" : "password"}
                                    {...registerRegister("passwordConfirm")}
                                    errorMessage={
                                        registerErrors.passwordConfirm?.message
                                    }
                                    isInvalid={!!registerErrors.passwordConfirm}
                                />
                                <div className="grid col-span-2">
                                    <Checkbox>
                                        {" "}
                                        <p className="text-small">
                                            I agree to the Terms and Conditions
                                            and Privacy Policy
                                        </p>
                                    </Checkbox>
                                </div>
                                <p className="col-span-2 text-center text-small">
                                    Already have an account?{" "}
                                    <Link
                                        size="sm"
                                        onPress={() => setSelected("login")}
                                    >
                                        Login
                                    </Link>
                                </p>
                                <div className="flex justify-end col-span-2 gap-2">
                                    <Button
                                        fullWidth
                                        color="primary"
                                        type="submit"
                                    >
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
