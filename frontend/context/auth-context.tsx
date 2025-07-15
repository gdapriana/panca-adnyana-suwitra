"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Role } from "@/types/role";
import { User } from "@/lib/types";

interface AuthContextType {
	authenticated: boolean;
	loading: boolean;
	role: Role | null;
	login: (token: string) => void;
	logout: () => void;
	user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [authenticated, setAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const [role, setRole] = useState<Role | null>(null);
	const [user, setUser] = useState<any | null>(null);

	useEffect(() => {
		const initAuth = async () => {
			setLoading(true);
			const token = localStorage.getItem("token");
			if (token) {
				try {
					const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
						headers: {
							"X-API-TOKEN": token,
						},
					});

					if (!res.ok) throw new Error("Not authenticated");

					const data = await res.json();
					setAuthenticated(true);
					setRole(data.data.role);
					setUser(data.data);
				} catch (err) {
					console.error("Auth error:", err);
					localStorage.removeItem("token");
					setAuthenticated(false);
					setRole(null);
				}
			}
			setLoading(false);
		};

		initAuth().then();
	}, []);

	const login = (token: string) => {
		localStorage.setItem("token", token);
		setAuthenticated(true);
	};

	const logout = () => {
		localStorage.removeItem("token");
		setAuthenticated(false);
		setRole(null);
		setUser(null);
		window.location.reload();
	};

	return <AuthContext.Provider value={{ authenticated, loading, role, login, logout, user }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuthContext must be used within AuthProvider");
	return context;
};
