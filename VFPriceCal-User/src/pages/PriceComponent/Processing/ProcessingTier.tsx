import "./processingDetail.scss";
import { 
    FiEdit, 
    FiTrash2,  FiImage, FiTag, FiGrid, FiPlus   } from "react-icons/fi";
import {  FaSave } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProcessingAddModel from "../../../components/processing/ProcessingAdd";
import { toast } from "react-toastify";
import type {processingCreate, processingTier } from "../../../model/model";
import { formatMoney } from "../../../utils/formatMoney";
import {  getTierProcessingById, updateProcessingById } from "../../../service/ProcessingService";

const ProcessingTier = () => {

    const [openPaperModal, setOpenPaperModal] = useState(false);
    const [name, setName] = useState("");
    const [unit, setUnit] = useState("sheet");
    const [categoryId, setCategoryId] = useState("");
    const [dataProcessing, setDataProcessing] = useState<processingTier>();
    const [data, setData] = useState<processingTier[]>([]);
    const {id} = useParams();
    
    useEffect(()=> {
        const fetchGetData = async () => {
            try{
            const reponse = await getTierProcessingById(id ?? "");
            setCategoryId(reponse.data.categoryId);
            setData(reponse.data.tierReponses);
            setName(reponse.data.name);
            setUnit(reponse.data.unit);
        }catch(error){
             console.error("Lỗi khi lấy dữ liệu:", error);
        }
        }
        fetchGetData();
        
    },[id])

    const handleAddProcessingTier = (newData: processingTier) => {
       if (newData.id) {
        setData(prev =>
            prev.map(item =>
                item.id === newData.id ? newData : item
            )
        );
        return;
    }

    setData(prev => [...prev, newData]);
    };
    const handEditProcessingTier = (data: processingTier) => {
        setDataProcessing(data);
        setOpenPaperModal(true);
    }
    const handleDeleteProcessingTier = (id: string) => {
    setData(data.filter(item => item.id !== id));
    };

    const handleSumit = async () => {
        if(!name){
            toast.error("Vui lòng nhập đầy đủ thông tin!")
        }

        if(data.length === 0){
            toast.error("Tồn tại tối thiểu 1 thành phần trong danh sách!")
        }
        
    const payload: processingCreate = {
        id: id ?? null,
        categoryId: categoryId ?? null,
        name: name,
        unit: unit,
        pTierRequests: data
    };

        try{
            const reponse = await updateProcessingById(payload);
            if(reponse.code === 200 || reponse.code === 201){
                setTimeout(() => {
                     window.location.reload(); // Hoặc navigate("/component/papers") nếu bạn dùng react-router
                }, 500); // Đợi 2 giây trước khi reload hoặc navigate
                toast.success(`Cập nhật gia công ${name} thành công!`)
            }
        } catch (error)
        {
             console.error("Lỗi khi lưu:", error);
            // alert("Có lỗi xảy ra khi tạo giấy mới. Vui lòng thử lại.");
            toast.error(`Có lỗi xảy ra khi cập nhật ${name}.`);
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
                        <h3>Thêm gia công</h3>
                        <p>Quản lý thông tin gia công</p>
                    </div>

                    
                </div>

                
            </div>
            <div className="content-area">
                {/* LEFT SIDE: Thông tin chi tiết giấy/vật liệu sẽ hiển thị ở đây. Bạn có thể chỉnh sửa thông tin như tên, gsm, trạng thái, và xem trước hình ảnh của giấy/vật liệu. */}
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
                                                <span>Tên gia công</span>
                                                <input type="text" value={name} onChange={(e) => setName(e.target.value) }/>
                                            </div>
                                            {/* <div className="info-card__status">
                                                <FiCheck />
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="info-card">
                                        <div className="field">
                                            <div className="field-icon">
                                                <FiTag />
                                            </div>
                
                                            <div className="field-content">
                                                <span>Đơn vị</span>
                                                <select name="" id="" value={unit} onChange={(e) => setUnit(e.target.value)}>
                                                    <option value="sheet">Tờ</option>
                                                    <option value="m2">m²</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                     <div className="button-save">
                                                            <button className="cancel" onClick={() => window.history.back()}>Quay lại</button>
                                                            {/* 3. Gắn hàm handleSave vào đây */}
                                                            <button className="save" onClick={handleSumit}>
                                                                <FaSave /> Lưu
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
                                                <p>Quản lý danh sách và giá tương ứng</p>
                                            </div>
                    </div>
             
                    <div className="tab-content">
                            <div className="product-paper-list">
                                <div className="table">
                                    <table className="paper-list">
                                        <thead>
                                            <tr>
                                                <th title="Đơn vị tờ là số tờ tối thiểu. Đối với m2 tức là m2 tối thiểu">Tối thiểu</th>
                                                <th title="Đơn vị tờ là số tờ tối đa. Đối với m2 tức là m2 tối đa">Tối đa</th>
                                                <th>Giá</th>
                                                <th title="Nếu giá gia công thấp hơn giá sàn thì sẻ lấy giá sàn để tính chi phí">Giá sàn</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Ví dụ về một sản phẩm */}
                                            {data?.map((item: processingTier) => (
                                                <tr key={item.id}>
                                                    <td>{item.minVolume}</td>
                                                    <td>{item.maxVolume}</td>
                                                    <td>{formatMoney(item.price)}</td>
                                                    <td>{formatMoney(item.minCharge)}</td>
                                                    <td className="action-buttons">
                                                        <button className=" icon edit-btn" onClick={() => handEditProcessingTier(item)}><FiEdit /></button>
                                                        <button className=" icon delete-btn" onClick={() => handleDeleteProcessingTier(item.id ?? "")}><FiTrash2 /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>

                            </div>

                            <div className="empty-state">
                                                        <button className="btn-primary" onClick={() => setOpenPaperModal(true)}>
                                                            <FiPlus />
                                                        Thêm mới
                                                        </button>
                                                    </div>

                    </div>
                </div>
            </div>

            <ProcessingAddModel
                key={dataProcessing?.id ?? "create"}
                open={openPaperModal}
                setOpen={setOpenPaperModal}
                data = {dataProcessing}
                onAdd={handleAddProcessingTier}
            />

        </div>
    );
};

export default ProcessingTier;