import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    useDisclosure,
} from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { accountRegister } from "@/types";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { IconEye, IconEyeOff, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
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

export default function AddUser() {
    const queryClient = useQueryClient();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const {
        register: registerRegister,
        handleSubmit: handleRegisterSubmit,
        formState: { errors: registerErrors },
    } = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
    });

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
                toast.success("User added successfully");
                queryClient.invalidateQueries({ queryKey: ["users"] });
                isOpen ? onOpenChange() : null;
            } else {
                const errorData = await response.json();
                toast.error(String(errorData.message || "User not added"));
            }
            return response;
        } catch (error) {
            toast.error(String(error));
        }
    };

    return (
        <>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: "text-sm",
                    duration: 5000,
                    style: {
                        background: "#800000",
                        color: "#fff",
                    },
                }}
            />
            <Button
                variant="solid"
                color="primary"
                onPress={onOpen}
                startContent={<IconUser />}
            >
                Add User
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <form onSubmit={handleRegisterSubmit(onRegisterSubmit)}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Add User
                                </ModalHeader>
                                <ModalBody className="grid lg:grid-cols-2 sm:grid-cols-1 ">
                                    <Input
                                        label="First Name"
                                        placeholder="Enter first name"
                                        {...registerRegister("firstName")}
                                        errorMessage={
                                            registerErrors.firstName?.message
                                        }
                                        isInvalid={!!registerErrors.firstName}
                                    />
                                    <Input
                                        label="Last Name"
                                        placeholder="Enter last name"
                                        {...registerRegister("lastName")}
                                        errorMessage={
                                            registerErrors.lastName?.message
                                        }
                                        isInvalid={!!registerErrors.lastName}
                                    />
                                    <Input
                                        label="Username"
                                        placeholder="Enter username"
                                        type="username"
                                        {...registerRegister("username")}
                                        errorMessage={
                                            registerErrors.username?.message
                                        }
                                        isInvalid={!!registerErrors.username}
                                    />
                                    <Input
                                        label="School ID"
                                        placeholder="Enter school ID"
                                        type="schoolId"
                                        {...registerRegister("schoolID")}
                                        errorMessage={
                                            registerErrors.schoolID?.message
                                        }
                                        isInvalid={!!registerErrors.schoolID}
                                    />
                                    <Input
                                        label="Email"
                                        placeholder="Enter email"
                                        type="email"
                                        className="col-span-2"
                                        {...registerRegister("email")}
                                        errorMessage={
                                            registerErrors.email?.message
                                        }
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
                                        placeholder="Enter password"
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
                                        placeholder="Confirm password"
                                        type={isVisible ? "text" : "password"}
                                        {...registerRegister("passwordConfirm")}
                                        errorMessage={
                                            registerErrors.passwordConfirm
                                                ?.message
                                        }
                                        isInvalid={
                                            !!registerErrors.passwordConfirm
                                        }
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="danger"
                                        variant="light"
                                        onPress={onClose}
                                    >
                                        Close
                                    </Button>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
}
