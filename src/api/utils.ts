import { Event, Resource, TypeUser } from "@/types";

export async function addVenue(data: {
    userID: number;
    venueManagersID: number;
    name: string;
    location: string;
    maxCapacity: number;
    image: File;
}) {
    const createVenueData = {
        userID: data.userID,
        venueManagersID: data.venueManagersID,
        name: data.name,
        location: data.location,
        maxCapacity: data.maxCapacity,
        image: data.image,
    };

    const formData = new FormData();

    formData.append(
        "venueDTO",
        new Blob([JSON.stringify(createVenueData)], {
            type: "application/json",
        }),
    );
    if (createVenueData.image) {
        formData.append("imageFile", data.image);
    }

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

export const getEvent = async (eventId: number) => {
    const response = await fetch(`http://localhost:8080/events/${eventId}`, {
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

export const editEvent = async (event: Event) => {
    const response = await fetch(
        `http://localhost:8080/events/${event.eventId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
            credentials: "include",
        },
    );
    if (!response.ok) {
        throw new Error("Network Error");
    }
    return response.text();
};

export const deleteEvent = async (eventId: number) => {
    const response = await fetch(
        `http://localhost:8080/events/${eventId}/deactivate`,
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

export const getAllEvents = async () => {
    const response = await fetch("http://localhost:8080/events", {
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
