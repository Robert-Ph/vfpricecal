import "./CustomerProfile.scss";
import { useEffect, useState } from "react";
import type { UserInfo } from "../../context/AuthContext";
import type { companyInfo } from "../../model/model";
import { getByCompanyId } from "../../service/CompanyService";

const CustomerProfile = () => {

    const [company, setCompany] = useState<companyInfo | null>(null);

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


    useEffect(() => {
        const fetchCompanyInfo = async () => {
            try {
                const companyId = user?.companyId;
                if (companyId) {
                    const response = await getByCompanyId(companyId);
                    setCompany(response.data);
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin công ty:", error);
            }
        };

        fetchCompanyInfo();
    }, [user?.companyId]);


  return (
    <div className="customer-profile">
      <div className="page-header">
        <h2>Thông tin tài khoản</h2>
        <p>
          Thông tin này sẽ được sử dụng trên báo giá, hóa đơn và các giao dịch
          của bạn.
        </p>
      </div>

      <div className="profile-card">
        <h3>Thông tin cơ bản</h3>

        <div className="form-grid">
          <div className="form-group">
            <label>Tên doanh nghiệp *</label>
            <input
              type="text"
              defaultValue={company?.name || ""}
            />
          </div>

          <div className="form-group">
            <label>Tên viết tắt</label>
            <input
              type="text"
              defaultValue={company?.code || ""}
            />
          </div>

          <div className="form-group">
            <label>Mã số thuế *</label>
            <input
              type="text"
              defaultValue={company?.taxCode || "0123456789"}
            />
          </div>

          <div className="form-group">
            <label>Số điện thoại *</label>
            <input
              type="text"
              defaultValue={company?.phone || ""}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              defaultValue={company?.email || ""}
            />
          </div>

          <div className="form-group full-width">
            <label>Địa chỉ</label>
            <input
              type="text"
              defaultValue={company?.address || ""}
            />
          </div>
        </div>

        <div className="actions">
          <button className="btn-primary">
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;