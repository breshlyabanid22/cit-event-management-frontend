import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export type accountRegister = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    schoolID: string;
    password: string;
};

export type accountLogin = {
    username: string;
    password: string;
};

export type TypeUser = {
    userID: number;
    username: string;
    password: string;
    email: string;
    schoolID: string;
    firstName: string;
    lastName: string;
    userType: string | null;
    role: string;
    year: number | null;
    course: number | null;
    department: number | null;
    createdAt: string;
    updatedAt: number | null;
    active: boolean;
};

export const Department = [
    {
        value: "Elementary",
        label: "Elementary",
    },
    {
        value: "Junior High",
        label: "Junior High",
    },
    {
        value: "Senior High",
        label: "Senior High",
    },
    {
        value: "College",
        label: "College",
    },
];

export const SchoolDepartment = [
    {
        value: "College of Engineering and Architecture",
        label: "College of Engineering and Architecture",
    },
    {
        value: "College of Arts, Science and Education",
        label: "College of Arts, Science and Education",
    },
    {
        value: "College of Management, Business and Accountancy",
        label: "College of Management, Business and Accountancy",
    },
    {
        value: "College of Nursing and Allied Health Sciences",
        label: "College of Nursing and Allied Health Sciences",
    },
    {
        value: "College of Computer Studies",
        label: "College of Computer Studies",
    },
    {
        value: "College of Criminal Justice",
        label: "College of Criminal Justice",
    },
];

export const Roles = [
    {
        value: "participant",
        label: "Participant",
    },
    {
        value: "organizer",
        label: "Organizer",
    },
    {
        value: "venueManager",
        label: "Venue Manager",
    },
];

export const Type = [
    {
        value: "student",
        label: "Student",
    },
    {
        value: "employee",
        label: "Employee",
    },
];

export const Course = [
    {
        value: "BSIT",
        label: "Course 1",
    },
    {
        value: "course2",
        label: "Course 2",
    },
    {
        value: "course3",
        label: "Course 3",
    },
];

export const Year = [
    {
        value: "1st Year",
        label: "1st Year",
    },
    {
        value: "2nd Year",
        label: "2nd Year",
    },
    {
        value: "3rd Year",
        label: "3rd Year",
    },
    {
        value: "4th Year",
        label: "4th Year",
    },
    {
        value: "5th Year",
        label: "5th Year",
    },
];

export const ElementaryYear = [
    {
        value: "Grade 1",
        label: "Grade 1",
    },
    {
        value: "Grade 2",
        label: "Grade 2",
    },
    {
        value: "Grade 3",
        label: "Grade 3",
    },
    {
        value: "Grade 4",
        label: "Grade 4",
    },
    {
        value: "Grade 5",
        label: "Grade 5",
    },
    {
        value: "Grade 6",
        label: "Grade 6",
    },
];

export const JuniorHighYear = [
    {
        value: "Grade 7",
        label: "Grade 7",
    },
    {
        value: "Grade 8",
        label: "Grade 8",
    },
    {
        value: "Grade 9",
        label: "Grade 9",
    },
    {
        value: "Grade 10",
        label: "Grade 10",
    },
];

export const SeniorHighYear = [
    {
        value: "Grade 11",
        label: "Grade 11",
    },
    {
        value: "Grade 12",
        label: "Grade 12",
    },
];

export type Venue = {
    id: number;
    name: string;
    location: string;
    maxCapacity: number;
    events: String[];
    venueManagers: String[];
};

export type Event = {
    name: string;
    description: string;
    venueId: number;
    resourceId: number[];
    image: File | undefined;
    startTime: string;
    endTime: string;
};

export type Resource = {
    id: number;
    name: string;
    type: string;
    description: string;
    availability: boolean;
};

export type Notifications = {
    id: number;
    recipient: string;
    message: string;
    event: string;
    createdAt: string;
}