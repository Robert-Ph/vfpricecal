import ProcessingsCalModel from "../../components/processing/ProcessingsCalModel";
import { getPaperById, getPapers } from "../../service/PaperService";
import {getAllByCompany} from "../../service/PrintPriceService";
import {calculatePrint} from "../../service/CalculateService";
import { getAllProfitByCompany } from "../../service/ProfitService";
import "./quotationPage.scss";
import { useEffect ,useState } from "react";
import { formatMoney } from "../../utils/formatMoney";
import { numberToVietnameseText } from "../../utils/MoneyModel";
import { getAllDiscountByCompany } from "../../service/DiscountService";
import type { UserInfo } from "../../context/AuthContext";
import {
  FiFileText,     // Báo giá
  FiRefreshCw,    // Làm mới
  FiPrinter,      // In báo giá
  FiLayers,       // Thông tin chung
  FiPackage,      // Thông tin sản phẩm
  FiSettings,     // Gia công sau in
  FiGrid,         // Kết quả báo giá
  FiInfo,         // Thông tin
  FiPlus,
  FiTrash2
} from "react-icons/fi";




const QuotationPage = () => {

    const [openPaperModal, setOpenPaperModal] = useState(false);
    const [processingList, setProcessingList] = useState<any[]>([]); 
    const [printPriceList, setPrintPriceList] = useState<any[]>([]);
    const [width, setWidth] = useState<number | null>(null);
    const [height, setHeight] = useState<number | null>(null);
    const [printPrice, setPrintPrice] = useState<string | null>(null);
    const [paperSize, setPaperSize] = useState<string>("");
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
                paperSizeId: paperSize,
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

      <button className="btn-primary">
        <FiPrinter />
        In báo giá
      </button>
    </div>
  </div>

  <div className="quotation-content">

    {/* LEFT */}
    <div className="quotation-main">

      {/* THÔNG TIN CHUNG */}
      <div className="card">

        <div className="section-title">
          <FiLayers />
          <span>THÔNG TIN CHUNG</span>
        </div>

        <div className="general-form">

          <div className="field">
            <label>Tên báo giá</label>
            <input placeholder="Nhập tên báo giá" />
          </div>

          <div className="field">
            <label>Loại khách hàng</label>
            <select onChange={(e) => setDiscountId(e.target.value)}>
              <option>Chọn loại khách hàng</option>
                {discountList.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
          </div>

          <div className="field">
            <label>Biên lợi nhuận</label>
            <select onChange={(e) => setProfit(e.target.value)}>
              <option>Chọn</option>
                {profitList.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
          </div>

          <div className="field vat-field">
            <label>VAT (%)</label>

            <div className="input-addon">
              <input placeholder="Nhập VAT (%)"  onChange={(e) => setVat(Number(e.target.value))}/>
              <span>%</span>
            </div>
          </div>

        </div>
      </div>

      {/* THÔNG TIN SẢN PHẨM */}
      <div className="card">

        <div className="section-title">
          <FiPackage />
          <span>THÔNG TIN SẢN PHẨM</span>
        </div>

        <div className="product-grid">

          <div className="product-left">

            <label>Kích thước sản phẩm</label>

            <div className="size-group">
              <input type="number" placeholder="Nhập chiều rộng"  onChange={(e) => setWidth(Number(e.target.value))} />

              <span className="x">x</span>

              <input type="number" placeholder="Nhập chiều cao" onChange={(e) => setHeight(Number(e.target.value))} />

              <span className="unit">mm</span>
            </div>

            <label>Khổ giấy in</label>

            <select onChange={(e) => setPaperSize(e.target.value)}>
              <option>Chọn kích thước</option>
                {paperSizeList.map((size) => (
                    <option key={size.id} value={size.id}>
                        {size.width} x {size.height} mm
                    </option>
                ))}
            </select>

          </div>

          <div className="divider"></div>

          <div className="product-right">

            <div className="field">
              <label>Loại hình in</label>
              <select onChange={(e) => setPrintPrice(e.target.value)}>
                <option>Chọn loại</option>
                {printPriceList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Loại giấy in</label>
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

            <div className="field">
              <label>Số lượng</label>
              <input type="number" placeholder="Nhập số lượng" onChange={(e) => setQuantity(Number(e.target.value))} />
            </div>

          </div>
        </div>
      </div>

      {/* GIA CÔNG */}
      <div className="card">

        <div className="section-title">
          <FiSettings />
          <span>GIA CÔNG SAU IN</span>
        </div>

        <button className="add-processing" onClick={() => setOpenPaperModal(true)}>
          + Thêm gia công
        </button>

        <table className="processing-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Loại gia công</th>
              <th>Thao tác</th>
            </tr>

          </thead>

          <tbody>
            {processingList.length > 0 ? (
                processingList.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
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

        <div className="section-title">
          <FiGrid />
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
          <strong> {result?.data?.quantityPaper ?? 0} tờ</strong>
        </div>

        <hr />

        <div className="result-row">
          <span>Tạm tính</span>
          <strong> {formatMoney(
                            (result?.data?.price || 0)
                            
                        )}</strong>
        </div>

        <div className="result-row">
          <span>VAT (%)</span>
          <strong>{formatMoney(
                            result?.data?.price *
                            ((vat || 0) / 100)
                        )}</strong>
        </div>

        <div className="total-box">
          <div>
            <h3>TỔNG TIỀN</h3>
            <p>(Đã bao gồm VAT)</p>
          </div>

          <span>{formatMoney(
                            (result?.data?.price || 0) +
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

      <div className="sidebar-actions">
        <button className="btn-outline">
          <FiRefreshCw />
          Làm mới
        </button>

        <button className="btn-primary" onClick={handleSumitCalculate}>
          <FiGrid />
          Tính báo giá
        </button>
      </div>

    </div>
  </div>
  <ProcessingsCalModel
        open={openPaperModal}
        setOpen={setOpenPaperModal}
        onAdd={handleAddProcessing}
        data={processingList}
    />
</div>

);
}

export default QuotationPage;

{/* <ProcessingsCalModel
        open={openPaperModal}
        setOpen={setOpenPaperModal}
        onAdd={handleAddProcessing}
        data={processingList}
    /> */}

//     <div className="quotation-page">

//     {/* HEADER */}
//     <div className="quotation-header">

//         <div className="header-title">
//             <FiFileText className="title-icon" />

//             <div>
//                 <h1>BÁO GIÁ</h1>
//                 <p>Tính toán và tạo báo giá nhanh chóng</p>
//             </div>
//         </div>

//         <div className="header-actions">
//             <button className="btn-outline">
//                 <FiRefreshCw />
//                 Làm mới
//             </button>

//             <button className="btn-primary">
//                 <FiPrinter />
//                 In báo giá
//             </button>
//         </div>

//     </div>

//     <div className="quotation-layout">

//         {/* LEFT */}
//         <div className="quotation-left">

//             {/* THÔNG TIN CHUNG */}

//             <div className="card">

//                 <div className="card-title">
//                     <FiLayers />
//                     <span>THÔNG TIN CHUNG</span>
//                 </div>

//                 <div className="form-grid">

//                     <div className="form-group">
//                         <label>Tên báo giá</label>
//                         <input
//                             type="text"
//                             placeholder="Nhập tên báo giá"
//                             onChange={(e) => setName(e.target.value)}
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Loại khách hàng</label>
//                         <select
//                             onChange={(e) =>
//                                 setdicountId(Number(e.target.value))
//                             }
//                         >
//                             <option value="">
//                                 Chọn loại khách hàng
//                             </option>

//                             {discountList.map((item) => (
//                                 <option
//                                     key={item.id}
//                                     value={item.id}
//                                 >
//                                     {item.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="form-group">
//                         <label>Biên lợi nhuận</label>

//                         <select
//                             onChange={(e) =>
//                                 setProfit(e.target.value)
//                             }
//                         >
//                             <option value="">
//                                 Chọn
//                             </option>

//                             {profitList.map((item) => (
//                                 <option
//                                     key={item.id}
//                                     value={item.id}
//                                 >
//                                     {item.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="form-group vat">
//                         <label>VAT (%)</label>

//                         <input
//                             type="number"
//                             placeholder="Nhập VAT (%)"
//                             onChange={(e) =>
//                                 setVat(Number(e.target.value))
//                             }
//                         />
//                     </div>

//                 </div>

//             </div>

//             {/* THÔNG TIN SẢN PHẨM */}

//             <div className="card">

//                 <div className="card-title">
//                     <FiBox />
//                     <span>THÔNG TIN SẢN PHẨM</span>
//                 </div>

//                 <div className="product-grid">

//                     <div className="product-left">

//                         <label>Kích thước sản phẩm</label>

//                         <div className="size-row">

//                             <input
//                                 type="number"
//                                 placeholder="Nhập chiều rộng"
//                                 onChange={(e) =>
//                                     setWight(Number(e.target.value))
//                                 }
//                             />

//                             <span>x</span>

//                             <input
//                                 type="number"
//                                 placeholder="Nhập chiều cao"
//                                 onChange={(e) =>
//                                     setHeigth(Number(e.target.value))
//                                 }
//                             />

//                             <span>mm</span>

//                         </div>

//                         <label>Khổ giấy in</label>

//                         <select
//                             onChange={(e) =>
//                                 setPaperSize(e.target.value)
//                             }
//                         >
//                             <option>
//                                 Chọn kích thước
//                             </option>

//                             {paperSizeList.map((size) => (
//                                 <option
//                                     key={size.id}
//                                     value={size.id}
//                                 >
//                                     {size.width} x {size.height}
//                                 </option>
//                             ))}
//                         </select>

//                     </div>

//                     <div className="product-right">

//                         <label>Loại hình in</label>

//                         <select
//                             onChange={(e) =>
//                                 setPrintPrice(e.target.value)
//                             }
//                         >
//                             <option>
//                                 Chọn loại
//                             </option>

//                             {printPriceList.map((item) => (
//                                 <option
//                                     key={item.id}
//                                     value={item.id}
//                                 >
//                                     {item.name}
//                                 </option>
//                             ))}
//                         </select>

//                         <label>Loại giấy in</label>

//                         <select
//                             onChange={(e) =>
//                                 setSelectedPaperId(
//                                     e.target.value
//                                 )
//                             }
//                         >
//                             <option>
//                                 Chọn giấy
//                             </option>

//                             {paperList.map((paper) => (
//                                 <option
//                                     key={paper.id}
//                                     value={paper.id}
//                                 >
//                                     {paper.name}
//                                 </option>
//                             ))}
//                         </select>

//                         <label>Số lượng</label>

//                         <input
//                             type="number"
//                             placeholder="Nhập số lượng"
//                             onChange={(e) =>
//                                 setQuantity(Number(e.target.value))
//                             }
//                         />

//                     </div>

//                 </div>

//             </div>

//             {/* GIA CÔNG */}

//             <div className="card">

//                 <div className="card-title">
//                     <FiTool />
//                     <span>GIA CÔNG SAU IN</span>
//                 </div>

//                 <button
//                     className="btn-add"
//                     onClick={() =>
//                         setOpenPaperModal(true)
//                     }
//                 >
//                     <FiPlus />
//                     Thêm gia công
//                 </button>

//                 <table className="processing-table">

//                     <thead>
//                         <tr>
//                             <th>STT</th>
//                             <th>Loại gia công</th>
//                             <th>Thao tác</th>
//                         </tr>
//                     </thead>

//                     <tbody>

//                         {processingList.map(
//                             (item, index) => (
//                                 <tr key={index}>
//                                     <td>{index + 1}</td>

//                                     <td>{item.name}</td>

//                                     <td>
//                                         <button
//                                             className="delete-btn"
//                                             onClick={() =>
//                                                 setProcessingList(
//                                                     processingList.filter(
//                                                         (_, i) =>
//                                                             i !== index
//                                                     )
//                                                 )
//                                             }
//                                         >
//                                             <FiTrash2 />
//                                         </button>
//                                     </td>
//                                 </tr>
//                             )
//                         )}

//                     </tbody>

//                 </table>

//             </div>

//         </div>

//         {/* RIGHT */}

//         <div className="quotation-right">

//             <div className="card result-card">

//                 <div className="card-title">
//                     <FiGrid />
//                     <span>KẾT QUẢ BÁO GIÁ</span>
//                 </div>

//                 <div className="result-row">
//                     <span>Giá 1 sản phẩm</span>
//                     <strong>
//                         {formatMoney(
//                             result?.data?.price /
//                             Number(quantity) || 0
//                         )}
//                     </strong>
//                 </div>

//                 <div className="result-row">
//                     <span>Số sản phẩm/tờ</span>
//                     <strong>
//                         {result?.data?.productSheet ?? 0}
//                     </strong>
//                 </div>

//                 <div className="result-row">
//                     <span>Số tờ in</span>
//                     <strong>
//                         {result?.data?.quantityPaper ?? 0}
//                     </strong>
//                 </div>

//                 <hr />

//                 <div className="result-row">
//                     <span>Tạm tính</span>
//                     <strong>
//                         {formatMoney(
//                             result?.data?.price || 0
//                         )}
//                     </strong>
//                 </div>

//                 <div className="result-row">
//                     <span>VAT</span>
//                     <strong>
//                         {formatMoney(
//                             result?.data?.price *
//                             ((vat || 0) / 100)
//                         )}
//                     </strong>
//                 </div>

//                 <div className="total-box">

//                     <div>
//                         <h3>TỔNG TIỀN</h3>
//                         <p>(Đã bao gồm VAT)</p>
//                     </div>

//                     <h2>
//                         {formatMoney(
//                             (result?.data?.price || 0) +
//                             (result?.data?.price || 0) *
//                             ((vat || 0) / 100)
//                         )}
//                     </h2>

//                 </div>

//             </div>

//             <div className="info-box">

//                 <div className="info-title">
//                     <FiInfo />
//                     <span>Thông tin</span>
//                 </div>

//                 <p>
//                     Vui lòng nhập đầy đủ thông tin sản phẩm
//                     và gia công để tính báo giá chính xác
//                     nhất.
//                 </p>

//             </div>

//             <div className="right-actions">

//                 <button className="btn-outline">
//                     <FiRefreshCw />
//                     Làm mới
//                 </button>

//                 <button
//                     className="btn-primary"
//                     onClick={handSumitCalculate}
//                 >
//                     <FiGrid />
//                     Tính báo giá
//                 </button>

//             </div>

//         </div>

//     </div>

//     <ProcessingsCalModel
//         open={openPaperModal}
//         setOpen={setOpenPaperModal}
//         onAdd={handleAddProcessing}
//         data={processingList}
//     />

// </div>