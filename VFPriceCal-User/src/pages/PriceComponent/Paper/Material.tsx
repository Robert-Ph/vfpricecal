
import "../component.scss"
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import { useState, useEffect } from "react";
import { deletePaper, getPapers } from "../../../service/PaperService";
import ConfirmModal from "../../../components/ConfirmModal";
import { toast } from "react-toastify";
import type { UserInfo } from "../../../context/AuthContext";
import type { paperResponse } from "../../../model/model";



const Material = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [paperList, setPaperList] = useState<paperResponse[]>([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedPaperId, setSelectedPaperId] = useState<string>("");
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

// THAY THẾ useState bằng useEffect
    useEffect(() => {
        const fetchPapers = async () => {
            // Chỉ gọi API khi đã có thông tin user và companyId
            if (user?.companyId) {
                try {
                    const papers = await getPapers(user.companyId);
                    setPaperList(papers.data); // Cập nhật danh sách vào state để hiển thị
                } catch (error) {
                    console.error("Lỗi khi lấy giấy/vật liệu:", error);
                }
            }
        };

        fetchPapers();
    }, [user?.companyId]);


    const handleOpenDelete = (id: string) => {
    setSelectedPaperId(id);
    setOpenDeleteModal(true);
    };

    const handleDeletePaper = async () => {
    try {
        if (!selectedPaperId) return;

        await deletePaper(selectedPaperId, user?.companyId ?? "", user?.userId ?? "");

        setPaperList((prev) =>
            prev.filter((item) => item.id !== selectedPaperId)
        );

        toast.success("Xoá giấy/vật liệu thành công");

        setOpenDeleteModal(false);
    } catch (error) {
        console.error(error);
        toast.error("Xoá thất bại");
    }
    };


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
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Tìm kiếm..." />
                    <button>Tìm kiếm</button>
                </div>


                {/* danh sách giấy/vật liệu sẽ hiển thị ở đây. Mỗi giấy/vật liệu sẽ có thông tin như tên, mã, mô tả. Bạn có thể nhấp vào một giấy/vật liệu để xem chi tiết hoặc chỉnh sửa thông tin của nó. */}
                <div className="papers-list">
                    <div className="table-scroll">
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
                                    <button className=" icon delete-btn" onClick={() => handleOpenDelete(paper?.id ?? "")}><FiTrash2 /></button>
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
    message="Bạn có chắc muốn xoá giấy/vật liệu này?"
    onCancel={() => setOpenDeleteModal(false)}
    onConfirm={handleDeletePaper}
/>

        </div>
    );
}

export default Material;