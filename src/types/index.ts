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

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
};

export const Department = [
	{ value: "Elementary", label: "Elementary" },
	{ value: "Junior High", label: "Junior High" },
	{ value: "Senior High", label: "Senior High" },
	{ value: "College", label: "College" },
];

export const Roles = [
	{ value: "participant", label: "Participant" },
	{ value: "organizer", label: "Organizer" },
	{ value: "venueManager", label: "Venue Manager" },
];

export const Type = [
  { value: "student", label: "Student" },
  { value: "employee", label: "Employee" },
];

export const Course = [
	{ value: "BSIT", label: "Course 1" },
	{ value: "course2", label: "Course 2" },
	{ value: "course3", label: "Course 3" },
];

export const Year = [
	{ value: "1st Year", label: "1st Year" },
	{ value: "2nd Year", label: "2nd Year" },
	{ value: "3rd Year", label: "3rd Year" },
  { value: "4th Year", label: "4th Year" },
  { value: "5th Year", label: "5th Year" },
];