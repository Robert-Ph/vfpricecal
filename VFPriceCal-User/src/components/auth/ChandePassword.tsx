import { useEffect, useState} from "react";
import "./changePassword.scss";
import { toast } from "react-toastify";
import { changePassword } from "../../service/AuthService";
import type { UserInfo } from "../../context/AuthContext";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
const ChangePasswordModal = ({ open, setOpen }: Props) => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // Lưu thông báo lỗi chung hoặc riêng



   const [user] = useState<UserInfo>(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            try {
                return JSON.parse(savedUser);
            } catch (e) {
                return e;
            }
        }
        return null;
    });

  useEffect(() => {
    if(password && confirmPassword && password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
    } else {
      setError("");
    }
  }, [password, confirmPassword]);

  const handleSubmit = async () => {
        // Validate inputs
        if (!password || !confirmPassword) {
            setError("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        
        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp!");
            return;
        }

        try {
            // Gọi API để đổi mật khẩu
            const response = await changePassword(user.email, password);

            if (response.message !== "Password changed successfully") {
                toast.error("Đổi mật khẩu thất bại. Mật khẩu trùng với mật khẩu cũ.");
                return;
            }
            // Hiển thị thông báo thành công
            toast.success("Đổi mật khẩu thành công!");
            setOpen(false); // Đóng modal sau khi đổi mật khẩu thành công
        } catch (error) {
            console.error("Failed to change password:", error);
            toast.error("Đổi mật khẩu thất bại. Vui lòng thử lại.");
        }

    
  };

    if (!open) return null;

  return createPortal (
    <div className="overlay">
      
      <div className="modal">
        
        <div className="modal-header">
          Đổi mật khẩu
        </div>

        <div className="main">

          <div className="info">
            <label>Mật khẩu mới</label>
            <input
            className={!password && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="password"
              placeholder="Nhập mật khẩu mới..."
              value={password}
              onChange={(e) => {setPassword(e.target.value)
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

            
          <div className="info">
            <label>Xác nhận mật khẩu</label>
            <p style={{ color: "red" }}>{error}</p>
            <input
            className={!confirmPassword && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="password"
              placeholder="Xác nhận mật khẩu..."
              value={confirmPassword}
              onChange={(e) => {setConfirmPassword(e.target.value)
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

        </div>

        <div className="modal-footer">
          <button
            className="btn btn-cancel"
            onClick={() => setOpen(false)}
          >
            Hủy
          </button>

          <button
            className="btn btn-add"
            onClick={handleSubmit}
          >
            Xác nhận
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};

export default ChangePasswordModal;
