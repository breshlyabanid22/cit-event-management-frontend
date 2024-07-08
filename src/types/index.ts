import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type accountRegister = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  schoolId: string;
  password: string;
  passwordConfirm: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
};
