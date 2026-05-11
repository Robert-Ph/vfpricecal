
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { useAuth } from "../../hooks/userAuth";
import { toast } from "react-toastify";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
     const { loginUser, logoutUser } = useAuth(); 
    // const [loginuser, logoutuser] = useState("");
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // giả lập đăng nhập thành công và lưu token
        // localStorage.setItem("token", "fake-jwt-token");
        // setError("");
        try{
            // Gọi API đăng nhập
            await loginUser(email, password);
            // Lưu token vào localStorage
            navigate("/quotation");
        }
        // chuyển trang
        catch (err: any) {
            toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.");
        }
    }

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
