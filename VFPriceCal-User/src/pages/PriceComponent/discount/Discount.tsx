import "../component.scss";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import { deleteDiscount, getAllDiscountByCompany } from "../../../service/DiscountService";
import ConfirmModal from "../../../components/ConfirmModal";
import { toast } from "react-toastify";
import type { discountRequest } from "../../../model/model";
import type { UserInfo } from "../../../context/AuthContext";

const Discount = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [discount, setDiscount] = useState<discountRequest[]>([]); // State để quản lý danh mục lọc
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedDiscountId, setSelectedDiscountId] = useState<string | null>(null);
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

    useEffect(() => {
        // Gọi API để lấy danh mục lọc (nếu có)
        // Ví dụ: getCategories().then(data => setCategory(data));
        const fetchCategories = async () => {
            try {
                // Giả sử bạn có API getCategories
                const data = await getAllDiscountByCompany(user?.companyId ?? ""); 
                setDiscount(data.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh mục lọc:", error);
            }
        };

        fetchCategories();
    }, [user?.companyId]);

    const handleOpenDelete = (id: string) => {
        setSelectedDiscountId(id);
        setOpenDeleteModal(true);
        };
    
        const handleDeletePaper = async () => {
        try {
            if (!selectedDiscountId) return;
    
            await deleteDiscount(selectedDiscountId, user?.companyId ?? "");
    
            setDiscount((prev) =>
                prev.filter((item) => String(item.id) !== selectedDiscountId)
            );
    
            toast.success("Xoá chiết khấu  thành công");
    
            setOpenDeleteModal(false);
        } catch (error) {
            console.error(error);
            toast.error("Xoá thất bại");
        }
        };
            

    return (
        <div className="papers-page">
            <div className="papers-header">
                <h3>Chiết khấu khách hàng</h3>

                <button className="add-papers-btn" onClick={() => navigate("/component/discount/new")}>
                    <FaPlus /> Thêm mới
                </button>
            </div>

            <div className="papers-info">
                {/* Tìm kiếm gia công theo tên, mã gia công hoặc mô tả. Bạn cũng có thể lọc gia công theo danh mục, giá cả hoặc nhà cung cấp. */}
                <div className="papers-search">
                    <FiSearch className="search-icon" />
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Tìm kiếm..." />
                    <button>Tìm kiếm</button>
                </div>


                {/* danh sách gia công sẽ hiển thị ở đây. Mỗi gia công sẽ có thông tin như tên, mã gia công, mô tả. Bạn có thể nhấp vào một gia công để xem chi tiết hoặc chỉnh sửa thông tin của nó. */}
                <div className="papers-list">
                    <div className="table-scroll">
                        <table>
                        <thead>
                            <tr>
                                <th>Loại khách hàng </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* sản phẩm sẽ được hiển thị ở đây. Mỗi sản phẩm sẽ có thông tin như tên, mã sản phẩm, mô tả . Bạn có thể nhấp vào một sản phẩm để xem chi tiết hoặc chỉnh sửa thông tin của nó. */}
                            {/* Ví dụ về một sản phẩm */}
                            {discount.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td className="action-buttons">
                                        <button className=" icon edit-btn"
                                            onClick={() => navigate(`/component/discount/${item?.id}`)}>
                                            <FiEdit />
                                        </button>
                                        <button className=" icon delete-btn" onClick={() => handleOpenDelete(String(item.id))}><FiTrash2 /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                    
                </div>
            </div>

        <ConfirmModal
            isOpen={openDeleteModal}
            title="Xác nhận xoá"
            message="Bạn có chắc muốn xoá chiết khấu này?"
            onCancel={() => setOpenDeleteModal(false)}
            onConfirm={handleDeletePaper}
        />

        </div>
    );
}

export default Discount;