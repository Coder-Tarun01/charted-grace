import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AUTH_KEY = "charted-grace-admin-auth";
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

type AdminAuthContextValue = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsAuthenticated(window.localStorage.getItem(AUTH_KEY) === "1");
  }, []);

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      isAuthenticated,
      login: (username, password) => {
        const ok = username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
        if (ok) {
          setIsAuthenticated(true);
          window.localStorage.setItem(AUTH_KEY, "1");
        }
        return ok;
      },
      logout: () => {
        setIsAuthenticated(false);
        window.localStorage.removeItem(AUTH_KEY);
      },
    }),
    [isAuthenticated],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider.");
  }
  return ctx;
}

