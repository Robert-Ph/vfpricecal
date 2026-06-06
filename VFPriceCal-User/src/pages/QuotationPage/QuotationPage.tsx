import ProcessingsCalModel from "../../components/processing/ProcessingsCalModel";
import { getPaperById, getPapers } from "../../service/PaperService";
import {getAllByCompany} from "../../service/PrintPriceService";
import {calculatePrint} from "../../service/CalculateService";
import { getAllProfitByCompany } from "../../service/ProfitService";
import "./quotationPage.scss";
import { useEffect ,useState } from "react";
import { formatMoney } from "../../utils/formatMoney";
// import { numberToVietnameseText } from "../../utils/MoneyModel";
import { getAllDiscountByCompany } from "../../service/DiscountService";
import type { UserInfo } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FiFileText,     // Báo giá
  FiRefreshCw,    // Làm mới
  FiPrinter,      // In báo giá
  FiLayers,       // Thông tin chung
  FiPackage,      // Thông tin sản phẩm
  FiSettings,     // Gia công sau in
  FiGrid,         // Kết quả báo giá
  FiTrash2
} from "react-icons/fi";





const QuotationPage = () => {

    const navigate = useNavigate();
    const [openPaperModal, setOpenPaperModal] = useState(false);
    const [processingList, setProcessingList] = useState<any[]>([]); 
    const [printPriceList, setPrintPriceList] = useState<any[]>([]);
    const [width, setWidth] = useState<number | null>(null);
    const [height, setHeight] = useState<number | null>(null);
    const [printPrice, setPrintPrice] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number | null>(null);
    const [vat, setVat] = useState<number | null>(null);
    const [paperList, setPaperList] = useState<any[]>([]); // State để quản lý danh sách giấy/vật liệu trong báo giá
    const [paperSizeList, setPaperSizeList] = useState<any[]>([]); // State để quản lý danh sách kích thước giấy/vật liệu trong báo giá
    const [profitList, setProfitList] = useState<any[]>([]);
    const [discountList, setDiscountList] = useState<any[]>([]);
    const [profit, setProfit] = useState<string | null>(null);
    const [selectedPaperId, setSelectedPaperId] = useState<string>("");
    const [result, setResult] = useState<any>(null);
    const [discountId, setDiscountId] = useState<string | null>(null);
    const [name, setName] = useState<string>("");

    


    
    const [user] = useState<UserInfo | null>(() => {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                try {
                    return JSON.parse(savedUser);
                } catch (e) {
                    return null;
                }
            }
            return null;
    });

       const handleAddProcessing = (newProcessing: any) => {
        setProcessingList([...processingList, newProcessing]);
    };
    
    useEffect(() => {
        const fetchPaperList = async () => {
            try {
                const data = await getPapers(user?.companyId ?? ""); // Sử dụng companyId từ context
                setPaperList(data.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách giấy/vật liệu:", error);
            }
        };
        const fetchPaperSizeList = async () => {
            try {
                if(selectedPaperId !== null){
                    const data = await getPaperById(selectedPaperId);
                    setPaperSizeList(data.data.paperSizes);
                }
                
            } catch (error) {
                console.error("Lỗi khi lấy danh sách kích thước giấy/vật liệu:", error);
            }
        };
        // fetchProcessingList();
        fetchPaperList();
        fetchPaperSizeList();
    }, [selectedPaperId]);

    useEffect(() => {
            const fetchPrintPrice = async () => {
                        // Chỉ gọi API khi đã có thông tin user và companyId
                        if (user?.companyId) {
                            try {
                                const papers = await getAllByCompany(user.companyId);
                                setPrintPriceList(papers.data); // Cập nhật danh sách vào state để hiển thị
                            } catch (error) {
                                console.error("Lỗi khi lấy giấy/vật liệu:", error);
                            }
                        }
            };


            const fetchProfitList = async () => {
                            try {
                                const response = await getAllProfitByCompany(user?.companyId ?? "");
                                setProfitList(response.data); // Cập nhật danh sách vào state để hiển thị
                            } catch (error) {
                                console.error("Lỗi khi lấy biên lợi nhuận:", error);
                            }
            }

            const fetchDiscountList = async () => {
                try {
                    const response = await getAllDiscountByCompany(user?.companyId ?? "");
                    setDiscountList(response.data);
                } catch (error) {
                    console.error("Lỗi khi lấy chiết khấu:", error);
                }
            }
            
            fetchPrintPrice();
            fetchProfitList();
            fetchDiscountList();
    }, [user?.companyId]);
    

    const handleSumitCalculate = async () =>{
        try{
            const data ={
                widthProduct: width,
                heightProduct: height,
                quantity: quantity,
                processingIds: processingList,
                paperId: selectedPaperId,
                companyId: user?.companyId ?? "",
                printPrice: printPrice,
                profit: profit,
                discount: discountId
            }

            const response = await calculatePrint(data);
            setResult(response);

        }catch(error){
            console.error("Lỗi báo giá vui lòng kiểm tra lại thông tin:", error);
        }
    }

  const handShare = () => {
  navigate(`/bao-gia/${user?.companyName}/${user?.phone}/${user?.companyId}`);
};

    return (
        <div className="quotation-page">

  {/* HEADER */}
  <div className="quotation-header">
    <div className="header-left">
      <div className="header-icon">
        <FiFileText />
      </div>

      <div>
        <h1>BÁO GIÁ</h1>
        <p>Tính toán và tạo báo giá nhanh chóng</p>
      </div>
    </div>

    <div className="header-actions">
      <button className="btn-outline">
        <FiRefreshCw />
        Làm mới
      </button>

      <button className="btn-primary" onClick={() => handShare()}>
        <FiPrinter />
        Chia sẻ
      </button>
       <button className="btn-primary" onClick={handleSumitCalculate}>
          <FiGrid />
          Tính báo giá
        </button>
    </div>
  </div>

  <div className="quotation-content">

    {/* LEFT */}
    <div className="quotation-main">

      {/* THÔNG TIN CHUNG */}
      <div className="card-quotation">

        <div className="section-title-quote">
          <FiLayers />
          <span>THÔNG TIN CHUNG</span>
        </div>

        <div className="general-form">

          <div className="field-quotation">
            <label>Tên báo giá</label>
            <input placeholder="Nhập tên báo giá" onChange={(e) => setName(e.target.value)}/>
          </div>

          <div className="field-quotation">
            <label>Loại khách hàng<span className="required">*</span></label>
            <select onChange={(e) => setDiscountId(e.target.value)}>
              <option>Chọn loại khách hàng</option>
                {discountList.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
          </div>

          <div className="field-quotation">
            <label>Biên lợi nhuận<span className="required">*</span></label>
            <select onChange={(e) => setProfit(e.target.value)}>
              <option>Chọn</option>
                {profitList.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
          </div>

          <div className="field-quotation vat-field">
            <label>VAT (%)</label>

            <div className="input-addon">
              <input placeholder="Nhập VAT (%)"  onChange={(e) => setVat(Number(e.target.value))}/>
              <span>%</span>
            </div>
          </div>

        </div>
      </div>

      {/* THÔNG TIN SẢN PHẨM */}
      <div className="card-quotation">

        <div className="section-title-quote">
          <FiPackage />
          <span>THÔNG TIN SẢN PHẨM</span>
        </div>

        <div className="product-grid">

          <div className="product-left">

            <label>Kích thước sản phẩm<span className="required">*</span></label>

            <div className="size-group">
              <input type="number" placeholder="Nhập chiều rộng"  onChange={(e) => setWidth(Number(e.target.value))} />

              <span className="x">x</span>

              <input type="number" placeholder="Nhập chiều cao" onChange={(e) => setHeight(Number(e.target.value))} />

              <span className="unit">mm</span>
            </div>

                <label>Loại hình in<span className="required">*</span></label>
              <select onChange={(e) => setPrintPrice(e.target.value)}>
                <option>Chọn loại</option>
                {printPriceList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>


            

          </div>

          <div className="divider"></div>

          <div className="product-right">

                 <div className="field-quotation">
              <label>Loại giấy in <span className="required">*</span></label>
              <select 
                onChange={(e) => setSelectedPaperId(e.target.value)}
                >
                <option>Chọn giấy</option>
                {paperList.map((paper) => (
                    <option key={paper.id} value={paper.id}>
                        {paper.name}
                    </option>
                ))}
              </select>
            </div>

            <div className="field-quotation">
              <label>Số lượng<span className="required">*</span></label>
              <input type="number" placeholder="Nhập số lượng" onChange={(e) => setQuantity(Number(e.target.value))} />
            </div>

          </div>
        </div>
      </div>

      {/* GIA CÔNG */}
      <div className="card-quotation">

        <div className="section-title-quote">
          <FiSettings />
          <span>GIA CÔNG SAU IN</span>
        </div>

        <button className="add-processing" onClick={() => setOpenPaperModal(true)}>
          + Thêm gia công
        </button>

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

      </div>
    </div>

    {/* RIGHT */}
    <div className="quotation-sidebar">

      <div className="result-card">

        <div className="section-title-quote">
          <FiGrid />
          <span>KẾT QUẢ BÁO GIÁ:</span>
          
        </div>
      <p className="result-subtitle">{name || ""}</p>

         <div className="result-row">
          <span>Khổ in</span>
          <strong>{result?.data?.paperSize || 0} mm</strong>
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
          <strong> {result?.data?.quantityPaper ?? 0} tờ</strong>
        </div>

        <div className="result-row">
          <span>Giá giấy in</span>
          <strong> {formatMoney(result?.data?.paperCost|| 0)}/tờ</strong>
        </div>

        <div className="result-row">
          <span>Giá gia công</span>
          <strong> {formatMoney(result?.data?.processingCost || 0)}</strong>
        </div>
        <hr />

        <div className="result-row">
          <span>Tạm tính</span>
          <strong> {formatMoney(
                            (result?.data?.price || 0)
                            
                        )}</strong>
        </div>

        <div className="result-row">
          <span>Giảm giá</span>
          <strong> {formatMoney(
                            (result?.data?.discount || 0)
                            
                        )}</strong>
        </div>

        <div className="result-row">
          <span>VAT (%)</span>
          <strong>{formatMoney(
                            result?.data?.price *
                            ((vat || 0) / 100) || 0
                        )}</strong>
        </div>

        <div className="total-box">
          <div>
            <h3>TỔNG TIỀN</h3>
            <p>(Đã bao gồm VAT)</p>
          </div>

          <span>{formatMoney(
                            ((result?.data?.price || 0) - 
                            (result?.data?.discount || 0)) +
                            (result?.data?.price || 0) *
                            ((vat || 0) / 100)
                        )}</span>
        </div>
      </div>

      <div className="notice-box">
        <h4>Thông tin</h4>

        <p>
          Vui lòng nhập đầy đủ thông tin sản phẩm và gia công
          để tính báo giá chính xác nhất.
        </p>
      </div>

    </div>
  </div>
  <ProcessingsCalModel
        open={openPaperModal}
        setOpen={setOpenPaperModal}
        onAdd={handleAddProcessing}
        companyId={user?.companyId ?? ""}
        data={processingList}
    />
</div>

);
}

export default QuotationPage;

