import { Event, Resource, Venue, TypeUser } from "@/types";
export const addVenue = async (venue: Venue) => {
    const response = await fetch("http://localhost:8080/venues", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(venue),
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Network Error");
    }
    return response.json();
};

export const addEvent = async (event: Event) => {
    const response = await fetch("http://localhost:8080/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Network Error");
    }
    return response.json();
};

export const addResource = async (resource: Resource) => {
    const response = await fetch("http://localhost:8080/resources", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(resource),
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Network Error");
    }
    return response.json();
};

export const getUsers = async (): Promise<TypeUser[]> => {
    const response = await fetch("http://localhost:8080/admin/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Network Error");
    }
    return response.json();
};

export const editUser = async (user: TypeUser) => {
    const response = await fetch(
        `http://localhost:8080/admin/users/${user.userID}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
            credentials: "include",
        },
    );
    if (!response.ok) {
        throw new Error("Network Error");
    }
    return response.text();
};

export const deleteUser = async (userID: number) => {
    const response = await fetch(
        `http://localhost:8080/admin/users/${userID}/deactivate`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        },
    );
    if (!response.ok) {
        throw new Error("Network Error");
    }
    return response.text();
};

export const activateUser = async (userID: number) => {
    const response = await fetch(
        `http://localhost:8080/admin/users/${userID}/activate`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        },
    );
    if (!response.ok) {
        throw new Error("Network Error");
    }
    return response.text();
};

export const getVenues = async () => {
    const response = await fetch("http://localhost:8080/venues", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Network Error");
    }
    return response.json();
};
