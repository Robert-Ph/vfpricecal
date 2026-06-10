import { useState } from "react";
import "./userModal.scss";

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;


}
const UserModal = ({ open, setOpen }: Props) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role
    // , setRole
  ] = useState("User");

  if (!open) return null;

  const handleSubmit = () => {
    console.log({
      name,
      email,
      role
    });

    setOpen(false);
  };

  return (
    <div className="overlay">
      <div className="modal">

        <div className="modal-header">
          Thông tin người dùng
        </div>

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
            <select name="" id="">
            <option value="">User</option>
            <option value="">Admin</option>
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
