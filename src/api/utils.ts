import { Event, Resource, Venue, TypeUser } from "@/types";

export async function addVenue(data: {
    userID: number;
    venueManager: String[];
    name: string;
    location: string;
    maxCapacity: number;
    image: File;
}) {
    const createVenueData = {
        userID: data.userID,
        venueManager: data.venueManager,
        name: data.name,
        location: data.location,
        maxCapacity: data.maxCapacity,
    };

    const formData = new FormData();

    formData.append(
        "venueDTO",
        new Blob([JSON.stringify(createVenueData)], {
            type: "application/json",
        }),
    );
    createVenueData.venueManager.forEach((id) => {
        formData.append("venueManager", id.toString());
    });

    formData.append("imageFile", data.image);

    const response = await fetch("http://localhost:8080/venues", {
        method: "POST",
        body: formData,
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to add venue");
    }

    return response.text();
}

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