import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../src/config/axiosConfig";

interface AuthContextType {
    token: string | null;
    valid: string | null;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const defaultAuthContext: AuthContextType = {
    token: null,
    valid: null,
    loading: true,
    login: () => { },
    logout: () => { },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [valid, setValid] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            setToken(accessToken);
            validateToken(accessToken);
        } else {
            setLoading(false);
        }
    }, []);

    const validateToken = async (accessToken: string) => {
        let tk = accessToken.replace(/"/g, "");
        try {
            const response = await api.get("auth/validate-token", {
                headers: {
                    Authorization: `Bearer ${tk}`,
                },
            });

            if (response.data.valid === true) {
                setValid(accessToken);
            } else {
                logout();
                console.log("Token inválido", response);
            }
        } catch (error) {
            console.error("Erro ao validar token:", error);
            setToken(null);
        } finally {
            setLoading(false);
        }
    };

    const login = (accessToken: string) => {
        localStorage.setItem("access_token", accessToken);
        setToken(accessToken);
        setValid(accessToken);
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        setToken(null);
        setValid(null);
    };

    return (
        <AuthContext.Provider value={{ valid, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
