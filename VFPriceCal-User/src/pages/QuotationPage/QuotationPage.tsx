import ProcessingsCalModel from "../../components/processing/ProcessingsCalModel";
import { getPaperById, getPapers } from "../../service/PaperService";
import {getAllByCompany} from "../../service/PrintPriceService";
import {calculatePrint} from "../../service/CalculateService";
import { getAllProfitByCompany } from "../../service/ProfitService";
import "./quotationPage.scss";
import { useEffect ,useState } from "react";
import { formatMoney } from "../../utils/formatMoney";
import { formatNumber } from "../../utils/formNumber";
// import { numberToVietnameseText } from "../../utils/MoneyModel";
import { getAllDiscountByCompany } from "../../service/DiscountService";
import type { UserInfo } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FiFileText,     // Báo giá
  FiRefreshCw,    // Làm mới
  // FiPrinter,      // In báo giá
  FiLayers,       // Thông tin chung
  FiPackage,      // Thông tin sản phẩm
  FiSettings,     // Gia công sau in
  FiGrid,         // Kết quả báo giá
  FiTrash2,
  // FiExternalLink,
  
} from "react-icons/fi";
import { FaCalculator } from "react-icons/fa";
// import { exportQuotationPDF } from "../../utils/exportPdf";
import type {  printPrice, paper, profitRequest, discountRequest, proCal, paperSize, result } from "../../model/model";
import { toast } from "react-toastify";





const QuotationPage = () => {

    const navigate = useNavigate();
    const [sizeMode, setSizeMode] = useState("manual");
    const [openPaperModal, setOpenPaperModal] = useState(false);
    const [processingList, setProcessingList] = useState<proCal[]>([]); 
    const [printPriceList, setPrintPriceList] = useState<printPrice[]>([]);
    const [width, setWidth] = useState<number | null>(null);
    const [height, setHeight] = useState<number | null>(null);
    const [printPrice, setPrintPrice] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number | null>(null);
    const [productInPage, setProductInPage] = useState<number | null>(null);
    const [vat, setVat] = useState<number | null>(null);
    const [paperList, setPaperList] = useState<paper[]>([]); // State để quản lý danh sách giấy/vật liệu trong báo giá
    const [profitList, setProfitList] = useState<profitRequest[]>([]);
    const [discountList, setDiscountList] = useState<discountRequest[]>([]);
    const [profit, setProfit] = useState<string | null>(null);
    const [selectedPaperId, setSelectedPaperId] = useState<string>("");
    const [result, setResult] = useState<result>();
    const [discountId, setDiscountId] = useState<string | null>(null);
    const [name, setName] = useState<string>("");
    const [paperSize, setPaperSize] = useState<paperSize[]>([]);
    const [paperSizeId, setPaperSizeId] = useState<string>("");


    
    const [user] = useState<UserInfo | null>(() => {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                try {
                    return JSON.parse(savedUser);
                } catch (e) {
                    return e;
                }
            }
            return null;
    });

    const handleAddProcessing = (newProcessing: proCal) => {
        setProcessingList([...processingList, newProcessing]);
    };
    
    useEffect(() => {
    const fetchData = async () => {
        if (!user?.companyId) return;

        try {
            const [
                paperListRes,
                printPriceRes,
                profitRes,
                discountRes,
                paperSizeRes,
            ] = await Promise.all([
                getPapers(user.companyId),
                getAllByCompany(user.companyId),
                getAllProfitByCompany(user.companyId),
                getAllDiscountByCompany(user.companyId),
                selectedPaperId
                    ? getPaperById(selectedPaperId)
                    : Promise.resolve(null),
            ]);

            setPaperList(paperListRes.data);
            setPrintPriceList(printPriceRes.data);
            setProfitList(profitRes.data);
            setDiscountList(discountRes.data);

            if (paperSizeRes) {
                setPaperSize(paperSizeRes.data.paperSizes);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };

    fetchData();
}, [user?.companyId, selectedPaperId]);

  const validateProductSize = () => {
    if (!width || !height || paperSize.length === 0) {
        return true;
    }

    const hasSuitablePaper = paperSize.some((paper) => {
        // Không xoay
        const fitNormal =
            width <= paper.width &&
            height <= paper.height;

        // Xoay 90 độ
        const fitRotate =
            height <= paper.width &&
            width <= paper.height;

        return fitNormal || fitRotate;
    });

    if (!hasSuitablePaper) {
        toast.error("Kích thước sản phẩm sau khi tràn viền vượt quá tất cả khổ giấy");
        return false;
    }

    return true;
};
    

    const handleSumitCalculate = async () =>{

      if (!validateProductSize()) {
        return;
      }

      if(!selectedPaperId){
        toast.error("Vui lòng nhập đầy đủ thông tin!")
        return;
      }

      if (sizeMode === "manual" && (!width || !height)) {
        toast.error("Vui lòng nhập đầy đủ chiều rộng và chiều cao!");
        return;
      }

      if (sizeMode === "perSheet" && !productInPage || !paperSizeId) {
        toast.error("Vui lòng nhập số lượng sản phẩm/tờ hoặc khổ giấy!");
        return;
      }
      
      else if(!quantity){
        toast.error("Vui lòng nhập số lượng!")
        return;
      }

      else if(!printPrice){
        toast.error("Vui lòng chọn hình thức in!")
        return;
      }

      else if(!profit){
        toast.error("Vui lòng chọn biên lợi nhuận!")
        return;
      }

      else if(!discountId){
        toast.error("Vui lòng chọn loại khách hàng!")
        return;
      }

        try{
            const data ={
                accoutId: user?.userId ?? "",
                widthProduct: width,
                heightProduct: height,
                productInPage: productInPage,
                quantity: quantity,
                processingIds:  processingList,
                paperId: selectedPaperId,
                paperSizeId: paperSizeId,
                companyId: user?.companyId ?? "",
                printPrice: printPrice,
                profit: profit,
                discount: discountId
            }

            const response = await calculatePrint(data);
            
            if(response.code === 200 || response.code === 201){
              setResult(response.data);
            }else{
              console.error("Lỗi báo giá vui lòng kiểm tra lại thông tin!");
            }

        }catch(error){
            console.error("Lỗi báo giá vui lòng kiểm tra lại thông tin:", error);
        }
    }

  // const handShare = async () => {
  //   const link = `${window.location.origin}/bao-gia/${user?.companyName}/${user?.phone}/${user?.companyId}`;
    
  //  try {
  //       await navigator.clipboard.writeText(link);
  //       toast.success("Đã sao chép liên kết");
  //   } catch {
  //       toast.error("Không thể sao chép");
  //   }
  //   navigate(`/bao-gia/${user?.companyName}/${user?.phone}/${user?.companyId}`);
  // };

  const handExport = async () => {
    if(!name){
       toast.error("Vui lòng điền tên sản phẩm");
      return;
    }
    if(!result){
      toast.error("Chưa có thông tin xuất báo giá");
      return;
    }
    const selectedPaper = paperList.find(
      item => item.id === selectedPaperId
    );
     navigate("/export-pdf",{
      state: {
        result,
        quantity,
        vat,
        processingList,
        paper: selectedPaper?.name ?? "",
        name
      }
     });
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
      <button className="btn-outline" onClick={() => window.location.reload()}>
        <FiRefreshCw />
        Làm mới
      </button>

      {/* <button className="btn-primary btn-share" onClick={() => handShare()}>
        <FiExternalLink />
        Chia sẻ
      </button> */}
      <button className="btn-primary" onClick={handExport}>
          <FiFileText />
          Xuất file
      </button>
       <button className="btn-primary" onClick={handleSumitCalculate}>
          <FaCalculator />
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
                    <option key={item.id} value={item.id ?? ""}>
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

            {/* <label>
      Kích thước sản phẩm <span className="required">*</span>
    </label> */}

    {/* Chọn cách nhập */}
    <div className="size-mode">
      <label className="radio-option">
        <input
          type="radio"
          name="sizeMode"
          value="manual"
          checked={sizeMode === "manual"}
          onChange={() => setSizeMode("manual")}
          title="Nhập kích thước"
        />
        <span>Nhập kích thước</span>
      </label>

      <label className="radio-option">
        <input
          type="radio"
          name="sizeMode"
          value="perSheet"
          checked={sizeMode === "perSheet"}
          onChange={() => setSizeMode("perSheet")}
          title="Số lượng/tờ"
        />
        <span>Số lượng/tờ</span>
      </label>
    </div>

    {/* Nhập kích thước */}
    {sizeMode === "manual" && (
      <div className="size-group">
        <input
          type="number"
          min="1"
          placeholder="Chiều rộng"
          value={width || ""}
          onChange={(e) => setWidth(Number(e.target.value))}
        />

        <span className="x">×</span>

        <input
          type="number"
          min="1"
          placeholder="Chiều cao"
          value={height || ""}
          onChange={(e) => setHeight(Number(e.target.value))}
        />

        <span className="unit">mm</span>
      </div>
    )}

    {/* Tự nhập số lượng trên tờ */}
    {sizeMode === "perSheet" && (
      <div className="per-sheet-input">
        <input
          type="number"
          min="1"
          placeholder="Nhập số sản phẩm/1 tờ"
          value={productInPage || ""}
          onChange={(e) => setProductInPage(Number(e.target.value))}
        />

        <span className="unit">sản phẩm / tờ</span>
      </div>
    )}

                <label>Loại hình in<span className="required">*</span></label>
              <select onChange={(e) => setPrintPrice(e.target.value)}>
                <option>Chọn loại</option>
                {printPriceList.map((item) => (
                  <option key={item.id} value={item.id ?? ""}>
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
                    <option key={paper.id} value={paper.id ?? ""}>
                        {paper.name}
                    </option>
                ))}
              </select>
            </div>

            {sizeMode === "perSheet" ? (
              <div className="field-quotation">
              <label>Khổ giấy in <span className="required">*</span></label>
              <select 
                onChange={(e) => setPaperSizeId(e.target.value)}
                >
                <option>Chọn giấy</option>
                {paperSize.map((paper) => (
                    <option key={paper.id} value={paper.id ?? ""}>
                        {paper.width} x {paper.height}
                    </option>
                ))}
              </select>
            </div>
            ):null}
            

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
          <strong>{result?.paperSize || "0 x 0"} mm</strong>
        </div>

        <div className="result-row">
          <span>Giá 1 sản phẩm</span>
          <strong>{formatMoney(
                             (result?.price || 0) /
                            Number(quantity) || 0
                        )}</strong>
        </div>

        <div className="result-row">
          <span>Số sản phẩm/tờ</span>
          <strong>{formatNumber(result?.productSheet ?? 0)}</strong>
        </div>

        <div className="result-row">
          <span>Số tờ in</span>
          <strong> {formatNumber(result?.quantityPaper ?? 0)} tờ</strong>
        </div>

        <div className="result-row">
          <span>Giá in 1 tờ</span>
          <strong> {formatMoney(result?.paperCost|| 0)}/tờ</strong>
        </div>

        <div className="result-row">
          <span>Giá gia công</span>
          <strong> {formatMoney(result?.processingCost || 0)}</strong>
        </div>
        <hr />

        <div className="result-row">
          <span>Giá vốn</span>
          <strong> {formatMoney(
                            (result?.cost || 0)
                            
                        )}</strong>
        </div>

        <div className="result-row">
          <span>Tạm tính</span>
          <strong> {formatMoney(
                            (result?.price || 0)
                            
                        )}</strong>
        </div>

        <div className="result-row">
          <span>Giảm giá</span>
          <strong> {formatMoney(
                            (result?.discount || 0)
                            
                        )}</strong>
        </div>

        <div className="result-row">
          <span>VAT (%)</span>
          <strong>{formatMoney(
                            (result?.price || 0) *
                            ((vat || 0) / 100) || 0
                        )}</strong>
        </div>

        <div className="result-row">
          <span>Lợi nhuận</span>
          <strong>{formatMoney(
                            (((result?.price || 0) - 
                            (result?.discount || 0)) +
                            (result?.price || 0) *
                            ((vat || 0) / 100)) - (result?.cost || 0)
                        )}</strong> 
        </div>

        <div className="total-box">
          <div>
            <h3>TỔNG TIỀN</h3>
            <p>(Đã bao gồm VAT)</p>
          </div>

          <span>{formatMoney(
                            ((result?.price || 0) - 
                            (result?.discount || 0)) +
                            (result?.price || 0) *
                            ((vat || 0) / 100)
                        )}</span>
        </div>
      </div>

      {/* <div className="notice-box">
        <h4>Thông tin</h4>

        <p>
          Vui lòng nhập đầy đủ thông tin sản phẩm và gia công
          để tính báo giá chính xác nhất.
        </p>
      </div> */}

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

