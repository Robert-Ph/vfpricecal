import { createContext } from "react";

// 1. Định nghĩa cấu trúc UserInfo khớp với dữ liệu ẩn bạn muốn lưu
export interface UserInfo {
  companyId: string; // Hoặc number nếu companyId là số
  companyName: string;
  username: string;
  fullname: string;
  email: string;
  plan: string;
  role: string;
  phone: string;
  startTime: string;
  endTime:string;
  maxUsers: number;
}

export interface AuthContextType {
  role: string | null;
  user: UserInfo | null; // Thông tin user chứa companyId ẩn
  loginUser: (u: string, p: string) => Promise<UserInfo>; // Chuyển sang any hoặc Promise<data> để xử lý kết quả login
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);