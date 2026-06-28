import { useState} from "react";
import "./profitModal.scss";
import type { profitItemReponse } from "../../model/model";
import { toast } from "react-toastify";
import { updateProfitItemById } from "../../service/ProfitService";


type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: profitItemReponse | null;
  id: string;
};
const ProfitUpdate = ({ open, setOpen, data, id }: Props) => {
  const [name, setName] = useState(data?.name ?? "");
  const [percent, setPercent] = useState(data?.percent ?? 0);
  const [error, setError] = useState(""); // Lưu thông báo lỗi chung hoặc riêng


   const handleSubmit = async () => {
          // Validate inputs
      if (!name && !percent) {
        setError("Vui lòng điền đầy đủ thông tin.");
        toast.error("Vui lòng điền đầy đủ thông tin.");
        return;
      }
      // setOpen(false);
      // // Reset fields
      // setCategoryName("");
      setError(""); // Reset error message
      const payload = {
          id: data?.id ?? "", // Tạo chuỗi ID duy nhất như: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
          profitId: id, // Giá trị này sẽ được backend gán khi lưu vào database
          name: name,
          percent: percent,
      };
  
      let response;
      if(data?.id){
        response = await updateProfitItemById(payload); 
      }
      if (response.code === 200 || response.code === 201) {
          toast.success(`Tạo danh mục thành công!`);
          setTimeout(() => {
              window.location.reload(); 
          }, 500); 
      } else {
          toast.error(`Có lỗi xảy ra khi tạo danh mục.`);
      }
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
            className={!name && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="text"
              placeholder="Nhập tên..."
              value={name}
              onChange={(e) => {setName(e.target.value)
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

          <div className="info">
            <label>Tỷ lệ lợi nhuận(%)</label>
            <input
            className={!percent && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="text"
              placeholder="Nhập tỷ lệ..."
              value={percent}
              onChange={(e) => {setPercent(Number(e.target.value))
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

export default ProfitUpdate;
