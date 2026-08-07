
import { useEffect, useState } from "react";
import AddConfigModal from "../../modal/AddConfigModal";
import "./systemConfig.scss";
import {
  Search,
  Plus,
  RefreshCw,
  Pencil,
  Trash2,
} from "lucide-react";
import type { SystemConfigResponse } from "../../config/ModelConfig";
import { getAllSystemConfig } from "../../service/SystemConfigService";

// const data = [
//   {
//     key: "SYSTEM_STAGE",
//     value: "BETA",
//     type: "ENUM",
//     group: "SYSTEM",
//     description: "Giai đoạn hoạt động của hệ thống",
//     enable: true,
//     order: 1,
//   },
//   {
//     key: "REGISTRATION_ENABLE",
//     value: "true",
//     type: "BOOLEAN",
//     group: "REGISTRATION",
//     description: "Cho phép đăng ký tài khoản mới",
//     enable: true,
//     order: 2,
//   },
//   {
//     key: "DEFAULT_PLAN",
//     value: "BETA",
//     type: "ENUM",
//     group: "SUBSCRIPTION",
//     description: "Gói mặc định khi đăng ký",
//     enable: true,
//     order: 3,
//   },
//   {
//     key: "PAYMENT_ENABLE",
//     value: "false",
//     type: "BOOLEAN",
//     group: "PAYMENT",
//     description: "Bật/Tắt thanh toán",
//     enable: false,
//     order: 4,
//   },
//   {
//     key: "TRIAL_DAY",
//     value: "30",
//     type: "INTEGER",
//     group: "SUBSCRIPTION",
//     description: "Số ngày dùng thử",
//     enable: true,
//     order: 5,
//   },
//   {
//     key: "MAINTENANCE_ENABLE",
//     value: "false",
//     type: "BOOLEAN",
//     group: "MAINTENANCE",
//     description: "Bật/Tắt bảo trì",
//     enable: false,
//     order: 6,
//   },
//   {
//     key: "MAINTENANCE_MESSAGE",
//     value: "Hệ thống đang bảo trì",
//     type: "STRING",
//     group: "MAINTENANCE",
//     description: "Thông báo bảo trì",
//     enable: true,
//     order: 7,
//   },
//   {
//     key: "FEATURE_AI",
//     value: "false",
//     type: "BOOLEAN",
//     group: "FEATURE",
//     description: "Bật AI",
//     enable: false,
//     order: 8,
//   },
// ];

const badgeClass = (value: string) => {
  switch (value) {
    case "BOOLEAN":
      return "green";
    case "ENUM":
      return "blue";
    case "INTEGER":
      return "orange";
    case "STRING":
      return "gray";
    default:
      return "purple";
  }
};

export default function SystemConfig() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [configData, setConfigData] = useState<SystemConfigResponse[]>([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        const fetchConfigData = async () => {
            try {
                const response = await getAllSystemConfig();
                setConfigData(response.data);
            } catch (error) {
                console.error("Error fetching system config data:", error);
            }
        };

        fetchConfigData();
    }, []);

  return (
    <div className="system-page">
      {/* Topbar */}

      {/* <div className="topbar">
        <div></div>

        <div className="top-right">
          <button className="icon-btn">
            <Search size={18} />
          </button>

          <button className="icon-btn">
            <Bell size={18} />
            <span className="dot">3</span>
          </button>

          <div className="user">
            <img
              src="https://i.pravatar.cc/100"
              alt=""
            />

            <div>
              <h4>Nguyễn Văn A</h4>
              <p>Super Admin</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Title */}

      {/* <div className="title">
        <h1>System Config</h1>

        <span>Trang chủ / System Config</span>
      </div> */}

      {/* Card */}

      <div className="card">
        <div className="card-header">
          <div>
            <h2>Cấu hình hệ thống</h2>

            <p>Quản lý các cấu hình chung của hệ thống</p>
          </div>

          <div className="actions-system-config">
            <button className="outline-system-config" onClick={openModal}>
              <Plus size={18} />
              Thêm cấu hình
            </button>

            <button className="primary-system-config">
              <RefreshCw size={18} />
              Làm mới
            </button>
          </div>
        </div>

        {/* Filter */}

        <div className="filter">
          <select>
            <option>Tất cả nhóm</option>
          </select>

          <select>
            <option>Tất cả kiểu</option>
          </select>

          <select>
            <option>Tất cả trạng thái</option>
          </select>

          <div className="search">
            <Search size={18} />
            <input placeholder="Tìm kiếm..." />
          </div>
        </div>

        {/* Table */}

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>CONFIG KEY</th>
              <th>GIÁ TRỊ</th>
              <th>KIỂU</th>
              <th>NHÓM</th>
              <th>MÔ TẢ</th>
              <th>EDIT</th>
              {/* <th>THỨ TỰ</th> */}
              <th>CẬP NHẬT</th>
              <th>THAO TÁC</th>
            </tr>
          </thead>

          <tbody>
            {configData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>{item.configKey}</td>

                <td>
                  <span className="badge purple">{item.configValue}</span>
                </td>

                <td>
                  <span className={`badge ${badgeClass(item.configType)}`}>
                    {item.configType}
                  </span>
                </td>

                <td>
                  <span className="badge blue">{item.groupCode}</span>
                </td>

                <td>{item.description}</td>

                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      defaultChecked={item.isActive}
                    />
                    <span></span>
                  </label>
                </td>

                {/* <td>{item.order}</td> */}

                <td>
                  {item.updatedBy}
                  <br />
                  {item.updateAt}
                </td>

                <td className="action">
                  <button>
                    <Pencil size={17} />
                  </button>

                  <button className="delete">
                    <Trash2 size={17} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}

        <div className="pagination">
          <div>Hiển thị {configData.length}</div>

          {/* <div className="pages">
            <button>{"<"}</button>

            <button className="active">1</button>

            <button>2</button>

            <button>3</button>

            <button>{">"}</button>
          </div> */}
        </div>
      </div>

      <AddConfigModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}