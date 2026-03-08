import "./componentPaper.scss";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";


const ComponentPaper = () => {
    const navigate = useNavigate();

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
                                <th>Mã giấy/vật liệu</th>
                                <th>Mô tả</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* sản phẩm sẽ được hiển thị ở đây. Mỗi sản phẩm sẽ có thông tin như tên, mã sản phẩm, mô tả . Bạn có thể nhấp vào một sản phẩm để xem chi tiết hoặc chỉnh sửa thông tin của nó. */}

                            {/* giấy/vật liệu A */}
                            <tr>
                                <td>Giấy A</td>
                                <td>GC001</td>
                                <td>Mô tả giấy/vật liệu A </td>
                                <td className="action-buttons">
                                    <button className=" icon edit-btn"
                                        onClick={() => navigate("/component/papers/1")}>
                                        <FiEdit />
                                    </button>
                                    <button className=" icon delete-btn"><FiTrash2 /></button>
                                </td>

                            </tr>

                            {/* giấy/vật liệu B */}
                            <tr>
                                <td>Giấy B</td>
                                <td>GC002</td>
                                <td>Mô tả giấy/vật liệu B </td>
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

export default ComponentPaper;