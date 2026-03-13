import "./printCost.scss";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";


const PrintCost = () =>{
     const navigate = useNavigate();

    return(
         <div className="print-cost-page">
                    <div className="print-cost-header">
                        <h3>Giá in</h3>
        
                        <button className="add-print-cost-btn" onClick={() => navigate(" ")}>
                            <FaPlus /> Thêm mới
                        </button>
                    </div>
        
                    <div className="print-cost-info">
                        {/* Tìm kiếm giấy/vật liệu theo tên, mã hoặc mô tả. Bạn cũng có thể lọc theo danh mục, giá cả hoặc nhà cung cấp. */}
                        <div className="print-cost-search">
                            <FiSearch className="search-icon" />
                            <input type="text" value="" placeholder="Tìm kiếm..." />
                            <button>Tìm kiếm</button>
                        </div>
        
        
                        {/* danh sách giấy/vật liệu sẽ hiển thị ở đây. Mỗi giấy/vật liệu sẽ có thông tin như tên, mã, mô tả. Bạn có thể nhấp vào một giấy/vật liệu để xem chi tiết hoặc chỉnh sửa thông tin của nó. */}
                        <div className="print-cost-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tên </th>
                                        <th>Mã </th>
                                        <th>Đơn vị tính</th>
                                        <th>Giá</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* sản phẩm sẽ được hiển thị ở đây. Mỗi sản phẩm sẽ có thông tin như tên, mã sản phẩm, mô tả . Bạn có thể nhấp vào một sản phẩm để xem chi tiết hoặc chỉnh sửa thông tin của nó. */}
        
                                    {/* giấy/vật liệu A */}
                                    <tr>
                                        <td>In 4 màu 1 mặt</td>
                                        <td>PC001</td>
                                        <td>Tờ</td>
                                        <td>2.000đ</td>
                                        <td className="action-buttons">
                                            <button className=" icon edit-btn"
                                                onClick={() => navigate("  ")}>
                                                <FiEdit />
                                            </button>
                                            <button className=" icon delete-btn"><FiTrash2 /></button>
                                        </td>
        
                                    </tr>
        
                                    {/* giấy/vật liệu B */}
                                    <tr>
                                        <td>In 4 màu 2 mặt</td>
                                        <td>PC002</td>
                                        <td>Tờ</td>
                                        <td>4.000đ </td>
                                        <td className="action-buttons">
                                            <button className=" icon edit-btn"><FiEdit /></button>
                                            <button className=" icon delete-btn" ><FiTrash2 /></button>
                                        </td>
        
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
    );
}

export default PrintCost;