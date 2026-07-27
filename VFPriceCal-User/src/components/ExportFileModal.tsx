import { useState } from "react";
import "./ExportFileModel.scss";


interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;


}
const UserModal = ({ open, setOpen }: Props) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [error, setError] = useState(""); // Lưu thông báo lỗi chung hoặc riêng



  if (!open) return null;

 


  return (
    <div className="overlay">
      <div className="modal">

        <div className="modal-header">
          Thông tin người dùng
        </div>
        {/* <p style={{ color: "red" }}>{error}</p> */}

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
            <label>Email</label>
            <input
              type="text"
              placeholder="Nhập email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          >
            Xác nhận
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserModal;
