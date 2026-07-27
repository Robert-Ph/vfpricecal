// import "./ProductDetail.scss";
// import { useState } from "react";
// import {
//   FiArrowLeft,
//   FiPackage,
//   FiTag,
//   FiFileText,
//   FiActivity,
//   FiPieChart,
// //   FiEdit2,
//   FiTrash2,
//   FiPlusCircle,
//   FiSave,
//   FiSettings,
//   FiUsers,
//   FiLayers,
//   FiChevronDown,
// } from "react-icons/fi";

// const paperData = [
//   {
//     id: 1,
//     name: "Decal giấy đế vàng",
//     weight: "Decal",
//     spec: "Giấy decal mặt vàng, đế giấy",
//     size: "320x430mm",
//   },
//   {
//     id: 2,
//     name: "Decal nhựa trong",
//     weight: "Decal",
//     spec: "Nhựa trong suốt",
//     size: "330x480mm",
//   }
// ];

// const processData = [
//   {
//     id: 1,
//     name: "Cán bóng",
//     type: "Gia công bề mặt",
//     unit: "m²",
//   },
//   {
//     id: 2,
//     name: "Cán mờ",
//     type: "Gia công bề mặt",
//     unit: "m²",
//   },
//   {
//     id: 3,
//     name: "Bế demi",
//     type: "Gia công cắt",
//     unit: "Lần",
//   },
//   {
//     id: 4,
//     name: "Ép kim vàng",
//     type: "Gia công đặc biệt",
//     unit: "cm²",
//   },
//   {
//     id: 5,
//     name: "Dập nổi",
//     type: "Gia công đặc biệt",
//     unit: "cm²",
//   }
// ];

// export default function ProductDetail() {
//     const [activeTab, setActiveTab] = useState<"paper" | "process">("paper");
//   return (
//     <div className="product-detail">
//       <div className="page-title">
//         <button className="back-btn">
//           <FiArrowLeft />
//         </button>

//         <h1>Sản phẩm / Sản phẩm A</h1>
//       </div>

//       <div className="detail-layout">
//         <div className="left-card">
//           <div className="form-item">
//             <div className="icon-box">
//               <FiPackage />
//             </div>

//             <div className="field">
//               <label>Tên sản phẩm</label>
//               <input value="Sản phẩm A" readOnly />
//             </div>
//           </div>

//           <div className="form-item">
//             <div className="icon-box">
//               <FiTag />
//             </div>

//             <div className="field">
//               <label>Mã sản phẩm</label>
//               <input value="SP001" readOnly />
//             </div>
//           </div>

//           <div className="form-item">
//             <div className="icon-box">
//               <FiFileText />
//             </div>

//             <div className="field">
//               <label>Mô tả</label>
//               <textarea value="Mô tả sản phẩm A" readOnly />
//             </div>
//           </div>

//           <div className="form-item">
//             <div className="icon-box">
//               <FiPieChart />
//             </div>

//             <div className="field">
//               <label>Biên lợi nhuận</label>
//               <input value="150%" readOnly />
//             </div>
//           </div>

//         <div className="form-item">
//             <div className="icon-box">
//               <FiUsers />
//             </div>

//             <div className="field">
//               <label>Chiếc khấu khách hàng</label>
//               <input value="150%" readOnly />
//             </div>
//           </div>

//           <div className="form-item">
//             <div className="icon-box">
//               <FiActivity />
//             </div>

//             <div className="field">
//               <label>Trạng thái</label>

//               <div className="status-select">
//                 <span className="dot"></span>
//                 Đang hoạt động
//                 <FiChevronDown />
//               </div>
//             </div>
//           </div>

//           <div className="bottom-actions-detail">
//             <button className="save-btn">
//               <FiSave />
//               Lưu
//             </button>

//             <button className="can-btn">
//               <FiTrash2 />
//               Hủy
//             </button>
//           </div>
//         </div>

//         <div className="right-card">
//           <div className="tabs">
//             <button className={activeTab === "paper" ? "active" : ""} onClick={() => setActiveTab("paper")}>
//               <FiLayers />
//               Giấy
//             </button>

//             <button className={activeTab === "process" ? "active" : ""} onClick={() => setActiveTab("process")}>
//               <FiSettings />
//               Gia công
//             </button>
//           </div>

//             {activeTab === "paper" && (
//                           <div className="table-wrapper">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Tên loại giấy</th>
//                   <th>Định lượng</th>
//                   <th>Quy cách</th>
//                   <th>Kích thước</th>
//                   <th>Thao tác</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {paperData.map((item) => (
//                   <tr key={item.id}>
//                     <td>{item.name}</td>
//                     <td>{item.weight}</td>
//                     <td>{item.spec}</td>
//                     <td>{item.size}</td>

//                     <td>
//                       <div className="action-group">
//                         {/* <button className="edit-btn">
//                           <FiEdit2 />
//                         </button> */}

//                         <button className="delete-btn">
//                           <FiTrash2 />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
            

//             <div className="add-paper">
//               <FiPlusCircle />
//               <span>Thêm loại giấy</span>
//             </div>
//           </div>
//             )}


//             {activeTab === "process" && (
//     <>
//       <table>
//         <thead>
//           <tr>
//             <th>Tên gia công</th>
//             <th>Loại</th>
//             <th>Đơn vị</th>
//             <th>Thao tác</th>
//           </tr>
//         </thead>

//         <tbody>
//           {processData.map((item) => (
//             <tr key={item.id}>
//               <td>{item.name}</td>
//               <td>{item.type}</td>
//               <td>{item.unit}</td>

//               <td>
//                 <div className="action-group">
//                   {/* <button className="edit-btn">
//                     <FiEdit2 />
//                   </button> */}

//                   <button className="delete-btn">
//                     <FiTrash2 />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="add-paper">
//         <FiPlusCircle />
//         <span>Thêm gia công</span>
//       </div>
//     </>
//   )}


//         </div>
//       </div>
//     </div>
//   );
// }