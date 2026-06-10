import { useState} from "react";
import "./processingAdd.scss";
import { toast } from "react-toastify";
import { createProcessingByCategory, updateProcessingById } from "../../service/ProcessingService";

type processing = {
    id: string | null;
    categoryId: string | null;
    name: string;
    price: number;
}
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: processing | null;
  id: string;
};

const ProcessingAddModel = ({ open, setOpen, data, id }: Props) => {

  const [processingName
    // , setProcessingName
  ] = useState(data?.name ?? "");
  const [priceProcessing, setPriceProcessing] = useState(data?.price ?? 0);
  const [error, setError] = useState(""); // Lưu thông báo lỗi chung hoặc riêng
 


  const handleSubmit = async () => {
    if (!processingName) {
      setError("Vui lòng điền đầy đủ thông tin.");
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setError(""); 
    const payload = {
        id: data?.id ?? "", // ID sẽ được backend tạo tự động
        categoryId: id, // ID ẩn từ context
        name: processingName,
        price: priceProcessing
    };

    let response;

    if(data?.id){
      response = await updateProcessingById(payload);
    }else{
      response = await createProcessingByCategory(payload);
    }

    if (response.code === 200 || response.code === 201) {
        toast.success(`Tạo danh mục ${processingName} thành công!`);
        setTimeout(() => {
            window.location.reload(); // Hoặc navigate("/component/processing") nếu bạn dùng react-router
        }, 500); // Đợi 0.5 giây trước khi reload hoặc navigate
    } else {
        toast.error(`Có lỗi xảy ra khi tạo danh mục ${processingName}.`);
    }
  };

    if (!open) return null;

  return (
    <div className="overlay">
      <div className="modal">

        <div className="modal-header">
          Thông tin loại gia công
        </div>

        <div className="main">

          <div className="info">
            <label>Tên loại gia công</label>
            <input
            className={!processingName && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="text"
              placeholder="Nhập tên danh mục..."
              value={processingName}
              onChange={(e) => {setPriceProcessing(Number(e.target.value))
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

          <div className="info">
            <label>Giá</label>
            <input
            className={!priceProcessing && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="text"
              placeholder="Nhập giá..."
              value={priceProcessing}
              onChange={(e) => {setPriceProcessing(Number(e.target.value))
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

export default ProcessingAddModel;
