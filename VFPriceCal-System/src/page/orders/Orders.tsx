import { useEffect, useState } from "react";
import "./orders.scss";
import type { orders } from "../../config/ModelConfig";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../ultils/formatters";
import { getAllOrders } from "../../service/OrdersService";

const Orders = () => {
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState<orders[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const list = await getAllOrders();
            setOrderList(list.data);
            
        }

        void fetchData();
    },[])


    return (
        <div className="user-management">

            {/* HEADER */}
            <div className="top-header">

                <div>
                    <h1>Quản lý đơn hàng</h1>
                    <p>Quản lý thông tin đơn hàng</p>
                </div>

                {/* <button className="add-btn" onClick={() => {
                    window.location.href = "/plans/create";
                }}>
                    + Thêm gói
                </button> */}

            </div>

            {/* FILTER */}
            <div className="filter-section">

                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search company..."
                    />
                </div>

                <select>
                    <option>All Versions</option>
                    <option>Basic</option>
                    <option>Pro</option>
                    <option>Enterprise</option>
                </select>

                <select>
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Expired</option>
                </select>

                <button className="export-btn">
                    Export
                </button>

            </div>

            {/* TABLE */}
            <div className="table-container">

                <div className="table-header">
                    <div>#</div>
                    <div>Tên khách hàng</div>
                    <div>Ngày tạo</div>
                    <div>Gói dịch vụ</div>
                    <div>Đơn giá</div>
                    <div>Trạng thái thanh toán</div>
                    <div>Action</div>
                </div>

                {orderList?.map((item: orders, index: number) => (
                    <div className="table-row">

                    <div>{index + 1}</div>

                    <div className="plans-info">

                        <div className="plans-logo blue">
                            {item.companyCode.substring(0,2)}
                        </div>

                        <div>
                            <h4>{item.companyName}</h4>
                            <p>{item.companyCode}</p>
                        </div>

                    </div>

                    <div>{item.createAt ? format(new Date(item.createAt), 'dd/MM/yyyy') : '---'}</div>

                    <div className="expire warning">
                        {item.plansName ?? '---'}
                    </div>

                    <div>
                        <span className="expire warning-price">
                            {formatCurrency(item.totalAmount, {locale: "vi-VN", currency: "VND"}) }
                        </span>
                    </div>
{/* 
                    <div>
                        <span className="expire warning-price">
                            Gói phổ thông
                        </span>
                    </div> */}
                     <div>
                        <span  className={`status ${item.pay ? "true" : "false"}`}>
                            {item.pay ? "Đã thanh toán": "Chưa thanh toán"}
                        </span>
                    </div>

                    {/* <div>
                        <span  className={`status ${
                                item.statusId === "ACTIVE"
                                    ? "active"
                                : item.statusId === "EXPIRED"
                                    ? "expired"
                                : item.statusId === "SUSPENDED"
                                    ? "suspended"
                                : item.statusId === "CANCELLED"
                                    ? "cancelled"
                                : ""
                         }`}>
                            ● {item.statusId}
                        </span>
                    </div> */}

                    <div className="actions">
                        <button onClick={() => navigate(``)}>✏️</button>
                    </div>

                </div>
                ))
                    
                }

           

            </div>

        </div>
    );
};

export default Orders;
