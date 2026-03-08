import "./processing.scss";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";

const Processing = () => {
    const navigate = useNavigate();

    return (
        <div className="processing-page">
            <div className="processing-header">
                <h3>Gia công</h3>

                <button className="add-processing-btn"> <FaPlus /> Thêm gia công</button>
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
                                <th>Tên gia công</th>
                                <th>Mã gia công</th>
                                <th>Mô tả</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* sản phẩm sẽ được hiển thị ở đây. Mỗi sản phẩm sẽ có thông tin như tên, mã sản phẩm, mô tả . Bạn có thể nhấp vào một sản phẩm để xem chi tiết hoặc chỉnh sửa thông tin của nó. */}

                            {/* gia công A */}
                            <tr>
                                <td>Cán màng</td>
                                <td>GC001</td>
                                <td>Mô tả gia công A </td>
                                <td className="action-buttons">
                                    <button className=" icon edit-btn"
                                        onClick={() => navigate("/component/processing/1")}>
                                        <FiEdit />
                                    </button>
                                    <button className=" icon delete-btn"><FiTrash2 /></button>
                                </td>

                            </tr>

                            {/* gia công B */}
                            <tr>
                                <td>Gia công B</td>
                                <td>GC002</td>
                                <td>Mô tả gia công B </td>
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

export default Processing;