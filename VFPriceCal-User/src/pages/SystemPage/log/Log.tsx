
import "./log.scss"
// import { useNavigate } from "react-router-dom";
// import { FaPlus } from "react-icons/fa";
// // import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
// import { useState } from "react";

// import type { UserInfo } from "../../../context/AuthContext";




const Log = () => {

    // const [user] = useState<UserInfo | null>(() => {
    // const savedUser = localStorage.getItem("user");
    // if (savedUser) {
    //     try {
    //         return JSON.parse(savedUser);
    //     } catch (e) {
    //         return e;
    //     }
    // }
    //     return null;
    // });


    return (
        <div className="logs-page">
            <div className="logs-header">
                <h4>Danh sách Logs</h4>

                {/* <button className="add-logs-btn" >
                    <FaPlus />
                </button> */}
            </div>

            <div className="logs-info">
               
                {/* danh sách giấy/vật liệu sẽ hiển thị ở đây. Mỗi giấy/vật liệu sẽ có thông tin như tên, mã, mô tả. Bạn có thể nhấp vào một giấy/vật liệu để xem chi tiết hoặc chỉnh sửa thông tin của nó. */}
                <div className="logs-list">
                    <div className="logs-table-scroll">
                        <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Thời gian</th>
                                <th>Level</th>
                                <th>Action</th>
                                <th>User</th>
                                <th>Nội dung</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                    </div>
                    
                </div>
            </div>
         

        </div>
    );
}

export default Log;