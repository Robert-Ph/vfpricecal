// import "./printCost.scss";
import "../component.scss";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import PrintPriceModel from "../../../components/printPrice/PrintPriceModel";
import { useEffect, useState } from "react";
import { getAllByCompany } from "../../../service/PrintPriceService";

const PrintCost = () =>{
    const navigate = useNavigate();
    const [openPaperModal, setOpenPaperModal] = useState(false);
    const [printPriceList, setPrintPriceList] = useState<any[]>([]);
    const [search, setSearch] = useState("");

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
            
            fetchPrintPrice();
    }, [user?.companyId]);



    return(
         <div className="papers-page">
                    <div className="papers-header">
                        <h3>Giá in</h3>
        
                        <button className="add-papers-btn" onClick={() => setOpenPaperModal(true)}>
                            <FaPlus /> Thêm mới
                        </button>
                    </div>
        
                    <div className="papers-info">
                        {/* Tìm kiếm giấy/vật liệu theo tên, mã hoặc mô tả. Bạn cũng có thể lọc theo danh mục, giá cả hoặc nhà cung cấp. */}
                        <div className="papers-search">
                            <FiSearch className="search-icon" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Tìm kiếm..."
                            />
                            <button>Tìm kiếm</button>
                        </div>
        
        
                        {/* danh sách giấy/vật liệu sẽ hiển thị ở đây. Mỗi giấy/vật liệu sẽ có thông tin như tên, mã, mô tả. Bạn có thể nhấp vào một giấy/vật liệu để xem chi tiết hoặc chỉnh sửa thông tin của nó. */}
                        <div className="papers-list">
                            <div className="table-scroll">
                                <table>
                                <thead>
                                    <tr>
                                        <th>Tên </th>
                                        <th>Đơn vị tính</th>
                                        <th>Giá</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                   
                                    {printPriceList.map((item)=>(
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>Tờ</td>
                                            <td>{item.price}đ</td>
                                            <td className="action-buttons">
                                                <button className=" icon edit-btn"
                                                    onClick={() => navigate("  ")}>
                                                    <FiEdit />
                                                </button>
                                                <button className=" icon delete-btn"><FiTrash2 /></button>
                                            </td>
                                        </tr>
                                    ))}
                                
                                </tbody>
                            </table>
                            </div>
                            
                        </div>
                    </div>

                     <PrintPriceModel
            open={openPaperModal}
            setOpen={setOpenPaperModal}
        />
                </div>
    );
}

export default PrintCost;