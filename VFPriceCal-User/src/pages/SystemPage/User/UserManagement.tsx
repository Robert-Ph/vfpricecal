import "./userManagement.scss";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import UserModal from "../../../components/UserModal";
import type { account } from "../../../model/model";
import type { UserInfo } from "../../../context/AuthContext";
import { getAllAccountByCompany } from "../../../service/AccountService";
import NotificationModal from "../../../components/notification/Notification";

const UserManagement = () => {

    const navigate = useNavigate();
    const [openUserModal, setOpenUserModal] = useState(false);
    const [openNotificationModal, setOpenNotificationModal] = useState(false);
    const [accountList, setAccountList] = useState<account[]>([]);

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

    useEffect (() => {
        const fetchAccountList = async () => {
                    try {
                        const data = await getAllAccountByCompany(user?.companyId ?? ""); // Sử dụng companyId từ context
                        setAccountList(data.data);
                    } catch (error) {
                        console.error("Lỗi khi lấy danh sách giấy/vật liệu:", error);
                    }
                };
                fetchAccountList();
    },[user?.companyId])


    const handleNewUser = () => {

        if (user?.maxUsers === accountList.length) {
            setOpenNotificationModal(true);
            return;
        }
        setOpenUserModal(true);
    }


    return (
        <div className="user-page">
            <div className="user-header">
                <h3>Người dùng</h3>

                <button className="add-user-btn" onClick={() => handleNewUser()}> <FaPlus /> Thêm người dùng</button>
            </div>

            <div className="user-info">
                {/* Tìm kiếm người dùng theo tên, email hoặc vai trò. Bạn cũng có thể lọc người dùng theo trạng thái hoặc ngày tạo. */}
                <div className="user-search">
                    <FiSearch className="search-icon" />
                    <input type="text" value="" placeholder="Tìm kiếm..." />
                    <button >Tìm kiếm</button>
                </div>


                {/* danh sách người dùng sẽ hiển thị ở đây. Mỗi người dùng sẽ có thông tin như tên, email, vai trò. Bạn có thể nhấp vào một người dùng để xem chi tiết hoặc chỉnh sửa thông tin của nó. */}
                <div className="user-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Tên người dùng</th>
                                <th>Email</th>
                                <th>Vai trò</th>
                                <th>Trạng thái</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* người dùng sẽ được hiển thị ở đây. Mỗi người dùng sẽ có thông tin như tên, email, vai trò. Bạn có thể nhấp vào một người dùng để xem chi tiết hoặc chỉnh sửa thông tin của nó. */}

                            {accountList.map((item) => (
                                <tr>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.code}</td>
                                <td>{item.status}</td>

                                {item.code !== "OWNER" ? (
                                    <td className="action-buttons">
                                    <button className=" icon edit-btn"
                                        onClick={() => navigate("/user/1")}>
                                        <FiEdit />
                                    </button>
                                    <button className=" icon delete-btn"><FiTrash2 /></button>
                                </td>
                                ) : (
                                null
                                )}
                                

                            </tr>
                            ))
                            }
                    
                        </tbody>
                    </table>
                </div>
            </div>

<UserModal
   open={openUserModal}
   setOpen={setOpenUserModal}
/>

<NotificationModal
                open={openNotificationModal}
                planMess="Bạn đã đạt đến số lượng người dùng tối đa cho gói hiện tại. Vui lòng nâng cấp gói để thêm người dùng mới."
                onClose={() => setOpenNotificationModal(false)}
            />

        </div>
    );
};

export default UserManagement;