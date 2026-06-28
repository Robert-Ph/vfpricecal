import "../component.scss";
import { FaPlus } from "react-icons/fa";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import { deleteProfitByCompany, getAllProfitByCompany } from "../../../service/ProfitService";
import ConfirmModal from "../../../components/ConfirmModal";
import { toast } from "react-toastify";
import type { profitRespone } from "../../../model/model";
import type { UserInfo } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profit = () => {
    const navigate = useNavigate();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProfitId, setSelectedProfitId] = useState<string>("");
    const [profit, setProfit] = useState<profitRespone[]>([]); // State để quản lý danh mục lọc

    const [user] = useState<UserInfo>(() => {
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


    useEffect(() => {
        // Gọi API để lấy danh mục lọc (nếu có)
        // Ví dụ: getCategories().then(data => setCategory(data));
        const fetchCategories = async () => {
            try {
                // Giả sử bạn có API getCategories
                const data = await getAllProfitByCompany(user.companyId); 
                setProfit(data.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh mục lọc:", error);
            }
        };

        fetchCategories();
    }, [user?.companyId]);

    const handleOpenDelete = (id: string) => {
            setSelectedProfitId(id);
            setOpenDeleteModal(true);
            };
    
        
    const handleDeletePaper = async () => {
            try {
                if (!selectedProfitId) return;
        
                await deleteProfitByCompany(selectedProfitId, user.companyId);
        
                setProfit((prev) =>
                    prev.filter((item) => item.id !== selectedProfitId)
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
                <h3>Biên lợi nhuận</h3>

                <button className="add-papers-btn" onClick={() => navigate("/component/profit/new")}>
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
                                <th>Tên biên lợi nhuận </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* sản phẩm sẽ được hiển thị ở đây. Mỗi sản phẩm sẽ có thông tin như tên, mã sản phẩm, mô tả . Bạn có thể nhấp vào một sản phẩm để xem chi tiết hoặc chỉnh sửa thông tin của nó. */}
                            {/* Ví dụ về một sản phẩm */}
                            {profit.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td className="action-buttons">
                                        <button className=" icon edit-btn"
                                            onClick={() =>  navigate(`/component/profit/${item.id}`)}>
                                            <FiEdit />
                                        </button>
                                        <button className=" icon delete-btn" onClick={()=>handleOpenDelete(item.id)}><FiTrash2 /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                    
                </div>
            </div>

        {/* <ProfitModal
            key={selectedProfit?.id ?? "create"}
            open={openPaperModal}
            setOpen={setOpenPaperModal}
            onSubmit ={selectedProfit}
        
        /> */}

        <ConfirmModal
            isOpen={openDeleteModal}
            title="Xác nhận xoá"
            message="Bạn có chắc muốn xoá biên lợi nhuận này này?"
            onCancel={() => setOpenDeleteModal(false)}
            onConfirm={handleDeletePaper}
        />

        </div>
    );
}

export default Profit;