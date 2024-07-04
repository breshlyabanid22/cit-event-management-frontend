import { User } from "@/types";
export const Register = async (data: User) => {
  const response = await fetch(import.meta.env.BASE_URL + "/register");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const Login = async (data: any) => {
  const response = await fetch(import.meta.env.BASE_URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
