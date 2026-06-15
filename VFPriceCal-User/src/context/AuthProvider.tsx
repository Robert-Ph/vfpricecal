import React, { useState, type ReactNode } from "react";
import { login } from "../service/AuthService";
import { AuthContext } from "./AuthContext";
import type { UserInfo } from "./AuthContext";

// Định nghĩa Interface chuẩn cho thông tin User

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Khởi tạo state từ localStorage để tránh mất dữ liệu khi F5 (Refresh) trang
 const [user, setUser] = useState<UserInfo | null>(() => {
  try {
    const savedUser = localStorage.getItem("user");

    if (
      !savedUser ||
      savedUser === "undefined" ||
      savedUser === "null"
    ) {
      return null;
    }

    return JSON.parse(savedUser);
  } catch (error) {
    console.error("Invalid user data:", error);
    localStorage.removeItem("user");
    return null;
  }
});

  const [role, setRole] = useState<string | null>(
    localStorage.getItem("role")
  );

 const loginUser = async (u: string, p: string) => {
  try {
    // Gọi hàm login từ AuthService
    const data = await login(u, p); 
    
    // Lúc này 'data' chính là 'response.data.data' từ AuthService trả về
    console.log("Data nhận được từ Service:", data);

    if (data) {
      const userInfo: UserInfo = {
        // Kiểm tra chính xác tên trường Backend trả về (companyId hay company_id?)
        companyId: String(data.companyId),
        companyName: data.companyName,
        username: data.username,
        fullname: data.fullname,
        email: data.email,
        plan: data.plan,
        role: data.role,
        phone: data.phone,
        startTime: data.startTime,
        endTime: data.endTime,
      };

      setUser(userInfo);
      setRole(data.role);
      
      localStorage.setItem("user", JSON.stringify(userInfo));
      localStorage.setItem("companyId", data.companyId.toString()); // Lưu companyId riêng nếu cần
      localStorage.setItem("role", data.role);
      // localStorage.setItem("token", data.token); // Đừng quên lưu token để gọi API sau này

      return data;
    }
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

  const logoutUser = () => {
    // Xóa sạch dấu vết
    localStorage.clear();
    setUser(null);
    setRole(null);
    // Điều hướng về trang login
    // window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      // Truyền cả 'user' (chứa companyId ẩn) vào Provider
      value={{ role, user, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};