import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, z } from "zod";
import {
	Tabs,
	Tab,
	Input,
	Link,
	Button,
	Card,
	Radio,
	RadioGroup,
	CardBody,
	Select,
	SelectItem,
	Checkbox,
} from "@nextui-org/react";
import { useState } from "react";
import { useQueryClient } from "react-query";
import ViewEventIcon from "@/components/icons/ViewEventIcon";
import EyeOffIcon from "@/components/icons/EyeOffIcon";
import { accountRegister, accountLogin, Roles, Department } from "@/types";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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
		schoolID: z.string().min(6, "School ID must be at least 6 character long"),
		password: z.string().min(8, "Password must be at least 8 characters long"),
		role: z.string().min(1, "Role must be selected"),
		department: z.string().optional(),
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
	const navigate = useNavigate();
	const [selectedRole, setSelectedRole] = useState("");
	const handleRoleChange = (value) => {
		setSelectedRole(value.currentKey);
	};

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
		try {
			const loginData: accountLogin = {
				username: data.username,
				password: data.password,
			};

			const response = await fetch("http://localhost:8080/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(loginData),
				credentials: "include",
			});

			if (response.ok) {
				navigate("/app");
			} else {
				const errorData = await response.json();
				throw new Error(errorData.message || "Login failed");
			}

			return response;
		} catch (error) {
			console.error("Login failed:", error);
			throw error;
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

			const response = await fetch("http://localhost:8080/users/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(registerData),
				credentials: "include",
			});

			if (response.ok) {
				toast.success("Registration successful!");
			} else {
				const errorData = await response.json();
				throw new Error(errorData.message || "Registration failed");
			}

			return response;
		} catch (error) {
			console.error("Registration failed:", error);
			throw error;
		}
	};

	return (
		<div className="relative flex justify-center items-center h-screen overflow-hidden">
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
												<ViewEventIcon className="text-2xl text-default-400 pointer-events-none" />
											) : (
												<EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
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
								className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 "
								onSubmit={handleRegisterSubmit(onRegisterSubmit)}
							>
								<Input
									label="First Name"
									placeholder="Enter your first name"
									{...registerRegister("firstName")}
									errorMessage={registerErrors.firstName?.message}
									isInvalid={!!registerErrors.firstName}
								/>
								<Input
									label="Last Name"
									placeholder="Enter your last name"
									{...registerRegister("lastName")}
									errorMessage={registerErrors.lastName?.message}
									isInvalid={!!registerErrors.lastName}
								/>
								<Input
									label="Username"
									placeholder="Enter your username"
									type="username"
									{...registerRegister("username")}
									errorMessage={registerErrors.username?.message}
									isInvalid={!!registerErrors.username}
								/>
								<Input
									label="School ID"
									placeholder="Enter your school ID"
									type="schoolId"
									{...registerRegister("schoolID")}
									errorMessage={registerErrors.schoolID?.message}
									isInvalid={!!registerErrors.schoolID}
								/>
								<Input
									label="Email"
									placeholder="Enter your email"
									type="email"
									{...registerRegister("email")}
									errorMessage={registerErrors.email?.message}
									isInvalid={!!registerErrors.email}
								/>
								<Select
									label="Role"
									placeholder="Select a role"
									className="max-w-xs"
									{...registerRegister("role")}
									errorMessage={registerErrors.role?.message}
									isInvalid={!!registerErrors.role}
									onSelectionChange={handleRoleChange}
								>
									{Roles.map((items) => (
										<SelectItem key={items.value} value={items.value}>
											{items.label}
										</SelectItem>
									))}
								</Select>
								{selectedRole === "participant" && (
									<Select
										label="Department"
										placeholder="Select a department"
										className="col-span-2 w-full"
										{...registerRegister("department")}
										errorMessage={registerErrors.department?.message}
										isInvalid={!!registerErrors.department}
									>
										{Department.map((items) => (
											<SelectItem key={items.value} value={items.value}>
												{items.label}
											</SelectItem>
										))}
									</Select>
								)}

								<Input
									endContent={
										<button
											className="focus:outline-none"
											type="button"
											onClick={toggleVisibility}
										>
											{isVisible ? (
												<ViewEventIcon className="text-2xl text-default-400 pointer-events-none" />
											) : (
												<EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
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
									endContent={
										<button
											className="focus:outline-none"
											type="button"
											onClick={toggleVisibility}
										>
											{isVisible ? (
												<ViewEventIcon className="text-2xl text-default-400 pointer-events-none" />
											) : (
												<EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
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
								<div className="grid col-span-2">
									<Checkbox>
										{" "}
										<p className="text-small">
											I agree to the Terms and Conditions and Privacy Policy
										</p>
									</Checkbox>
								</div>
								<p className="col-span-2 text-center text-small">
									Already have an account?{" "}
									<Link size="sm" onPress={() => setSelected("login")}>
										Login
									</Link>
								</p>
								<div className="flex gap-2 justify-end col-span-2">
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
