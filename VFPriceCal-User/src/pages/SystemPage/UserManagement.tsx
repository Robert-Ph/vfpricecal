import "./userManagement.scss";
import { FaPlus } from "react-icons/fa";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {

    const navigate = useNavigate();
    return (
        <div className="user-page">
            <div className="user-header">
                <h3>Người dùng</h3>

                <button className="add-user-btn"> <FaPlus /> Thêm người dùng</button>
            </div>

            <div className="user-info">
                {/* Tìm kiếm người dùng theo tên, email hoặc vai trò. Bạn cũng có thể lọc người dùng theo trạng thái hoặc ngày tạo. */}
                <div className="user-search">
                    <FiSearch className="search-icon" />
                    <input type="text" value="" placeholder="Tìm kiếm..." />
                    <button>Tìm kiếm</button>
                </div>


                {/* danh sách người dùng sẽ hiển thị ở đây. Mỗi người dùng sẽ có thông tin như tên, email, vai trò. Bạn có thể nhấp vào một người dùng để xem chi tiết hoặc chỉnh sửa thông tin của nó. */}
                <div className="user-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Tên người dùng</th>
                                <th>Email</th>
                                <th>Vai trò</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* người dùng sẽ được hiển thị ở đây. Mỗi người dùng sẽ có thông tin như tên, email, vai trò. Bạn có thể nhấp vào một người dùng để xem chi tiết hoặc chỉnh sửa thông tin của nó. */}

                            {/* người dùng A */}
                            <tr>
                                <td>Người dùng A</td>
                                <td>userA@example.com</td>
                                <td>Admin</td>
                                <td className="action-buttons">
                                    <button className=" icon edit-btn"
                                        onClick={() => navigate("/user/1")}>
                                        <FiEdit />
                                    </button>
                                    <button className=" icon delete-btn"><FiTrash2 /></button>
                                </td>

                            </tr>

                            {/* người dùng B */}
                            <tr>
                                <td>Người dùng B</td>
                                <td>userB@example.com</td>
                                <td>User</td>
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
};

export default UserManagement;