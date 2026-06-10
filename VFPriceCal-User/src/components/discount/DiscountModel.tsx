import { useState} from "react";
import "./discountModel.scss";
import { toast } from "react-toastify";
import {  createDiscountRange, updateDiscountRange } from "../../service/DiscountService";
// import type { UserInfo } from "../../context/AuthContext";


type discountRange = {
  id: string | null;
  discountId: string;
  maxAmount: number;
  discount: number;
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: discountRange | null;
  id: string;
};


const DiscountModel = ({ open, setOpen, data, id }: Props) => {

  const [maxMount, setmaxMount] = useState(data?.maxAmount ?? 0);
  const [discount, setDiscount] = useState(data?.discount ?? 0);
  const [error, setError] = useState(""); // Lưu thông báo lỗi chung hoặc riêng

  const handleSubmit = async () => {
        // Validate inputs
    if (!maxMount) {
      setError("Vui lòng điền đầy đủ thông tin.");
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setError(""); // Reset error message
    const payload = {
        id: data?.id ?? "", // ID sẽ được backend tạo tự động
        discountId: id, // ID ẩn từ context
        maxAmount: maxMount,
        discount: discount

    };

    let response;
   
   if (data?.id) {
       response = await updateDiscountRange(payload);
   } else {
       response = await createDiscountRange(payload);
   }
   
   if (response.code === 200 || response.code === 201) {
       toast.success(
           data?.id
               ? `Cập nhật ${maxMount} thành công!`
               : `Tạo ${maxMount} thành công!`
       );
   
       setTimeout(() => {
           window.location.reload();
       }, 500);
   } else {
       toast.error(
           data?.id
               ? `Có lỗi xảy ra khi cập nhật ${maxMount}.`
               : `Có lỗi xảy ra khi tạo ${maxMount}.`
       );
   }
  };

    if (!open) return null;

  return (
    <div className="overlay">
      <div className="modal">

        <div className="modal-header">
          Thông tin chiết khấu
        </div>

        <div className="main">

          <div className="info">
            <label>Đến giá trị đơn(vnđ) </label>
            <input
            className={!maxMount && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="text"
              placeholder="Nhập tên..."
              value={maxMount}
              onChange={(e) => {setmaxMount(Number(e.target.value))
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

          <div className="info">
            <label>Chiết khấu (%)</label>
            <input
            className={!discount && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="text"
              placeholder="Nhập chiết khấu..."
              value={discount}
              onChange={(e) => {setDiscount(Number(e.target.value))
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

export default DiscountModel;
