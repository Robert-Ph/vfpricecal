
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";

const Login = () => {

    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        // giả lập đăng nhập thành công và lưu token
        // localStorage.setItem("token", "fake-jwt-token");

        // chuyển trang
        navigate("/");
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

                <div className="login__form">

                    <h2>Đăng nhập</h2>

                    <div className="form-group">
                        <label>Tài khoản</label>
                        <input type="text" placeholder="Nhập tài khoản" />
                    </div>

                    <div className="form-group">
                        <label>Mật khẩu</label>

                        <div className="password-box">
                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="Nhập mật khẩu"
                            />

                            <span
                                className="show-pass"
                                onClick={() => setShowPass(!showPass)}
                            >
                                {showPass ? "Ẩn" : "Hiện"}
                            </span>
                        </div>

                    </div>

                    <button className="login-btn" onClick={handleLogin}>
                        Đăng nhập
                    </button>

                    <div className="login__extra" onClick={handleForgotPassword}>
                        <span>Quên mật khẩu?</span>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
