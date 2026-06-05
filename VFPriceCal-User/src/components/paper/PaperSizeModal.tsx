import {useEffect, useState} from "react";
import "./paperModel.scss";
import { toast } from "react-toastify";
import { createOne, updatePaperSize } from "../../service/PaperService";

type paperSize ={
    id: string | null;
    paperId: string | null;
    width: number;
    height: number;
    price: number;
}

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: paperSize | null;
  id: string;
};

const PaperSizeModal = ({ open, setOpen, id, data }: Props) => {

  const [width, setWidth] = useState(data?.width);
  const [height, setHeight] = useState(data?.height);
  const [price, setPrice] = useState(data?.price);
  const [error, setError] = useState(""); // Lưu thông báo lỗi chung hoặc riêng

  

  useEffect (()=>{
    if(data){
      setWidth(data?.width);
      setHeight(data?.height);
      setPrice(data?.price);
    }else{
      setWidth(0);
      setHeight(0);
      setPrice(0);
    }
  },[data])
  const handleSubmit = async () => {
        // Validate inputs
    if (!width || !height || !price) {
      setError("Vui lòng điền đầy đủ thông tin.");
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    const payload = {
            id: data?.id ?? "",
            paperId: id, 
            width: Number(width),
            height: Number(height),
            price: Number(price)
    };
    
      
    let response;

    if(data?.id){
      response = await updatePaperSize(payload);
    }else{
      response = await createOne(payload); 
    }
      
    
    if (response.code === 200 || response.code === 201) {
       toast.success(
           data?.id
               ? `Cập nhật thành công!`
               : `Tạo  thành công!`
       );
   
       setTimeout(() => {
           window.location.reload();
       }, 500);
   } else {
       toast.error(
           data?.id
               ? `Có lỗi xảy ra khi cập nhật .`
               : `Có lỗi xảy ra khi tạo .`
       );
   }



    setOpen(false);
    // Reset fields
    setWidth(""); setHeight(""); setPrice("");
    setError(""); // Reset error message
  };
  if (!open) return null;

  return (
    <div className="overlay">
      <div className="modal">

        <div className="modal-header">
          Thông tin giấy
        </div>

        <div className="main">

          <div className="info">
            <label>Chiều rộng(mm)</label>
            <input
            className={!width && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="number"
              placeholder="Nhập chiều rộng..."
              value={width}
              onChange={(e) => {setWidth(e.target.value)
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

          <div className="info">
            <label>Chiều cao(mm)</label>
            <input
              className={!height && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="number"
              placeholder="Nhập chiều cao..."
              value={height}
              onChange={(e) => {setHeight(e.target.value)
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

          <div className="info">
            <label>Giá (VNĐ)</label>
            <input
              className={!price && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="number"
              placeholder="Nhập giá..."
              value={price}
              onChange={(e) => {setPrice(e.target.value)
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

export default PaperSizeModal;