import { useEffect, useState } from "react";
import "./quotationMobile.scss";
import {
  FaPrint,
  FaCalculator,
  FaPlus,
  FaBox,
  FaTools,
  FaTable,
} from "react-icons/fa";
import {
  FiFileText,     // Báo giá
  FiTrash2
} from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getQuotations } from "../../service/QuotationService";
import ProcessingsCalModel from "../../components/processing/ProcessingsCalModel";
import {calculateMobile} from "../../service/CalculateService";
import { formatMoney } from "../../utils/formatMoney";
import zalo from "../../assets/zalo.png";
import type { mobile, proCal } from "../../model/model";


const QuotationMobile = () => {
    const {  phone, companyId} = useParams();
    const [openPaperModal, setOpenPaperModal] = useState(false);
    const [list, setList] = useState<mobile>();
    const [processingList, setProcessingList] = useState<proCal[]>([]); 
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [paperId, setPaperId] = useState<string>("");
    const [printPriceId, setprintPriceId] = useState<string>("");
    const [result, setResult] = useState<any>(null);
    // const [printList, setPrintList] = useState<printPrice>();



    const handleSumitCalculate = async () =>{
            try{
                const data ={
                    widthProduct: width,
                    heightProduct: height,
                    quantity: quantity,
                    processingIds: processingList,
                    paperId: paperId,
                    companyId: companyId ?? "",
                    printPrice: printPriceId,
                    profit: null,
                    discount: null
                }
    
                const response = await calculateMobile(data);
                setResult(response);
    
            }catch(error){
                console.error("Lỗi báo giá vui lòng kiểm tra lại thông tin:", error);
            }
        }

       const handleAddProcessing = (newProcessing: proCal) => {
        setProcessingList([...processingList, newProcessing]);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getQuotations(companyId ?? "");
                setList(response.data);
                // setPrintList(list?.printPrices)
            } catch (error) {
                console.error("Failed to fetch quotations:", error);
            }
        };
        fetchData();
    }, [companyId]);

 const handleContactZalo = () => {
  window.open(  `https://zalo.me/${phone}`, "_blank", "noopener,noreferrer");
};
  return (
    <div className="quotation-mobile">
      {/* Header */}
      <header className="mobile-header">
        <button className="icon-btn-mobile">
          {/* <FaArrowLeft /> */}
        </button>

        <h1>BÁO GIÁ</h1>

        <button className="icon-btn-mobile">
          <FaPrint />
        </button>
      </header>

      {/* Product */}
      <section className="card">
        <div className="card-title">
          <FaBox />
          <span>THÔNG TIN SẢN PHẨM</span>
        </div>

        <label>Kích thước sản phẩm</label>

        <div className="size-row">
          <div>
            <label>Rộng (mm)</label>
            <input placeholder="Nhập chiều rộng" onChange={(e) => setWidth(Number(e.target.value))}/>
          </div>

          <div>
            <label>Cao (mm)</label >
            <input placeholder="Nhập chiều cao" onChange={(e) => setHeight(Number(e.target.value))}/>
          </div>
        </div>

        <label>Loại hình in</label>
        <select onChange={(e) => setprintPriceId(e.target.value)}>
          <option>Chọn loại</option>
          {list?.printPrices?.map((item ) =>(
            <option key={item.id} value={item.id ?? ""}>
                    {item.name}
                  </option>
          ))}
        </select>

        <label>Loại giấy in</label>
        <select onChange={(e) => setPaperId(e.target.value)}>
          <option>Chọn giấy</option>
          {list?.papers?.map((item) =>(
            <option key={item.id} value={item.id ?? ""}>
                    {item.name}
                  </option>
          ))}
        </select>


        <label>Số lượng</label>
        <input placeholder="Nhập số lượng" onChange={(e) => setQuantity(Number(e.target.value))}/>
      </section>

      {/* Processing */}
      <section className="card">
        <div className="card-title">
          <FaTools />
          <span>GIA CÔNG SAU IN</span>
        </div>

        <button className="processing-btn" onClick={() => setOpenPaperModal(true)}>
          <FaPlus />
          <span>Thêm gia công</span>
        </button>

        <p className="hint">
          Thêm các công đoạn gia công để tính giá chính xác hơn.
        </p>
         <table className="processing-table">
        
                  <tbody>
                    {processingList.length > 0 ? (
                        processingList.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>
                                   
                                   <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        setProcessingList(
                                                            processingList.filter(
                                                                (_, i) =>
                                                                    i !== index
                                                            )
                                                        )
                                                    }
                                                >
                                                    <FiTrash2 />
                                                </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>
                                <div className="empty-table">
                                    <FiFileText size={40} />
                                    <p>Chưa có gia công nào</p>
                                </div>
                            </td>
                        </tr>
                    )}
                          
                  </tbody>
                </table>
      </section>

      {/* Result */}
      <section className="card result-card">
        <div className="card-title">
          <FaTable />
          <span>KẾT QUẢ BÁO GIÁ</span>
        </div>

        <div className="result-row">
          <span>Giá 1 sản phẩm</span>
          <strong>{formatMoney(
                            result?.data?.price /
                            Number(quantity) || 0
                        )}</strong>
        </div>

        <div className="result-row">
          <span>Số sản phẩm/tờ</span>
          <strong>{result?.data?.productSheet ?? 0}</strong>
        </div>

        <div className="result-row">
          <span>Số tờ in</span>
          <strong>{result?.data?.quantityPaper ?? 0} tờ</strong>
        </div>

        <div className="result-row">
          <span>Tạm tính</span>
          <strong>{formatMoney(
                            (result?.data?.price || 0)
                            
                        )}</strong>
        </div>

        <div className="divider" />

        <div className="result-row">
          <span>VAT (10%)</span>
          <strong>{formatMoney(
                                      (result?.data?.price || 0) *
                                      (10 / 100)
                                  )}</strong>
        </div>

        <div className="total-box">
          <span>TỔNG TIỀN</span>
          <strong>{formatMoney(
                                      (result?.data?.price || 0) +
                                      (result?.data?.price || 0) *
                                      (10 / 100)
                                  )}</strong>
        </div>
      </section>

      {/* Bottom Actions */}
      <div className="bottom-actions">
        <button className="btn-outline" onClick={() => handleSumitCalculate()}>
          <FaCalculator />
          Tính báo giá
        </button>

        <button className="btn-primary" onClick={() => handleContactZalo()}>
          <img src={zalo} alt="Zalo" style={{width:"20px", height: "20px"}}/>
          Liên hệ ngay
        </button>
      </div>

    <ProcessingsCalModel
        open={openPaperModal}
        setOpen={setOpenPaperModal}
        onAdd={handleAddProcessing}
        companyId={companyId ?? ""}
        data={processingList}
    />

    </div>
  );
}

export default QuotationMobile;