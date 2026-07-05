import "./CustomerProfile.scss";
import { useEffect, useState } from "react";
import type { UserInfo } from "../../context/AuthContext";
import type { companyInfo, updateCompany } from "../../model/model";
import { getByCompanyId, getUpdateCompany } from "../../service/CompanyService";
import { toast } from "react-toastify";

const CustomerProfile = () => {

    const [company, setCompany] = useState<companyInfo | null>(null);
    // const [updatedCompany, setUpdatedCompany] = useState<updateCompany| null>(null);


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

    const handleUpdateCompany = async () => {

      const updatedCompany: updateCompany | null = {
            id: company?.id || "",
            code: company?.code || "",
            name: company?.name || "",
            phone: company?.phone || "",
            address: company?.address || "",  
          taxCode: company?.taxCode || "",
          email: company?.email || "",
          statusId:  "",
          logoUrl: company?.logoUrl || "",
          createAt: company?.createAt || "",
          updateAt: company?.updateAt || ""
        };

        if (!updatedCompany || !user) {
            console.error("Company or user information is missing.");
            return;
        }
        try {
            const result = await getUpdateCompany(updatedCompany.id, {
                ...updatedCompany,
                id: updatedCompany.id
            });

            if (result.code === 200 || result.code === 201) {
                setCompany(result.data);
                toast.success("Cập nhật thông tin công ty thành công!");
            } else {
                toast.error("Cập nhật thông tin công ty thất bại!");
            }
            window.location.reload();
        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin công ty:", error);
        }
    };

//     const handleChange = <K extends keyof updateCompany>(
//     key: K,
//     value: updateCompany[K]
// ) => {
//     setUpdatedCompany(prev => {
//         if (!prev) return prev;

//         return {
//             ...prev,
//             [key]: value
//         };
//     });
// };


    useEffect(() => {
        const fetchCompanyInfo = async () => {
            try {
                const companyId = user?.companyId;
                if (companyId) {
                    const response = await getByCompanyId(companyId);
                    setCompany(response.data);

                  //   setUpdatedCompany({
                  //         id: response.data.id,
                  //         code: response.data.code,
                  //         name: response.data.name,
                  //         phone: response.data.phone,
                  //         address: response.data.address,
                  //         taxCode: response.data.taxCode,
                  //         email: response.data.email,
                  //         statusId: response.data.statusId,
                  //         logoUrl: "",
                  //         createAt: "",
                  //         updateAt: ""
                  // });
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
              value={company?.name ?? ""}
              onChange={(e) => setCompany((prev) => prev ? { ...prev, name: e.target.value } : prev)}
            />
          </div>

          <div className="form-group">
            <label>Tên viết tắt</label>
            <input
              type="text"
              value={company?.code || ""}
              onChange={(e) => setCompany((prev) => prev ? { ...prev, code: e.target.value } : prev)}
            />
          </div>

          <div className="form-group">
            <label>Mã số thuế *</label>
            <input
              type="text"
              value={company?.taxCode || "0123456789"}
              onChange={(e) => setCompany((prev) => prev ? { ...prev, taxCode: e.target.value } : prev)}
            />
          </div>

          <div className="form-group">
            <label>Số điện thoại *</label>
            <input
              type="text"
              value={company?.phone ?? ""}
              onChange={(e) => setCompany((prev) => prev ? { ...prev, phone: e.target.value } : prev)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={company?.email || ""}
              onChange={(e) => setCompany((prev) => prev ? { ...prev, email: e.target.value } : prev)}
            />
          </div>

          <div className="form-group full-width">
            <label>Địa chỉ</label>
            <input
              type="text"
              value={company?.address || ""}
              onChange={(e) => setCompany((prev) => prev ? { ...prev, address: e.target.value } : prev)}
            />
          </div>
        </div>

        <div className="actions">
          <button className="btn-primary" onClick={handleUpdateCompany}>
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;