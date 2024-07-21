import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TypeUser, accountLogin } from "@/types";
import { removeCookie } from "@/hooks/cookie";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface AuthState {
    user: TypeUser | null;
    isAuthenticated: boolean;
    setUser: (user: TypeUser | null) => void;
    logout: () => Promise<void>;
    removeCookie: (name: string) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            setUser: (user) =>
                set({
                    user: { ...user, password: undefined },
                    isAuthenticated: !!user,
                }),
            logout: async () => {
                try {
                    await fetch("http://localhost:8080/users/logout", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    });
                    set({
                        user: null,
                        isAuthenticated: false,
                    });
                    removeCookie("JSESSIONID");
                    localStorage.removeItem("auth-storage");
                } catch (error) {
                    console.error("Logout error:", error);
                }
            },
            removeCookie: (name: string) => {
                document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

export const useLogin = () => {
    const queryClient = useQueryClient();
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: async (loginData: accountLogin) => {
            const response = await fetch("http://localhost:8080/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
                credentials: "include",
            });

            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Login failed");
            }
        },
        onSuccess: (user: TypeUser) => {
            setUser(user);
            queryClient.invalidateQueries({ queryKey: ["user", user.userID] });
        },
        onError: (error) => {
            console.error("Login error:", error);
            throw error;
        },
    });
};

export const useUser = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const removeCookie = useAuthStore((state) => state.removeCookie);

    return useQuery({
        queryKey: ["user", user?.userID],
        queryFn: async () => {
            if (!user?.userID) return null;
            const response = await fetch(
                `http://localhost:8080/users/${user.userID}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                },
            );

            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to fetch user data");
            }
        },
        enabled: !!user?.userID,
        onError: (error) => {
            console.error("Error fetching user data:", error);
            logout();
            removeCookie("JSESSIONID");
            localStorage.removeItem("auth-storage");
        },
    });
};
