import "./newProduct.scss";
import { FaPlus } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import SelectModal from "../../components/SelectModal";

const paperMaster = [
    { id: 1, name: "Decal giấy đế vàng", size: "320x430" },
    { id: 2, name: "Decal nhựa trong", size: "330x480" }
];

const processMaster = [
    { id: 1, name: "Cán màng bóng", type: "Cán" },
    { id: 2, name: "Bế demi", type: "Bế" }
];

const paperColumns = [
    { field: "name", label: "Tên giấy" },
    { field: "size", label: "Kích thước" }
];

const processColumns = [
    { field: "name", label: "Tên gia công" },
    { field: "type", label: "Loại" },
    { field: "price", label: "Đơn giá" }
];


const NewProduct = () => {
    const [activeTab, setActiveTab] = useState("paper");


    const [openPaperModal, setOpenPaperModal] = useState(false);
    const [openProcessModal, setOpenProcessModal] = useState(false);

    const [paperList, setPaperList] = useState([]);
    const [processList, setProcessList] = useState([]);


    const handleAddPaper = (list) => {

        setPaperList(prev => {

            const newList = [...prev];

            list.forEach(p => {
                const exist = newList.find(x => x.id === p.id);
                if (!exist) newList.push(p);
            });

            return newList;
        });

    };

    const handleAddProcess = (list) => {

        setProcessList(prev => {

            const newList = [...prev];

            list.forEach(p => {
                const exist = newList.find(x => x.id === p.id);
                if (!exist) newList.push(p);
            });

            return newList;
        });

    };


    return (
        <div className="product-detail">
            <div className="product-header">
                <h3>Sản phẩm/ Thêm mới</h3>
                {/* <button className="add-product-btn"> <FaPlus /> Lưu thay đổi</button> */}
            </div>
            <div className="product-detail-info">
                <div className="product-info-basic">
                    {/* <div className="product-image">
                        Image placeholder
                    </div> */}
                    <div className="product-item">
                        <label htmlFor="product-name">Tên sản phẩm:</label>
                        <input type="text" id="product-name" value="Sản phẩm A" />
                    </div>

                    <div className="product-item">
                        <label htmlFor="product-code">Mã sản phẩm:</label>
                        <input type="text" id="product-code" value="" disabled />
                    </div>

                    <div className="product-item">
                        <label htmlFor="product-description">Mô tả:</label>
                        <input type="text" id="product-description" value="Mô tả sản phẩm A" />
                    </div>

                    <div className="product-item">
                        <label htmlFor="product-description">Biên lợi nhuận:</label>
                        <input type="text" id="product-description" value="150%" />
                    </div>

                    <div className="product-item">
                        <label htmlFor="product-status">Trạng thái:</label>
                        <input type="text" id="product-status" value="Đang hoạt động" />
                    </div>

                    <div className="button-setting">
                        <button className="add-product-btn save-btn">Lưu</button>
                        <button className="add-product-btn cancel-btn">Hủy</button>
                    </div>


                </div>
                <div className="product-info-advanced">
                    <div className="tabs">
                        <div className={`tab ${activeTab === "paper" ? "active" : ""}`} onClick={() => setActiveTab("paper")}>Giấy</div>
                        <div className={`tab ${activeTab === "processing" ? "active" : ""}`} onClick={() => setActiveTab("processing")}>Gia công</div>
                        <div className={`tab ${activeTab === "customer" ? "active" : ""}`} onClick={() => setActiveTab("customer")}>Khách hàng</div>
                    </div>
                    <div className="tab-content">
                        {activeTab === "paper" &&
                            <div className="product-paper-list">
                                <div className="table">
                                    <table className="paper-list">
                                        <thead>
                                            <tr>
                                                <th>Tên loại giấy</th>
                                                <th>Định lượng</th>
                                                <th>Quy cách</th>
                                                <th>Kích thước</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Decal giấy đế vàng</td>
                                                <td></td>
                                                <td></td>
                                                <td>320x430mm</td>
                                                <td className="action-buttons">
                                                    <button className=" icon edit-btn"><FiEdit /></button>
                                                    <button className=" icon delete-btn" ><FiTrash2 /></button>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>Decal nhựa trong</td>
                                                <td></td>
                                                <td></td>
                                                <td>330x480mm</td>
                                                <td className="action-buttons">
                                                    <button className=" icon edit-btn"><FiEdit /></button>
                                                    <button className=" icon delete-btn" ><FiTrash2 /></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Decal nhựa mờ</td>
                                                <td></td>
                                                <td></td>
                                                <td>330x480mm</td>
                                                <td className="action-buttons">
                                                    <button className=" icon edit-btn"><FiEdit /></button>
                                                    <button className=" icon delete-btn" ><FiTrash2 /></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Decal bể</td>
                                                <td></td>
                                                <td></td>
                                                <td>330x350mm</td>
                                                <td className="action-buttons">
                                                    <button className=" icon edit-btn"><FiEdit /></button>
                                                    <button className=" icon delete-btn" ><FiTrash2 /></button>
                                                </td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>

                                <button className="add-product-btn" onClick={() => setOpenPaperModal(true)}>
                                    <FaPlus /> Thêm loại giấy
                                </button>
                            </div>
                        }
                        {activeTab === "processing" &&
                            <div className="product-paper-list">
                                <div className="table">
                                    {/* <label htmlFor="">Cán màng</label> */}
                                    <table className="paper-list">
                                        <thead>
                                            <tr>
                                                <th>Tên gia công</th>
                                                <th>Loại gia công</th>
                                                <th>Quy cách</th>
                                                <th>Đơn giá</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Màng nhiệt bóng</td>
                                                <td>Cán màng</td>
                                                <td>Tờ</td>
                                                <td>1.000đ</td>
                                                <td className="action-buttons">
                                                    <button className=" icon edit-btn"><FiEdit /></button>
                                                    <button className=" icon delete-btn" ><FiTrash2 /></button>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>Màng nhiệt mờ</td>
                                                <td>Cán màng</td>
                                                <td>Tờ</td>
                                                <td>1.000đ</td>
                                                <td className="action-buttons">
                                                    <button className=" icon edit-btn"><FiEdit /></button>
                                                    <button className=" icon delete-btn" ><FiTrash2 /></button>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>Bế demi</td>
                                                <td>Bế</td>
                                                <td>Tờ</td>
                                                <td>1.000đ</td>
                                                <td className="action-buttons">
                                                    <button className=" icon edit-btn"><FiEdit /></button>
                                                    <button className=" icon delete-btn" ><FiTrash2 /></button>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>Ép kim</td>
                                                <td>Khác</td>
                                                <td>Tờ</td>
                                                <td>5.000đ</td>
                                                <td className="action-buttons">
                                                    <button className=" icon edit-btn"><FiEdit /></button>
                                                    <button className=" icon delete-btn" ><FiTrash2 /></button>
                                                </td>
                                            </tr>
                                        </tbody>

                                    </table>
                                    <button className="add-product-btn" onClick={() => setOpenProcessModal(true)}>
                                        <FaPlus /> Thêm gia công
                                    </button>
                                </div>
                            </div>
                        }
                        {activeTab === "customer" &&
                            <div className="product-paper-list">
                                <div className="customer-item">
                                    <label htmlFor="customer">Khách hàng thường (Giảm%):</label>
                                    <input type="text" id="customer" />
                                </div>
                                <div className="customer-item">
                                    <label htmlFor="customer">Khách hàng VIP (Giảm%)</label>
                                    <input type="text" id="customer" />
                                </div>
                                <div className="customer-item">
                                    <label htmlFor="customer">Đại lý (Giảm%)</label>
                                    <input type="text" id="customer" />
                                </div>
                            </div>
                        }
                    </div>

                    <SelectModal
                        open={openPaperModal}
                        setOpen={setOpenPaperModal}
                        data={paperMaster}
                        columns={paperColumns}
                        title="Chọn giấy"
                        onSubmit={handleAddPaper}
                    />

                    <SelectModal
                        open={openProcessModal}
                        setOpen={setOpenProcessModal}
                        data={processMaster}
                        columns={processColumns}
                        title="Chọn gia công"
                        onSubmit={handleAddProcess}
                    />

                </div>

            </div>
        </div>
    )
}

export default NewProduct; 