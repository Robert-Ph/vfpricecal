import  {useState } from 'react';
import './login.scss';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/logo.png";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        navigate("/dashboard"); // Điều hướng đến dashboard sau khi đăng nhập thành công
        // Handle login logic here
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

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>Email Address</label>

              <input
                type="email"
                placeholder="admin@example.com"
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