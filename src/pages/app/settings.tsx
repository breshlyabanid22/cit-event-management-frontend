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
} from "@nextui-org/react";
import {
  Course,
  Department,
  ElementaryYear,
  JuniorHighYear,
  SeniorHighYear,
  Year,
} from "@/types";
import { useState } from "react";
import clsx from "clsx";
import { z } from "zod";
import useAuth from "@/provider/auth";
import {
  UsernameCard,
  PasswordCard,
  EmailCard,
} from "@/components/app/SecuritySettingsCard";

const settingsSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First Name must be at least 1 character long"),
    lastName: z.string().min(1, "Last Name must be at least 1 character long"),
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    schoolID: z.string().min(6, "School ID must be at least 6 character long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
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

export default function Settings() {
  const { user } = useAuth();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const handleDepartmentChange = (value: any) => {
    setSelectedDepartment(value.currentKey);
  };
  return (
    <div>
      <header className="mb-6 flex w-full items-center justify-between">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">Settings</p>
          <p className="text-md font-light">
            Customize settings & manage your account
          </p>
        </div>
      </header>
      <body className="flex">
        <div className="col-span-1 flex flex-col gap-4">
          <Tabs radius="lg" size="lg" aria-label="Options">
            <Tab key="profile" title="Profile">
              <div className="sm:w-full md:w-[400px] lg:w-[600px]">
                <h3 className="text-lg font-bold">Profile</h3>
                <p className="text-default-500">
                  This displays your profile information.
                </p>
                <Card radius="lg" shadow="sm" className="gap-4 mt-4">
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
                        {user?.firstName} {user?.lastName}{" "}
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
                      <p className="text-xs text-default-400">{user?.email}</p>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Tab>
            <Tab key="account" title="Account">
              <div className="sm:w-full md:w-[400px] lg:w-[600px]">
                <h3 className="text-lg font-bold">Full Name</h3>
                <p className="text-default-500">
                  Your full name in your account.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    className="mt-2"
                    size="md"
                    radius="lg"
                    placeholder="First Name"
                    defaultValue={user?.firstName}
                  />
                  <Input
                    type="text"
                    className="mt-2"
                    size="md"
                    radius="lg"
                    placeholder="Last Name"
                    defaultValue={user?.lastName}
                  />
                </div>

                <h3 className="mt-4 text-lg font-bold">Department</h3>
                <p className="text-default-500">
                  Your Department in your account.
                </p>
                <Select
                  placeholder="Select a Department"
                  className="mt-2 w-full"
                  onSelectionChange={handleDepartmentChange}
                >
                  {Department.map((items) => (
                    <SelectItem key={items.value} value={items.value}>
                      {items.label}
                    </SelectItem>
                  ))}
                </Select>
                <h3 className="mt-4 text-lg font-bold">Course / Year</h3>
                <p className="text-default-500">
                  Your academic level in your account.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {selectedDepartment === "College" && (
                    <Select
                      placeholder="Select a course"
                      className="w-full mt-2"
                    >
                      {Course.map((items) => (
                        <SelectItem key={items.value} value={items.value}>
                          {items.label}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                  <Select
                    isDisabled={selectedDepartment === ""}
                    placeholder="Select a Year"
                    className={clsx("mt-2 w-full", {
                      "col-span-2": selectedDepartment !== "College",
                    })}
                  >
                    {selectedDepartment === "Elementary" ? (
                      ElementaryYear.map((items) => (
                        <SelectItem key={items.value} value={items.value}>
                          {items.label}
                        </SelectItem>
                      ))
                    ) : selectedDepartment === "Junior High" ? (
                      JuniorHighYear.map((items) => (
                        <SelectItem key={items.value} value={items.value}>
                          {items.label}
                        </SelectItem>
                      ))
                    ) : selectedDepartment === "Senior High" ? (
                      SeniorHighYear.map((items) => (
                        <SelectItem key={items.value} value={items.value}>
                          {items.label}
                        </SelectItem>
                      ))
                    ) : selectedDepartment === "College" ? (
                      Year.map((items) => (
                        <SelectItem key={items.value} value={items.value}>
                          {items.label}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem
                        key="Undefined"
                        value="Undefined"
                      ></SelectItem>
                    )}
                  </Select>
                </div>
              </div>
            </Tab>
            <Tab key="security" title="Security">
              <div className="sm:w-full md:w-[400px] lg:w-[600px]">
                {" "}
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
                <Card>
                  <CardBody>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </CardBody>
                </Card>
              </div>
            </Tab>
          </Tabs>
        </div>
      </body>
    </div>
  );
}
