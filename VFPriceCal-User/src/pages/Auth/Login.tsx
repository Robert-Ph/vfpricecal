
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { toast } from "react-toastify";
import { login } from "../../service/AuthService";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Nên thêm state này để quản lý UI
    // const [error, setError] = useState("");
    //  const { loginUser, logoutUser } = useAuth(); 
    // const [loginuser, logoutuser] = useState("");
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();

   const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        // // 1. Gọi API đăng nhập
        // const response = await login(email, password);

        // // 2. Lưu trữ thông tin (Token và User)
        // // Lưu ý: Thường API trả về response.data, bạn hãy kiểm tra lại cấu trúc trả về của hàm login nhé
        // if (response.token) {
        //     localStorage.setItem("token", response.token);
        // }
        
        // if (response.user) {
        //     localStorage.setItem("user", JSON.stringify(response.user));
            
        //     // 3. Cập nhật vào Global State / Context (nếu có)
        //     // loginUser(response.user); 
        // }

// Login.tsx
const response = await login(email, password);

console.log("Full Response:", response); 

// Vì response chính là object {companyId: 1, username: 'admin', ...}
if (response && response.username) {
    localStorage.setItem("user", JSON.stringify(response));
    
    // Nếu có token riêng lẻ đi kèm (thường nằm chung trong response)
    if (response.token) {
        localStorage.setItem("token", response.token);
    }

    navigate("/quotation");
}

        // 4. Thông báo và điều hướng
        toast.success("Đăng nhập thành công!");
        navigate("/quotation");

    } catch (err: any) {
        // 5. Xử lý lỗi
        const errorMessage = err.response?.data?.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.";
        toast.error(errorMessage);
        console.error("Login Error:", err);
    } finally {
        setLoading(false);
    }
};

    const handleForgotPassword = () => {
        navigate("/forgot-password");
    }

    return (
        <div className="login">

            <div className="login__left">
                <div className="login__brand">
                    <h1>VFLT SYSTEM</h1>
                    <p>Management Platform</p>
                </div>
            </div>

    <div className="login__right">
            <form  onSubmit={handleLogin}>
                 <div className="login__form">

                    <h2>Đăng nhập</h2>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            placeholder="Nhập email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Mật khẩu</label>

                        <div className="password-box">
                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <span
                                className="show-pass"
                                onClick={() => setShowPass(!showPass)}
                            >
                                {showPass ? "Ẩn" : "Hiện"}
                            </span>
                        </div>

                    </div>

                    <button className="login-btn" type="submit">
                        Đăng nhập
                    </button>

                    <div className="login__extra" onClick={handleForgotPassword}>
                        <span>Quên mật khẩu?</span>
                    </div>

                </div>
                 </form>
               

            </div>
            

        </div>
    );
}

export default Login;
