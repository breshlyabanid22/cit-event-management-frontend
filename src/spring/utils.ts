import { accountRegister } from "@/types";
import axios from "axios";
import { redirect } from "react-router-dom";

export const Register = async (userData: accountRegister) => {
	try {
		const response =  axios.post("http://localhost:8080/register", userData, {
      headers: {
        "Content-Type": "application/json",
		"withCredentials": true,
      },
    });
    return response;
	} catch (error) {
		throw error;
	}
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

	redirect("/app")
	return response.json();
};
