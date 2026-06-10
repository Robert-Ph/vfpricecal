
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { toast } from "react-toastify";
import { login } from "../../service/AuthService";
import logo from "../../assets/logo.png";
import ExpiredAccountModal from "../../components/auth/ExpiredAccountModal";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Nên thêm state này để quản lý UI
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const [showExpiredModal, setShowExpiredModal] = useState(false);
    const [planMess, setPlanMess] = useState<string>("TRIAL");

    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await login(email, password);

        if (response && response.username) {

            // Kiểm tra hết hạn
            if (response.endTime) {
                const isExpired =
                    new Date(response.endTime).getTime() <
                    new Date().getTime();

                if (isExpired) {
                    setPlanMess(response.plan ?? "TRIAL")
                    setShowExpiredModal(true);
                    return;
                }
            }

    

            localStorage.setItem("user", JSON.stringify(response));
            localStorage.setItem("token", response.token);

            navigate("/quotation");
        }
    } catch (err: unknown) {
        const error = err as {
            response?: {
                data?: {
                    message?: string;
                };
            };
        };

        const errorMessage =
            error.response?.data?.message ||
            "Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.";

        toast.error(errorMessage);
    } finally {
        setLoading(false);
    }
};

    // const handleLogin = async (e: React.FormEvent) => {
    //         e.preventDefault();
    //         setLoading(true);

    //         try {
       
    //             const response = await login(email, password);
    //             // Vì response chính là object {companyId: 1, username: 'admin', ...}
    //             if (response && response.username) {
    //                 localStorage.setItem("user", JSON.stringify(response));
    
    //                 localStorage.setItem("token", response.token);
                    

    //                 navigate("/quotation");
    //             }

    //             navigate("/quotation");

    //         } catch (err: any) {
    //             // 5. Xử lý lỗi
    //             const errorMessage = err.response?.data?.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.";
    //             toast.error(errorMessage);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    const handleForgotPassword = () => {
        navigate("/forgot-password");
    }

    return (
        <div className="login">

            <div className="login__left">
                <div className="login__brand">
                    <img 
                    src={logo} 
                    alt="VFprint Logo" 
                    className="brand__logo" 
                    />
                    <h1>VF PRINT</h1>
                    <h1>ECOSYSTEM</h1>
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
            
            <ExpiredAccountModal
                open={showExpiredModal}
                planMess={planMess}
                onClose={() => setShowExpiredModal(false)}
            />

        </div>
    );
}

export default Login;
