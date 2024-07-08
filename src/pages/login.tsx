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
import { Eye, EyeOff } from "lucide-react";
import { useQueryClient } from "react-query";
import { Register } from "@/spring/utils";

const loginSchema = z.object({
	username: z.string().min(3, "Username must be at least 3 characters long"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});

const registerSchema = z
	.object({
		firstName: z
			.string()
			.min(1, "First Name must be at least 1 character long"),
		lastName: z.string().min(1, "Last Name must be at least 1 character long"),
		username: z.string().min(3, "Username must be at least 3 characters long"),
		email: z.string().email("Invalid email address"),
		schoolId: z.string().min(6, "School ID must be at least 6 character long"),
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
	const queryClient = useQueryClient();

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
		await Login(data);
	};

	const onRegisterSubmit = async (data: z.infer<typeof registerSchema>) => {
		console.log(data);
		await Register(data);
	};

	return (
		<div className="relative flex justify-center items-center h-screen overflow-hidden">
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
									label="Username"
									placeholder="Enter your username"
									type="username"
									{...loginRegister("username")}
									errorMessage={loginErrors.username?.message}
									isInvalid={!!loginErrors.username}
								/>
								<Input
									isRequired
									endContent={
										<button
											className="focus:outline-none"
											type="button"
											onClick={toggleVisibility}
										>
											{isVisible ? (
												<Eye className="text-2xl text-default-400 pointer-events-none" />
											) : (
												<EyeOff className="text-2xl text-default-400 pointer-events-none" />
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
									label="First Name"
									placeholder="Enter your first name"
									{...registerRegister("firstName")}
									errorMessage={registerErrors.firstName?.message}
									isInvalid={!!registerErrors.firstName}
								/>
								<Input
									isRequired
									label="Last Name"
									placeholder="Enter your last name"
									{...registerRegister("lastName")}
									errorMessage={registerErrors.lastName?.message}
									isInvalid={!!registerErrors.lastName}
								/>
								<Input
									isRequired
									label="Username"
									placeholder="Enter your username"
									type="username"
									{...registerRegister("username")}
									errorMessage={registerErrors.username?.message}
									isInvalid={!!registerErrors.username}
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
									label="School ID"
									placeholder="Enter your school ID"
									type="schoolId"
									{...registerRegister("schoolId")}
									errorMessage={registerErrors.schoolId?.message}
									isInvalid={!!registerErrors.schoolId}
								/>
								<Input
									isRequired
									endContent={
										<button
											className="focus:outline-none"
											type="button"
											onClick={toggleVisibility}
										>
											{isVisible ? (
												<Eye className="text-2xl text-default-400 pointer-events-none" />
											) : (
												<EyeOff className="text-2xl text-default-400 pointer-events-none" />
											)}
										</button>
									}
									label="Password"
									placeholder="Enter your password"
									{...registerRegister("password")}
									errorMessage={registerErrors.password?.message}
									isInvalid={!!registerErrors.password}
									type={isVisible ? "text" : "password"}
								/>
								<Input
									isRequired
									endContent={
										<button
											className="focus:outline-none"
											type="button"
											onClick={toggleVisibility}
										>
											{isVisible ? (
												<Eye className="text-2xl text-default-400 pointer-events-none" />
											) : (
												<EyeOff className="text-2xl text-default-400 pointer-events-none" />
											)}
										</button>
									}
									label="Confirm Password"
									placeholder="Confirm your password"
									type={isVisible ? "text" : "password"}
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
