import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User, accountLogin } from "@/types";
interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	setUser: (user: User | null) => void;
	login: (loginData: accountLogin) => Promise<void>;
	logout: () => Promise<void>;
	refreshUserData: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			isAuthenticated: false,
			setUser: (user) => set({ user, isAuthenticated: !!user }),
			login: async (loginData) => {
				try {
					const response = await fetch("http://localhost:8080/users/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(loginData),
						credentials: "include",
					});
					if (response.ok) {
						const user = await response.json();
						set({ user, isAuthenticated: true });
					} else {
						throw new Error("Login failed");
					}
				} catch (error) {
					console.error("Login error:", error);
					throw error;
				}
			},
			logout: async () => {
				try {
					await fetch("http://localhost:8080/users/logout", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						credentials: "include",
					});
					set({ user: null, isAuthenticated: false });
					localStorage.removeItem("auth-storage");
				} catch (error) {
					console.error("Logout error:", error);
				}
			},
			refreshUserData: async () => {
				try {
					const userId = get().user?.userID;
					if (!userId) return;
					const response = await fetch(`http://localhost:8080/users/${userId}`, {
						headers: {
							"Content-Type": "application/json",
						},
						credentials: "include",
					});

					if (response.ok) {
						const userData = await response.json();
						set({ user: userData, isAuthenticated: true });
					}
				} catch (error) {
					console.error("Refresh user data error:", error);
					get().logout();
				}
			},
		}),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useAuthStore;
