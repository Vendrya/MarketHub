"use client";
import { createContext, useEffect, useState } from "react";
import * as React from "react";

interface AuthContextType {
    auth: any;
    setAuth: React.Dispatch<React.SetStateAction<any>>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const parseUser = JSON.parse(storedUser);
                setAuth(parseUser);
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (auth) {
            localStorage.setItem("user", JSON.stringify(auth));
        } else {
            localStorage.removeItem("user");
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
