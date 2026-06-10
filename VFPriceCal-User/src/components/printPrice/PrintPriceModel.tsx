import { useState} from "react";
import "./printPriceModel.scss";
import { toast } from "react-toastify";
import { createOneRange, updateRange } from "../../service/PrintPriceService";
import type { printPriceRanges } from "../../model/model";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: printPriceRanges | null;
  id: string;
};

const PrintPriceModel = ({ open, setOpen, data, id} : Props) => {

  const [minLengthCm, setMinLengthCm] = useState(data?.minLengthCm ?? 0);
  const [maxLengthCm, setMaxLengthCm] = useState(data?.maxLengthCm ?? 0);
  const [pricePerMeter, setPricePerMeter] = useState(data?.pricePerMeter ?? 0);
  const [error, setError] = useState(""); // Lưu thông báo lỗi chung hoặc riêng


  const handleSubmit = async () => {
        // Validate inputs
    if (!maxLengthCm && !minLengthCm && !pricePerMeter) {
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
        printPriceId: id, // Giá trị này sẽ được backend gán khi lưu vào database
        minLengthCm: minLengthCm,
        maxLengthCm: maxLengthCm,
        pricePerMeter: pricePerMeter

    };

    let response;
    if(data?.id){
      response = await updateRange(payload); 
    }else{
      response = await createOneRange(payload); 
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
          Thông tin
        </div>

        <div className="main">

          <div className="info">
            <label>Từ(mm)<span className="required">*</span></label>
            <input
            className={!minLengthCm && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="number"
              placeholder="Từ kích thước..."
              value={minLengthCm || ""}
              onChange={(e) => {setMinLengthCm(Number(e.target.value))
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

          <div className="info">
            <label>Đến(mm)<span className="required">*</span></label>
            <input
              className={!maxLengthCm && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="number"
              placeholder="Đến kích thước..."
              value={maxLengthCm || ""}
              onChange={(e) => {setMaxLengthCm(Number(e.target.value))
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

          <div className="info">
            <label>Giá (VNĐ)<span className="required">*</span></label>
            <input
              className={!pricePerMeter && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="number"
              placeholder="Nhập giá..."
              value={pricePerMeter || ""}
              onChange={(e) => {setPricePerMeter(Number(e.target.value))
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

export default PrintPriceModel;
