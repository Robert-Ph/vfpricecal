import "./componentPaper.scss";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import { useState, useEffect } from "react";
import { getPapers } from "../../../service/PaperService";
import CategoryModal from "../../../components/categoryModel";



const ComponentPaper = () => {
    const navigate = useNavigate();
    const [paperList, setPaperList] = useState<any[]>([]);
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

// THAY THẾ useState bằng useEffect
    useEffect(() => {
        const fetchPapers = async () => {
            // Chỉ gọi API khi đã có thông tin user và companyId
            if (user?.companyId) {
                try {
                    const papers = await getPapers(user.companyId);
                    console.log("Danh sách giấy/vật liệu:", papers);
                    setPaperList(papers.data); // Cập nhật danh sách vào state để hiển thị
                } catch (error) {
                    console.error("Lỗi khi lấy giấy/vật liệu:", error);
                }
            }
        };

        fetchPapers();
    }, [user?.companyId]);




    return (
        <div className="papers-page">
            <div className="papers-header">
                <h3>Giấy & Vật liệu</h3>

                <button className="add-papers-btn" onClick={() => navigate("/component/paper/add")}>
                    <FaPlus /> Thêm giấy/vật liệu
                </button>
            </div>

            <div className="papers-info">
                {/* Tìm kiếm giấy/vật liệu theo tên, mã hoặc mô tả. Bạn cũng có thể lọc theo danh mục, giá cả hoặc nhà cung cấp. */}
                <div className="papers-search">
                    <FiSearch className="search-icon" />
                    <input type="text" value="" placeholder="Tìm kiếm..." />
                    <button>Tìm kiếm</button>
                </div>


                {/* danh sách giấy/vật liệu sẽ hiển thị ở đây. Mỗi giấy/vật liệu sẽ có thông tin như tên, mã, mô tả. Bạn có thể nhấp vào một giấy/vật liệu để xem chi tiết hoặc chỉnh sửa thông tin của nó. */}
                <div className="papers-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Tên giấy/vật liệu</th>
                                <th>gsm</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* sản phẩm sẽ được hiển thị ở đây. Mỗi sản phẩm sẽ có thông tin như tên, mã sản phẩm, mô tả . Bạn có thể nhấp vào một sản phẩm để xem chi tiết hoặc chỉnh sửa thông tin của nó. */}

                            {paperList.map((paper) => (
                                <tr key={paper.id}>
                                    <td>{paper.name}</td>
                                    <td>{paper.gsm}</td>
                                    <td className="action-buttons">
                                    <button className=" icon edit-btn"
                                        onClick={() => navigate(`/component/papers/${paper.id}`)}>
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
    );
}

export default ComponentPaper;