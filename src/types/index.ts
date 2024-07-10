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
