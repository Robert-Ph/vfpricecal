import  {useState } from 'react';
import './login.scss';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/logo.png";
import { toast } from "react-toastify";
import { login } from '../../service/AuthenService';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

        const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    };

    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // setLoading(true);
     if (!email.trim()) {
        toast.error("Vui lòng nhập email");
        return;
    }

    if (!isValidEmail(email)) {
        toast.error("Email không đúng định dạng");
        return;
    }

    if (!password.trim()) {
        toast.error("Vui lòng nhập mật khẩu");
        return;
    }

    try {
        const response = await login(email, password);

        if (!response || !response.token) {
            toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.");
            return;
        }
        // Lưu token vào localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response));
        localStorage.setItem("role", response.role);
            navigate("/dashboard");
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
        // setLoading(false);
    }
};

  return (
    <div className="login-page">

      <div className="login-container">

        {/* Left */}

        <div className="login-form">

          <div className="logo-section">

            <img
              src={logo}
              alt="logo"
            />

            <div>
              <h2>VF PRICECAL</h2>
              <span>Control Center</span>
            </div>

          </div>

          <h1>Welcome Back 👋</h1>

          <p className="subtitle">
            Sign in to continue to your admin dashboard
          </p>

          <form onSubmit={handleLogin}>

            <div className="form-group">

              <label>Email Address</label>

              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

            <div className="form-group">

              <label>Password</label>

              <div className="password-input">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            <div className="options">

              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <a href="#">
                Forgot Password?
              </a>

            </div>

            <button
              type="submit"
              className="login-btn"
            >
              Sign In
            </button>

          </form>

        </div>

        {/* Right */}

        <div className="login-banner">

          <div className="floating-card card1" />
          <div className="floating-card card2" />
          <div className="floating-card card3" />

          <div className="content">

            <h2>
              Powerful Print Quotation Platform
            </h2>

            <p>
              Manage companies, subscriptions,
              quotations and analytics from
              one centralized dashboard.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;