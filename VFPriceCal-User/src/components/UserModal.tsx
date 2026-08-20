import { useEffect, useState } from "react";
import "./userModal.scss";
import type { roles } from "../model/model";
import { getAllRoles} from "../service/RolesService";
import type { UserInfo } from "../context/AuthContext";
import { createAccountByCompany } from "../service/AccountService";

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;


}
const UserModal = ({ open, setOpen }: Props) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // Lưu thông báo lỗi chung hoặc riêng
  const [role, setRole] = useState("");
  const [listRoles, setListRoles] = useState<roles[]>([]);

      const [user] = useState<UserInfo | null>(() => {
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
    const fetchRoles = async () => {
      try {
        const response = await getAllRoles(); // Giả sử getAllRoles là hàm API đã được định nghĩa

        setListRoles(response.data); // Giả sử response.data chứa danh sách roles
      } catch (error) {
        console.error("Error fetching roles:", error);
      }

       setName(""); setEmail(""); setRole("");
    }
    fetchRoles();
  }, [setListRoles]);

  if (!open) return null;

  const handleSubmit = async () => {
   const newUser = {
        companyId: user?.companyId ?? "", // ID ẩn từ context,
        accountId: user?.userId ?? "",
        email: email,
        username: name,
        password: "", // Password sẽ được nhập từ input riêng
        roleId: role,
        statusId: "" // ID trạng thái mặc định, có thể được điều chỉnh
   }

   if (!name || !email || !role) {
    setError("Vui lòng điền đầy đủ thông tin.");
    return;
   }

   setError(""); // Xóa lỗi trước khi gửi
   try {
    // Gọi API để tạo người dùng mới ở đây, ví dụ: createUser(newUser)
    const response = await createAccountByCompany(newUser); // Giả sử createUser là hàm API đã được định nghĩa
    if (response.code === 200 || response.code === 201) {
        console.log("User created successfully:", response.data);
        setOpen(false);
        // Reset fields
        setName(""); setEmail(""); setRole("");
        window.location.reload(); // Hoặc navigate("/component/processing") nếu bạn dùng react-router
    } else {
        console.error("Error creating user:", response.message);
        setError("Có lỗi xảy ra khi tạo người dùng.");
    }
   } catch (error) {
    console.error("Error creating user:", error);
    setError("Có lỗi xảy ra khi tạo người dùng.");
   }
   console.log("New User Data:", newUser);
   // Gọi API để tạo người dùng mới ở đây

    setOpen(false);
  };

  return (
    <div className="overlay">
      <div className="modal">

        <div className="modal-header">
          Thông tin người dùng
        </div>
        <p style={{ color: "red" }}>{error}</p>

        <div className="main">

          <div className="info">
            <label>Tên người dùng</label>
            <input
              type="text"
              placeholder="Nhập tên..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="info">
            <label>Email</label>
            <input
              type="text"
              placeholder="Nhập email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

           <div className="info">
            <label>Quyền</label>
            <select name="" id="" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Chọn quyền</option>
              {listRoles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
           
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
    </div>
  );
};

export default UserModal;
