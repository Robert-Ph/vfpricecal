import { useState } from "react";
import "./loginMobile.scss";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ExpiredAccountModal from "../../components/auth/ExpiredAccountModal";
import { toast } from "react-toastify";
import { login } from "../../service/AuthService";

export default function LoginPage() {
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
      const [showExpiredModal, setShowExpiredModal] = useState(false);
    const [planMess, setPlanMess] = useState<string>("TRIAL");

   const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      // setLoading(true);
  
      try {
          const response = await login(email, password);
  
          if (response && response.username) {
  
              // Kiểm tra hết hạn
              if (response.plan !== "BETA" && response.endTime) {
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
  
              navigate("/quotation-mobile");
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
          // setLoading(false);
      }
  };

  return (
    <div className="login-mobile">
      {/* Header */}
      <div className="login-header">
        <img src="/logo.png" alt="logo" className="logo" />

        <h1>VF PRINT</h1>
        <h1>ECOSYSTEM</h1>

        <p>Management Platform</p>
      </div>

      {/* Form */}
      <form action="" onSubmit={handleLogin}>
      <div className="login-content">
        <h2>Đăng nhập</h2>

        <div className="input-group">
          <label>Email</label>

          <div className="input-box">
            <FiMail />
            <input
              type="email"
              placeholder="Nhập email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="input-group">
          <label>Mật khẩu</label>

          <div className="input-box">
            <FiLock />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="show-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div className="option-row">
          <label className="remember">
            <input type="checkbox" />
            Ghi nhớ đăng nhập
          </label>

          <a href="#">Quên mật khẩu?</a>
        </div>

        <button className="login-btn" type="submit">
          Đăng nhập
        </button>

        {/* <div className="divider">
          <span>HOẶC</span>
        </div>

        <button className="google-btn">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
          />
          Đăng nhập với Google
        </button>

        <div className="register">
          Chưa có tài khoản?
          <a href="#"> Đăng ký ngay</a>
        </div> */}
      </div>

      </form>


                  <ExpiredAccountModal
                      open={showExpiredModal}
                      planMess={planMess}
                      onClose={() => setShowExpiredModal(false)}
                  />
    </div>
  );
}