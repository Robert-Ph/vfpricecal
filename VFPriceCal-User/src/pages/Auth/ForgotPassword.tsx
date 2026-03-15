
import { useState } from "react";
import "./forgotPassword.scss";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const navigate = useNavigate();

    const handleSend = () => {
        if (!email) return;
        setSent(true);
    };

    const handleBackLogin = () => {
        navigate("/login");
    };

    return (
        <div className="forgot">

            <div className="forgot__box">

                <h2>Quên mật khẩu</h2>

                <p className="desc">
                    Nhập email tài khoản của bạn. Hệ thống sẽ gửi mật khẩu mới về email.
                </p>

                <input
                    type="email"
                    placeholder="Nhập email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button className="send-btn" onClick={handleSend}>
                    Gửi mật khẩu mới
                </button>

                {sent && (
                    <div className="success">
                        ✔ Mật khẩu mới đã được gửi về email của bạn
                    </div>
                )}

                <div className="back-login" onClick={handleBackLogin}>
                    Quay lại đăng nhập
                </div>

            </div>

        </div>
    );
}

