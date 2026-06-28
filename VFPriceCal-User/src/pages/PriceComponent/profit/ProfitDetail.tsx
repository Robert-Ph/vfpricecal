import "./styles/profitDetail.scss";
import { FiEdit,  FiLayers, FiImage, FiTag, FiGrid } from "react-icons/fi";
import {  useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { UserInfo } from "../../../context/AuthContext";
import type { profitItem, profitItemReponse, profitRespone } from "../../../model/model";
import { create, getProfitBId } from "../../../service/ProfitService";
import { useParams } from "react-router-dom";
import ProfitUpdate from "../../../components/profit/ProfitUpdate";

const ProfitDetail = () => {
    const {id} = useParams();
    const [openPaperModal, setOpenPaperModal] = useState(false);
    // const [openDeleteModal, setOpenDeleteModal] = useState(false);
    // const [selectedProcessingId, setSelectedProcessingId] = useState<string>("");
    const [priority, setPrioity] = useState<string>("");
    const [profit, setProfit] = useState<profitRespone | null>(null);
    const [data, setData] = useState<profitItem[]>([]); // State để lưu chi tiết gia công
    const [name, setName] = useState("");
    const [update, setUpdate] = useState<profitItemReponse | null>(null);
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
        // Gọi API để lấy chi tiết gia công theo id
        // Ví dụ: getProcessingById(id).then(data => setProcessingData(data));
        const fetchProfitDetail = async () => {
            try {
                const data = await getProfitBId(id as string); 
                setProfit(data.data);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin chi tiết:", error);
            }
            };
            fetchProfitDetail();
    }, [id]);


        const handleOpenUpdate = (item: profitItemReponse) => {
                setUpdate(item);
                setOpenPaperModal(true);
        };

   const handleSave = async () => {
        if (!name) {
            toast.error("Vui lòng nhập tên giá in");
            return;
        }

        if(!priority){
            toast.error("Vui lòng chọn độ ưu tiên!")
            return;
        }

        if (data.length === 0) {
            alert("Vui lòng thêm ít nhất một kích thước");
            return;
        }
        const payload = {
            id: "",
            companyId: user?.companyId,
            name: name,
            priority: priority,
            itemList:data
        };
        try {
            const res = await create(payload);
            if (res.code === 200 || res.code === 201) {
                toast.success("Lưu giá in thành công");

                setOpenPaperModal(false);
                setName("");
                setData([]);
            }
        } catch (error) {
            console.error("Lỗi khi lưu giá in:", error);
            toast.error("Lưu giá in thất bại");
        }
    };

        

    return (
        <div className="processing-detail">
             <div className="top-bar">
                <div className="title-section">
                   
                    <div className="logo-box">
                        <div className="logo-icon">
                            <span className="layer layer-1"></span>
                            <span className="layer layer-2"></span>
                            <span className="layer layer-3"></span>
                        </div>
                    </div>

                    <div>
                        <h3>Biên lợi nhuận</h3>
                        <p>Thêm biên lợi nhuận mới</p>
                    </div>

                    
                </div>

                
            </div>
            <div className="content-area">

                                <div className="sidebar-material">
                                    <div className="preview-card">
                                        <div className="paper-preview" />
                
                                        <button className="preview-btn">
                                            <FiImage />
                                            Xem ảnh
                                        </button>
                                    </div>
                
                                    <div className="info-card">
                                        <div className="field">
                                            <div className="field-icon">
                                                <FiTag />
                                            </div>
                
                                            <div className="field-content">
                                                <span>Lợi nhuận cho</span>
                                                
                                                <strong><input type="text" placeholder="Nhập tên ....." 
                                                value={profit?.name}
                                                onChange={(e) => setName(e.target.value)}
                                                /></strong>
                                            </div>
                                            {/* <div className="info-card__status">
                                                <FiCheck />
                                            </div> */}
                                        </div>
                                    </div>
                
                                    <div className="info-card">
                                        <div className="field">
                                            <div className="field-icon">
                                                <FiLayers />
                                            </div>
                
                                            <div className="field-content">
                                                <span>Độ ưu tiên</span>
                                               
                                                <select name="" id="" onChange={(e) => setPrioity(e.target.value)}>
                                                    <option value={profit?.priority}>{profit?.priority === "HIGH" ? "Ưu tiên" : "Mặc định"}</option>
                                                    <option value="HIGH">Ưu tiên</option>
                                                    <option value="NORMAL">Mặc định</option>
                                                </select>
                                        
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="save-state">
                                                        <button className="btn-save" onClick={handleSave}>
                                                            Lưu
                                                        </button>
                                                    </div>
                
                                </div>

                <div className="table-panel">
                    <div className="panel-header">
                                            <div className="section-title__icon">
                                                <FiGrid />
                                            </div>
                                            <div className="section-title__content">
                                                <h3>Danh sách</h3>
                                                <p>Quản lý lợi nhuận tương ứng</p>
                                            </div>
                    </div>
             
                    <div className="tab-content">
                            <div className="product-paper-list">
                                <div className="table">
                                    <table className="paper-list">
                                        <thead>
                                            <tr>
                                              
                                                <th>Tên</th>
                                                <th>Lợi nhuận(%)</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {profit?.itemList?.map((item: profitItemReponse) => (
                                                <tr key={item.name}>
                                                    <td>{item.name}</td>
                                                    <td>{item.percent}%</td>
                                                    <td className="action-buttons">
                                                        <button className=" icon edit-btn" onClick={() => handleOpenUpdate(item)}><FiEdit /></button>
                                                        {/* <button className=" icon delete-btn" 
                                                        // onClick={() => handleOpenDelete(item.name?? "")}
                                                        ><FiTrash2 /></button> */}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>

                            </div>

                            {/* <div className="empty-state">
                                                        <button className="btn-primary" onClick={() => setOpenPaperModal(true)}>
                                                            <FiPlus />
                                                            Thêm mới
                                                        </button>
                                                    </div> */}

                    </div>
                </div>
            </div>

             <ProfitUpdate
                key={update?.id}
                open={openPaperModal}
                setOpen={setOpenPaperModal}
                data = {update || null}
                id ={id!}

            />

        </div>
    );
};

export default ProfitDetail;