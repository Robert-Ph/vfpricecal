import { useEffect, useState } from "react";
import "./userManagement.scss";
import type { Companies } from "../../config/ModelConfig";
import { getCompanies } from "../../service/CompaniesService";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
    const navigate = useNavigate();
    const [companiesList, setCompaniesList] = useState<Companies[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const list = await getCompanies();
            setCompaniesList(list.data);
        }

        void fetchData();
    },[])


    return (
        <div className="user-management">

            {/* HEADER */}
            <div className="top-header">

                <div>
                    <h1>Quản lý doanh nghiệp</h1>
                    <p>Quản lý thông tin doanh nghiệp và quyền truy cập</p>
                </div>

                <button className="add-btn" onClick={() => {
                    window.location.href = "/company-management/add";
                }}>
                    + Đăng ký
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
                    <div>Company Name</div>
                    <div>Created Date</div>
                    <div>Expire Date</div>
                    <div>Version</div>
                    <div>Status</div>
                    <div>Action</div>
                </div>

                {companiesList?.map((item: Companies, index: number) => (
                    <div className="table-row">

                    <div>{index + 1}</div>

                    <div className="company-info">

                        <div className="company-logo blue">
                            {item.code.substring(0,2)}
                        </div>

                        <div>
                            <h4>{item.name}</h4>
                            <p>{item.code}</p>
                        </div>

                    </div>

                    <div>{item.createAt ? format(new Date(item.createAt), 'dd/MM/yyyy') : '---'}</div>

                    <div className="expire warning">
                        {item.endTime ? format(new Date(item.endTime), 'dd/MM/yyyy') : '---'}
                    </div>

                    <div>
                        <span className="badge pro">
                            {item.plan}
                        </span>
                    </div>

                    <div>
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
                    </div>

                    <div className="actions">
                        <button onClick={() => navigate(`/company-management/${item.id}`)}>✏️</button>
                        <button>🗑️</button>
                    </div>

                </div>
                ))
                    
                }

           

            </div>

        </div>
    );
};

export default UserManagement;