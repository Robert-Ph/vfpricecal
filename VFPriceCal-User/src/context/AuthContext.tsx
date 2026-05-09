import { createContext } from "react";

export interface AuthContextType {
  role: string | null;
  username: string | null;
  loginUser: (u: string, p: string) => Promise<void>;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);