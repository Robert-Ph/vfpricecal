import { useState} from "react";
import "./processingAdd.scss";
import type { processingTier } from "../../model/model";
// import { toast } from "react-toastify";
// import { createProcessingByCategory, updateProcessingById } from "../../service/ProcessingService";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: processingTier | null;
  onAdd: (data: processingTier) => void;
};

const ProcessingAddModel = ({ open, setOpen, data, onAdd }: Props) => {

  const [priceProcessing, setPriceProcessing] = useState(data?.price ?? 0);
  const [min, setMin] = useState(data?.minVolume ?? 0);
  const [max, setMax] = useState(data?.maxVolume ?? 0);
  const [charge, setCharge] = useState(data?.minCharge ?? 0);
  const [error, setError] = useState(""); // Lưu thông báo lỗi chung hoặc riêng
 



  const handleSubmit = async () => {

    setError(""); 
    const payload = {
        // id: data?.id ?? "", // ID sẽ được backend tạo tự động
        // categoryId: id, // ID ẩn từ context
        // name: processingName,
        // price: priceProcessing
      id: null,
      processingId: null,
      minVolume: min,
      maxVolume: max,
      price: priceProcessing,
      minCharge: charge,
      isActive: true 
    };
    onAdd(payload);
    setOpen(false);
    setMin(0);
    setMax(0);
    setCharge(0);
    setPriceProcessing(0);

    // let response;

    // if(data?.id){
    //   response = await updateProcessingById(payload);
    // }else{
    //   response = await createProcessingByCategory(payload);
    // }

    // if (response.code === 200 || response.code === 201) {
    //     toast.success(`Tạo danh mục ${processingName} thành công!`);
    //     setTimeout(() => {
    //         window.location.reload(); // Hoặc navigate("/component/processing") nếu bạn dùng react-router
    //     }, 500); // Đợi 0.5 giây trước khi reload hoặc navigate
    // } else {
    //     toast.error(`Có lỗi xảy ra khi tạo danh mục ${processingName}.`);
    // }
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
            <label>Từ tối thiểu</label>
            <input
            className={!min && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="number"
              placeholder="Nhập ..."
              value={min}
              onChange={(e) => {setMin(Number(e.target.value))
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>
                    <div className="info">
            <label>Đến tối đa</label>
            <input
            className={!max && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="number"
              placeholder="Nhập ..."
              value={max}
              onChange={(e) => {setMax(Number(e.target.value))
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

          <div className="info">
            <label>Giá</label>
            <input
            className={!priceProcessing && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="text"
              placeholder="Nhập giá sàn..."
              value={priceProcessing}
              onChange={(e) => {setPriceProcessing(Number(e.target.value))
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

          <div className="info">
            <label>Giá sàn</label>
            <input
            className={!charge && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="text"
              placeholder="Nhập giá sàn..."
              value={charge}
              onChange={(e) => {setCharge(Number(e.target.value))
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
