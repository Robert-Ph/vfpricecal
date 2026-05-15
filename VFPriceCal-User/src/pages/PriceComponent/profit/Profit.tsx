import "./profit.scss";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getCategories } from "../../../service/ProcessingService";
import PrintPriceModel from "../../../components/PrintPriceModel";

const Profit = () => {
    const navigate = useNavigate();
    const [openPaperModal, setOpenPaperModal] = useState(false);
    const [category, setCategory] = useState<any[]>([]); // State để quản lý danh mục lọc

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
        // Gọi API để lấy danh mục lọc (nếu có)
        // Ví dụ: getCategories().then(data => setCategory(data));
        const fetchCategories = async () => {
            try {
                // Giả sử bạn có API getCategories
                const data = await getCategories(user.companyId); 
                setCategory(data.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh mục lọc:", error);
            }
        };

        fetchCategories();
    }, [user?.companyId]);

            

    return (
        <div className="processing-page">
            <div className="processing-header">
                <h3>Biên lợi nhuận</h3>

                <button className="add-processing-btn" onClick={() => setOpenPaperModal(true)}>
                    <FaPlus /> Thêm mới
                </button>
            </div>

            <div className="processing-info">
                {/* Tìm kiếm gia công theo tên, mã gia công hoặc mô tả. Bạn cũng có thể lọc gia công theo danh mục, giá cả hoặc nhà cung cấp. */}
                <div className="processing-search">
                    <FiSearch className="search-icon" />
                    <input type="text" value="" placeholder="Tìm kiếm..." />
                    <button>Tìm kiếm</button>
                </div>


                {/* danh sách gia công sẽ hiển thị ở đây. Mỗi gia công sẽ có thông tin như tên, mã gia công, mô tả. Bạn có thể nhấp vào một gia công để xem chi tiết hoặc chỉnh sửa thông tin của nó. */}
                <div className="processing-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Tên biên lợi nhuận </th>
                                <th>Tỷ lệ(%)</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* sản phẩm sẽ được hiển thị ở đây. Mỗi sản phẩm sẽ có thông tin như tên, mã sản phẩm, mô tả . Bạn có thể nhấp vào một sản phẩm để xem chi tiết hoặc chỉnh sửa thông tin của nó. */}
                            {/* Ví dụ về một sản phẩm */}
                            {category.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.id}</td>
                                    <td className="action-buttons">
                                    <button className=" icon edit-btn"
                                        onClick={() => navigate(``)}>
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

        <PrintPriceModel
            open={openPaperModal}
            setOpen={setOpenPaperModal}
        />

        </div>
    );
}

export default Profit;