import {
    Tabs,
    Tab,
    Card,
    CardBody,
    Image,
    Chip,
    Input,
    Select,
    SelectItem,
    ScrollShadow,
    Button,
} from "@nextui-org/react";
import {
    Course,
    Department,
    ElementaryYear,
    JuniorHighYear,
    Notifications,
    SeniorHighYear,
    Year,
} from "@/types";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useAuthStore from "@/provider/auth";
import {
    UsernameCard,
    PasswordCard,
    EmailCard,
} from "@/components/app/SecuritySettingsCard";
import { editAccount } from "@/api/utils";
import toast, { Toaster } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const settingsSchema = z
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
            .min(6, "School ID must be at least 6 character long"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long"),
        userType: z.string().min(1, "Type must be selected"),
        department: z.string().min(1, "Department must be selected"),
        year: z.string().optional(),
        course: z.string().optional(),
        passwordConfirm: z
            .string()
            .min(8, "Password must be at least 8 characters long"),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords don't match",
        path: ["passwordConfirm"],
    });

const changeNameSchema = z.object({
    firstName: z
        .string()
        .min(1, "First Name must be at least 1 character long"),
    lastName: z.string().min(1, "Last Name must be at least 1 character long"),
    department: z.string().optional(),
    course: z.string().optional(),
    year: z.string().optional()
});

export default function Settings() {
    const { user } = useAuthStore();
    const queryClient = useQueryClient();
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const handleDepartmentChange = (value: any) => {
        setSelectedDepartment(value.currentKey);
    };
    const [notifications, setNotifications] = useState<Notifications[]>([]);

    useEffect(() => {
        fetchNotifications();
    }, []);
    const fetchNotifications = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/notifications/${user.userID}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                },
            );
            if (!response.ok) {
                throw new Error("Network Error");
            }
            const Notifs: Notifications[] = await response.json();
            setNotifications(Notifs);
        } catch (error) {
            console.error(error);
        }
    };
    const {
        register: changeNameRegister,
        handleSubmit: handleChangeNameSubmit,
        formState: { errors: changeNameErrors },
    } = useForm<z.infer<typeof changeNameSchema>>({
        resolver: zodResolver(changeNameSchema),
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName
        },
    });

    const nameOnSubmit = async (data: z.infer<typeof changeNameSchema>) => {
            await editAccount({
                firstName: data.firstName,
                lastName: data.lastName,
                course: data.course,
                department: data.department,
                year: data.year,
            });
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("Successfully saved");
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
            <header className="flex items-center justify-between w-full mb-6">
                <div className="flex flex-col">
                    <p className="text-3xl font-bold">Settings</p>
                    <p className="font-light text-md">
                        Customize settings & manage your account
                    </p>
                </div>
            </header>
            <body className="flex">
                <div className="flex flex-col col-span-1 gap-4">
                    <Tabs radius="lg" size="lg" aria-label="Options">
                        <Tab key="account" title="Account">
                            <form
                                onSubmit={handleChangeNameSubmit(nameOnSubmit)}
                            >
                                <div className="sm:w-full md:w-[400px] lg:w-[600px]">
                                    <h3 className="text-lg font-bold">
                                        Profile
                                    </h3>
                                    <p className="text-default-500">
                                        This displays your profile information.
                                    </p>
                                    <Card
                                        radius="lg"
                                        shadow="sm"
                                        className="gap-4 mt-4"
                                    >
                                        <CardBody className="flex flex-row gap-4">
                                            <Image
                                                isBlurred
                                                width={50}
                                                radius="full"
                                                src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                                                alt="NextUI Album Cover"
                                                className="col-span-2"
                                            />
                                            <div className="items-center justify-center">
                                                <p className="text-sm font-medium text-default-600">
                                                    {user?.firstName}{" "}
                                                    {user?.lastName}{" "}
                                                    <Chip
                                                        className="ml-2"
                                                        size="sm"
                                                        radius="full"
                                                        color="primary"
                                                    >
                                                        {user?.role}
                                                    </Chip>
                                                </p>
                                                <p className="text-xs text-default-400">
                                                    {user?.schoolID}
                                                </p>
                                                <p className="text-xs text-default-400">
                                                    {user?.email}
                                                </p>
                                            </div>
                                        </CardBody>
                                    </Card>

                                    <div className="flex justify-between gap-4">
                                        <div>
                                            <h3 className="mt-4 text-lg font-bold">
                                                Full Name
                                            </h3>
                                            <p className="text-default-500">
                                                Your full name in your account.
                                            </p>
                                        </div>
                                        <Button
                                            color="primary"
                                            size="sm"
                                            type="submit"
                                            radius="full"
                                            className="self-center"
                                        >
                                            Save
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            type="text"
                                            className="mt-2"
                                            size="md"
                                            radius="lg"
                                            placeholder="First Name"
                                            defaultValue={user?.firstName}
                                            {...changeNameRegister("firstName")}
                                            errorMessage={
                                                changeNameErrors.firstName
                                                    ?.message
                                            }
                                            isInvalid={
                                                !!changeNameErrors.firstName
                                            }
                                        />
                                        <Input
                                            type="text"
                                            className="mt-2"
                                            size="md"
                                            radius="lg"
                                            placeholder="Last Name"
                                            defaultValue={user?.lastName}
                                            {...changeNameRegister("lastName")}
                                            errorMessage={
                                                changeNameErrors.lastName
                                                    ?.message
                                            }
                                            isInvalid={
                                                !!changeNameErrors.lastName
                                            }
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 mb-3 mt-3">
                                        <p className="text-red-900 font-bold">
                                            Department: 
                                            <p className="font-normal text-default-foreground">{user?.department}</p>
                                        </p>
                                        <p className="text-red-900 font-bold">
                                            Course:
                                            <p className="font-normal text-default-foreground">{user?.course}</p>
                                        </p> 
                                        <p className="text-red-900 font-bold">
                                            Year:
                                            <p className="font-normal text-default-foreground">{user?.year}</p>
                                        </p> 
                                    </div>
                                    <hr/>
                                    {user?.role !== "ADMIN" && (
                                        <div>
                                            <h3 className="mt-4 text-lg font-bold">
                                                Department
                                            </h3>
                                            <p className="text-default-500">
                                                Your Department in your account.
                                            </p>
                                            <Select
                                                placeholder="Select a Department"
                                                className="w-full mt-2"
                                                {...changeNameRegister("department")}
                                                onSelectionChange={
                                                    handleDepartmentChange
                                                }
                                            >
                                                {Department.map(
                                                    (
                                                        item /* Changed items to item for clarity */,
                                                    ) => (
                                                        <SelectItem
                                                            key={item.value}
                                                            value={item.value}
                                                        >
                                                            {item.label}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </Select>
                                            <h3 className="mt-4 text-lg font-bold">
                                                Course / Year
                                            </h3>
                                            <p className="text-default-500">
                                                Your academic level in your
                                                account.
                                            </p>
                                            <div className="grid grid-cols-2 gap-4">
                                                {selectedDepartment ===
                                                    "College" && (
                                                    <Select
                                                        {...changeNameRegister("course")}
                                                        placeholder="Select a course"
                                                        className="w-full mt-2"
                                                    >
                                                        {Course.map((item) => (
                                                            <SelectItem
                                                            key={item.value}
                                                            value={
                                                                item.value
                                                            }
                                                        >
                                                            {item.label}
                                                        </SelectItem>
                                                        ))}
                                                    </Select>
                                                )}

                                                <Select
                                                    isDisabled={
                                                        selectedDepartment ===
                                                        ""
                                                    }
                                                    {...changeNameRegister("year")}
                                                    placeholder="Select a Year"
                                                    className={clsx(
                                                        "mt-2 w-full",
                                                        {
                                                            "col-span-2":
                                                                selectedDepartment !==
                                                                "College",
                                                        },
                                                    )}
                                                >
                                                    {/* Simplified year selection logic using a switch-like approach */}
                                                    {(() => {
                                                        switch (
                                                        selectedDepartment
                                                        ) {
                                                            case "Elementary":
                                                                return ElementaryYear.map(
                                                                    (item) => (
                                                                        <SelectItem
                                                                            key={
                                                                                item.value
                                                                            }
                                                                            value={
                                                                                item.value
                                                                            }
                                                                        >
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </SelectItem>
                                                                    ),
                                                                );
                                                            case "Junior High":
                                                                return JuniorHighYear.map(
                                                                    (
                                                                        item /* ...similar for other cases */,
                                                                    ) => (
                                                                        <SelectItem
                                                                            key={
                                                                                item.value
                                                                            }
                                                                            value={
                                                                                item.value
                                                                            }
                                                                        >
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </SelectItem>
                                                                    ),
                                                                );
                                                            case "Senior High":
                                                                return SeniorHighYear.map(
                                                                    (item) => (
                                                                        <SelectItem
                                                                            key={
                                                                                item.value
                                                                            }
                                                                            value={
                                                                                item.value
                                                                            }
                                                                        >
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </SelectItem>
                                                                    ),
                                                                );
                                                            case "College":
                                                                return Year.map(
                                                                    (item) => (
                                                                        <SelectItem
                                                                            key={
                                                                                item.value
                                                                            }
                                                                            value={
                                                                                item.value
                                                                            }
                                                                        >
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </SelectItem>
                                                                    ),
                                                                );
                                                            default:
                                                                return (
                                                                    <SelectItem
                                                                        key="Undefined"
                                                                        value="Undefined"
                                                                    />
                                                                );
                                                        }
                                                    })()}
                                                </Select>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </Tab>
                        <Tab key="security" title="Security">
                            <div className="sm:w-[300px] md:w-[500px] lg:w-[700px]">
                                <div>
                                    <UsernameCard username={user?.username} />
                                </div>
                                <div className="mt-4">
                                    <PasswordCard />
                                </div>
                                <div className="mt-4">
                                    <EmailCard email={user?.email} />
                                </div>
                            </div>
                        </Tab>

                        <Tab key="notifications" title="Notifications">
                            <div className="sm:w-full md:w-[400px] lg:w-[600px]">
                                <ScrollShadow
                                    hideScrollBar={true}
                                    size={100}
                                    className="overflow-y-auto h-[600px]"
                                >
                                    {notifications.map((notification) => (
                                        <Card
                                            key={notification.id}
                                            className="m-4 p-4 gap-4 flex flex-row justify-between self-center"
                                            radius="lg"
                                        >
                                            <div>
                                                <h3 className="text-lg font-bold">
                                                    {notification.recipient}
                                                </h3>
                                                <p className="text-primary-500">
                                                    {notification.message}
                                                </p>
                                            </div>
                                            <small className="text-default-500">
                                                {notification.createdAt}
                                            </small>
                                        </Card>
                                    ))}
                                </ScrollShadow>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </body>
        </div>
    );
}
