import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    useDisclosure,
} from "@nextui-org/react";
import z from "zod";
import { TypeUser } from "@/types";
import toast, { Toaster } from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUser } from "@/api/utils";
import { useQueryClient } from "@tanstack/react-query";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";

const roleOptions = ["ADMIN", "PARTICIPANT", "ORGANIZER"];

const userSchema = z.object({
    userID: z.number().min(1, "User ID must be at least 1 characters long"),
    username: z.string().min(2, "Username must be at least 2 characters long"),
    password: z.string().min(2, "Password must be at least 2 characters long"),
    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters long"),
    lastName: z.string().min(2, "Last name must be at least 2 characters long"),
    email: z.string().email("Invalid email"),
    schoolID: z.string().min(2, "School ID must be at least 2 characters long"),
    role: z.string().min(2, "Role must selected"),
});
export default function EditUser({ user }: { user: TypeUser }) {
    const queryClient = useQueryClient();
    type FormField = z.infer<typeof userSchema>;
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful, isDirty },
    } = useForm<FormField>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            userID: user.userID,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            schoolID: user.schoolID,
            role: user.role,
        },
    });

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const submitUser = async (data: FormField) => {
        await editUser(data);
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success("User updated successfully");
        isOpen ? onOpenChange() : null;
    };

    return (
        <div>
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
                size="sm"
                radius="full"
                onPress={onOpen}
                variant="flat"
                color="warning"
            >
                Edit
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="w-auto md:min-w-[600px] 2xl:min-w[1000px] ">
                    {(onClose) => (
                        <>
                            <form onSubmit={handleSubmit(submitUser)}>
                                <ModalHeader className="flex flex-col gap-1">
                                    Edit User
                                </ModalHeader>
                                <ModalBody>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-2">
                                            <Input
                                                className="col-span-2"
                                                type="text"
                                                label="Username"
                                                isClearable
                                                {...register("username")}
                                                errorMessage={
                                                    errors.username?.message
                                                }
                                                isInvalid={!!errors.username}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Input
                                                className="col-span-2"
                                                type="text"
                                                label="School ID"
                                                isClearable
                                                {...register("schoolID")}
                                                errorMessage={
                                                    errors.schoolID?.message
                                                }
                                                isInvalid={!!errors.schoolID}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Input
                                                className="col-span-2"
                                                type="text"
                                                label="First Name"
                                                isClearable
                                                {...register("firstName")}
                                                errorMessage={
                                                    errors.firstName?.message
                                                }
                                                isInvalid={!!errors.firstName}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <Input
                                                className="col-span-2"
                                                type="text"
                                                label="Last Name"
                                                isClearable
                                                {...register("lastName")}
                                                errorMessage={
                                                    errors.lastName?.message
                                                }
                                                isInvalid={!!errors.lastName}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <Input
                                                className="col-span-2"
                                                type="email"
                                                label="Email"
                                                isClearable
                                                {...register("email")}
                                                errorMessage={
                                                    errors.email?.message
                                                }
                                                isInvalid={!!errors.email}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Input
                                                className="col-span-2"
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
                                                {...register("password")}
                                                errorMessage={
                                                    errors.password?.message
                                                }
                                                isInvalid={!!errors.password}
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 gap-2 ">
                                            <Controller
                                                name="role"
                                                control={control}
                                                defaultValue={
                                                    user.role || roleOptions[0]
                                                }
                                                render={({ field }) => (
                                                    <Select
                                                        label="Role"
                                                        placeholder="Select a Role"
                                                        {...field}
                                                        {...register("role")}
                                                        errorMessage={
                                                            errors.role?.message
                                                        }
                                                        isInvalid={
                                                            !!errors.role
                                                        }
                                                    >
                                                        {roleOptions.map(
                                                            (role) => (
                                                                <SelectItem
                                                                    key={role}
                                                                    value={role}
                                                                >
                                                                    {role}
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </Select>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="danger"
                                        variant="light"
                                        onPress={onClose}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        color="primary"
                                        type="submit"
                                        isDisabled={!isDirty || isSubmitting}
                                    >
                                        {isSubmitting ? "Loading" : "Submit"}
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
