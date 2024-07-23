import { Event, Venue, Resource, TypeUser } from "@/types";

export async function addVenue(data: {
    userID: number;
    venueManagersID: number;
    name: string;
    location: string;
    maxCapacity: number;
    images: File[];
}) {
    const createVenueData = {
        userID: data.userID,
        venueManagersID: data.venueManagersID,
        name: data.name,
        location: data.location,
        maxCapacity: data.maxCapacity,
        imageFiles: data.images,
    };

    const formData = new FormData();

    formData.append(
        "venueDTO",
        new Blob([JSON.stringify(createVenueData)], {
            type: "application/json",
        }),
    );
    if (createVenueData.imageFiles && createVenueData.imageFiles.length > 0) {
        Array.from(createVenueData.imageFiles).forEach((file) => {
            formData.append("imageFiles", file);
        });
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

export const approveEvent = async (eventID: number) => {
    const response = await fetch(
        `http://localhost:8080/events/${eventID}/approve`,
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
    return response.text();
};

export const getResources = async () => {
    const response = await fetch("http://localhost:8080/resources", {
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

export const editResource = async (resource: Resource) => {
    const response = await fetch(
        `http://localhost:8080/resources/${resource.id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(resource),
            credentials: "include",
        },
    );
    if (!response.ok) {
        throw new Error("Network Error");
    }
    return response.text();
};

export const deleteResource = async (resourceId: number) => {
    const response = await fetch(
        `http://localhost:8080/resources/${resourceId}`,
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
    if (response.status == 409) {
        throw new Error("School Id already exist");
    } else if (response.status == 400) {
        throw new Error("Email already exist");
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

export const editAccount = async (account: {
    firstName: string;
    lastName: string;
}) => {
    const response = await fetch(`http://localhost:8080/users/account`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(account),
        credentials: "include",
    });
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

export const editVenue = async (data: {
    id: number;
    userID: number;
    venueManagersID: number;
    name: string;
    location: string;
    maxCapacity: number;
    images: File[];
}) => {
    const response = await fetch(`http://localhost:8080/venues/${data.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Network Error");
    }
    return response.text();
};

export const deleteVenue = async (venueID: number) => {
    const response = await fetch(`http://localhost:8080/venues/${venueID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Network Error");
    }
    return response.text();
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

export const getEventById = async (eventId: number) => {
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
        `http://localhost:8080/events/${eventId}/cancel`,
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

// Evenst that are displayed in the upcoming events
export const approvedEvents = async () => {
    const response = await fetch("http://localhost:8080/events/approved", {
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
//Events created by the organizer
export const getEventsByOrganizer = async (userID: number) => {
    const response = await fetch(`http://localhost:8080/events/${userID}/event`, {
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