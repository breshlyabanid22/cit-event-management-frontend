import { Event, Resource, Venue } from "@/types";
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

export const getUsers = async () => {
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
