import ProcessingsCalModel from "../../components/ProcessingsCalModel";
import { getPaperById, getPapers } from "../../service/PaperService";
import {getAllByCompany} from "../../service/PrintPriceService";
import {calculatePrint} from "../../service/CalculateService";
import { getAllProfitByCompany } from "../../service/ProfitService";
import "./quotationPage.scss";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { formatMoney } from "../../utils/formatMoney";
import { numberToVietnameseText } from "../../utils/MoneyModel";



const QuotationPage = () => {

    const [openPaperModal, setOpenPaperModal] = useState(false);
    const [processingList, setProcessingList] = useState<any[]>([]); 
    const [printPriceList, setPrintPriceList] = useState<any[]>([]);
    const [wight, setWight] = useState<number | null>(null);
    const [heigth, setHeigth] = useState<number | null>(null);
    const [printPrice, setPrintPrice] = useState<number | null>(null);
    const [paperSize, setPaperSize] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number | null>(null);
    // const [quotationData, setQuotationData] = useState<any>(null); // State để lưu thông tin báo giá
    // const [activeTab, setActiveTab] = useState("general"); // State để quản lý tab đang hoạt động
    // const [productList, setProductList] = useState<any[]>([]); // State để quản lý danh sách sản phẩm trong báo giá
    // const [processingList, setProcessingList] = useState<any[]>([]); // State để quản lý danh sách gia công trong báo giá
    const [paperList, setPaperList] = useState<any[]>([]); // State để quản lý danh sách giấy/vật liệu trong báo giá
    const [paperSizeList, setPaperSizeList] = useState<any[]>([]); // State để quản lý danh sách kích thước giấy/vật liệu trong báo giá
    const [profitList, setProfitList] = useState<any[]>([]);
    const [profit, setProfit] = useState<number | null>(null);
    const [selectedPaperId, setSelectedPaperId] = useState<number | null>(null);
    const [result, setResult] = useState<any>(null);


    
    const [user] = useState<any>(() => {
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
                const data = await getPapers(user.companyId); 
                setPaperList(data.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách giấy/vật liệu:", error);
            }
        };
        const fetchPaperSizeList = async () => {
            try {
                if(Number(selectedPaperId) !== 0){
                    const data = await getPaperById(Number(selectedPaperId));
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
                                console.log("Danh sách giấy/vật liệu:", papers);
                                setPrintPriceList(papers.data); // Cập nhật danh sách vào state để hiển thị
                            } catch (error) {
                                console.error("Lỗi khi lấy giấy/vật liệu:", error);
                            }
                        }
            };


            const fetchProfitList = async () => {
                            try {
                                const response = await getAllProfitByCompany(user.companyId);
                                setProfitList(response.data); // Cập nhật danh sách vào state để hiển thị
                            } catch (error) {
                                console.error("Lỗi khi lấy biên lợi nhuận:", error);
                            }
            }
            
            fetchPrintPrice();
            fetchProfitList();
    }, [user?.companyId]);
    

    const handSumitCalculate = async () =>{
        try{
            const data ={
                widthProduct: wight,
                heightProduct: heigth,
                quantity: quantity,
                processingIds: processingList,
                paperId: selectedPaperId,
                paperSizeId: Number(paperSize),
                companyId: Number(user?.companyId),
                printPrice: Number(printPrice),
                profit: Number(profit)
            }

            const response = await calculatePrint(data);
            setResult(response);

        }catch(error){
            console.error("Lỗi báo giá vui lòng kiểm tra lại thông tin:", error);
        }
    }


    return (
        <div className="body">
            <div className="info">
                <div className="info-item info-item-1">

                    {/* Thông tin chung: TÊN BÁO GIÁ VÀ LOẠI KHÁCH HÀNG */}
                    <div className="item-lable">
                        <h3>Thông tin chung</h3>
                    </div>
                    <div className="item-content">
                        <div className="form-name">
                            <label htmlFor="name">Tên báo giá:</label>
                            <input type="text" id="name" name="name" />
                        </div>

                        <div className="form-type-customer">
                            <label htmlFor="customer-type">Loại khách hàng:</label>
                            <select id="customer-type" name="customer-type">
                                <option value="individual">Khách hàng thường</option>
                                <option value="vip">Khách hàng VIP</option>
                                <option value="Company">Đại lý</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* THÔNG TIN SẢN PHẨM  VÀ SỐ LƯỢNG*/}
                <div className="info-item info-product">
                    <div className="item-lable">
                        <h3>Thông tin sản phẩm</h3>
                    </div>
                    <div className="item-content">
                        {/* TÊN SẢN PHẨM: */}
                        <div className="form-product-name">
                            <label htmlFor="product-name">Biên lợi nhuận:</label>
                            <select name="product-name" id="product-name" onChange={(e) => setProfit(Number(e.target.value))}>
                                <option value="">Chọn</option>

                                {profitList.map((item)=>(
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* KÍCH THƯỚC SẢN PHẨM: */}
                        <div className="form-product-size">
                            <label htmlFor="product-size">Kích thước sản phẩm:</label>
                            <input type="number" id="product-size-width" name="product-size" onChange={(e) => setWight(Number(e.target.value))}/>
                            <span>x</span>
                            <input type="number" id="product-size-height" name="product-size"  onChange={(e) => setHeigth(Number(e.target.value))}/>
                            <span>mm</span>
                        </div>

                        {/* LOẠI HÌNH IN: 4 MÀU 1 MẮT, 4 MÀU 2 MẶT, TRẮNG ĐEN 1 MẶT, TRẮNG ĐEN 2 MẶT */}
                        <div className="form-product-print-type">
                            <label htmlFor="product-print-type">Loại hình in:</label>
                            <select id="product-print-type" name="product-print-type" onChange={(e) => setPrintPrice(Number(e.target.value))}>
                                <option value="">Chọn loại</option>
                                {printPriceList.map((item)=>(
                                    <option
                                        key={item.id} 
                                        value={item.id}>{item.name}</option>
                                ))}
                        
                            </select>
                        </div>

                        {/* LOẠI GIÂY IN: GIẤY COATED, GIẤY OFFSET, GIẤY SPECIALTY */}
                        <div className="form-product-paper-type">
                            <label htmlFor="product-paper-type">Loại giấy in:</label>
                            <select id="product-paper-type" name="product-paper-type"
                             onChange={(e) => {
                                const value = e.target.value;

                                setSelectedPaperId(
                                    value ? Number(value) : null
                                );
                             }}
                            >
                                <option value="">Chọn giấy</option>
                                {paperList.map((paper) => (
                                    <option key={paper.id} value={paper.id}>
                                        {paper.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-product-paper-type">
                            <label htmlFor="product-paper-type">Khổ giấy in:</label>
                            <select id="product-paper-type" name="product-paper-type" onChange={(e) => {
                                                                                    const value = e.target.value;
                                                                                    setPaperSize(value ? Number(value) :  null)
                                                                                    }}>
                                <option value="">Chọn kích thước</option>
                                {paperSizeList.map((size) => (
                                    <option key={size.id} value={size.id}>
                                        {size.width}mm x {size.height}mm
                                    </option>
                                ))}
                            </select>
                        </div>


                        {/* SỐ LƯỢNG: */}
                        <div className="form-product-quantity">
                            <label htmlFor="product-quantity">Số lượng:</label>
                            <input type="number" id="product-quantity" name="product-quantity" onChange={(e) => setQuantity(Number(e.target.value))}/>
                        </div>

                    </div>

                </div>

                {/* THÔNG TIN GIA CÔNG SAU IN*/}
                <div className="info-item info-quantity">
                    <div className="item-lable">
                        <h3>Thông tin gia công sau in</h3>
                    </div>

                    {/* GIA CÔNG CƠ BẢN: CÁN MÀNG, BẾ TEM */}
                    <div className="item-content tab-content">
                            <table className="paper-list">
                                        <thead>
                                            <tr>
                                                {/* <th>Tên gia công</th> */}
                                                <th>Loại</th>
                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {processingList.map((item, index) => (
                                                <tr key={index}>
                                                    {/* <td>{item.ProcessingName}</td> */}
                                                    <td>{item.name}</td>
                                                    <td>
                                                        <button onClick={() => setProcessingList(processingList.filter((_, i) => i !== index))}>
                                                            <FiTrash2 />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                            </table>
                    </div>

                    <button className="button-processing" onClick={() => setOpenPaperModal(true)}>Thêm gia công</button>

                </div>
            </div>


            {/* KẾT QUẢ BÁO GIÁ: GIÁ VÀ TỶ LỆ HOÀN TRẢ */}
            <div className="quotation">
                <div className="info-item info-quotation">
                    <div className="item-lable">
                        <h3>Kết quả báo giá</h3>
                    </div>
                    <div className="item-content">
                        <div className="form-sheets-page">
                            <label htmlFor="sheets-page">Số tờ in:</label>
                            <span className="sheets-page-value">{result?.data.quantityPaper | 0} tờ</span>
                        </div>
                        <div className="form-printing-price">
                            <label htmlFor="quotation-price">Số sp/tờ:</label>
                            <span className="printing-price-value">{result?.data.productSheet | 0}</span>
                        </div>
                        <div className="form-processing-price">
                            <label htmlFor="return-rate">Giá 1 sản phẩm:</label>
                            <span className="processing-price-value">{formatMoney(result?.data.price / Number(quantity) || 0)}</span>
                        </div>
                        <div className="form-discount">
                            <label htmlFor="discount">Giảm:</label>
                            <span className="discount-value">0 đ</span>
                        </div>
                    </div>
                    <hr />
                    <div className="total-price">
                        <label htmlFor="total-price">Tổng tiền:</label>
                        <span className="total-price-value">{formatMoney(result?.data.price || 0)}</span>
                        <br />
                        
                    </div>
                    <p className="text-money">{numberToVietnameseText(result?.data.price || 0)}</p>
                    <div className="action-buttons">
                        <button className="btn btn-primary" onClick={handSumitCalculate}>Tính báo giá</button>
                        <button className="btn btn-secondary">In báo giá</button>
                    </div>

                </div>


            </div>

            <ProcessingsCalModel 
            open={openPaperModal} 
            setOpen={setOpenPaperModal} 
            onAdd={handleAddProcessing}
            data = {processingList} 
            />

        </div>
    );
}

export default QuotationPage;