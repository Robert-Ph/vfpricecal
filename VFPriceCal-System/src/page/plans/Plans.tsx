import { useEffect, useState } from "react";
import "./plans.scss";
import type { plans } from "../../config/ModelConfig";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { getAllPlans } from "../../service/PlansService";
import { formatCurrency } from "../../ultils/formatters";

const Plans = () => {
    const navigate = useNavigate();
    const [plansList, setPlansList] = useState<plans[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const list = await getAllPlans();
            setPlansList(list.data);
        }

        void fetchData();
    },[])


    return (
        <div className="user-management">

            {/* HEADER */}
            <div className="top-header">

                <div>
                    <h1>Quản lý gói dịch vụ</h1>
                    <p>Quản lý thông tin gói dịch vụ</p>
                </div>

                <button className="add-btn" onClick={() => {
                    window.location.href = "/plans/create";
                }}>
                    + Thêm gói
                </button>

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
                    <div>Tên gói</div>
                    <div>Ngày tạo</div>
                    <div>Thời hạn(ngày)</div>
                    <div>Giá gói</div>
                    <div>Trạng thái</div>
                    <div>Action</div>
                </div>

                {plansList?.map((item: plans, index: number) => (
                    <div className="table-row">

                    <div>{index + 1}</div>

                    <div className="plans-info">

                        <div className="plans-logo blue">
                            {item.code.substring(0,2)}
                        </div>

                        <div>
                            <h4>{item.name}</h4>
                            <p>{item.code}</p>
                        </div>

                    </div>

                    <div>{item.createAt ? format(new Date(item.createAt), 'dd/MM/yyyy') : '---'}</div>

                    <div className="expire warning">
                        {item.durationInDays ?? '---'}
                    </div>

                    <div>
                        <span className="expire warning-price">
                            {formatCurrency(item.price, {locale: "vi-VN", currency: "VND"}) }
                        </span>
                    </div>
{/* 
                    <div>
                        <span className="expire warning-price">
                            Gói phổ thông
                        </span>
                    </div> */}
                     <div>
                        <span  className={`status active`}>
                           ACTIVE
                            {/* {item.statusId} */}
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
                        <button onClick={() => navigate(`/plans/${item.id}`)}>✏️</button>
                        <button>🗑️</button>
                    </div>

                </div>
                ))
                    
                }

           

            </div>

        </div>
    );
};

export default Plans;
