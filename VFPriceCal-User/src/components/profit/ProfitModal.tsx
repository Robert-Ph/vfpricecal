import { useState} from "react";
import "./profitModal.scss";
// import { toast } from "react-toastify";
// import { create, updateProfitById } from "../../service/ProfitService";
// import type { UserInfo } from "../../context/AuthContext";
import type { profitItem } from "../../model/model";


type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: profitItem;
  onSubmit: (item: profitItem) => void;
};

const ProfitModal = ({ open, setOpen, data, onSubmit }: Props) => {

  const [profitName, setProfitName] = useState( data?.name ?? "");
  const [percentage, setPercentage] = useState(data?.percent ?? 0);
  const [error, setError] = useState(""); // Lưu thông báo lỗi chung hoặc riêng

  const handleSubmit = () => {
        // Validate inputs
    if ( !profitName || !percentage) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const newData = {
      profitId: "", // Giá trị này sẽ được backend gán khi lưu vào database
      name: profitName,
      percent: percentage
    };
    
    onSubmit(newData);
    setOpen(false);
    // Reset fields
    setProfitName(""); setPercentage(0);
    setError(""); // Reset error message
  };


    if (!open) return null;

  return (
    <div className="overlay">
      <div className="modal">

        <div className="modal-header">
          Thông tin biên lợi nhuận
        </div>

        <div className="main">

          <div className="info">
            <label>Tên </label>
            <input
            className={!profitName && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="text"
              placeholder="Nhập tên..."
              value={profitName}
              onChange={(e) => {setProfitName(e.target.value)
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

          <div className="info">
            <label>Tỷ lệ lợi nhuận(%)</label>
            <input
            className={!percentage && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="text"
              placeholder="Nhập tỷ lệ..."
              value={percentage}
              onChange={(e) => {setPercentage(Number(e.target.value))
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
    </div>
  );
};

export default ProfitModal;
