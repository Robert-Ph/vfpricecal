import "./PaymentPage.scss";
import { useState, useEffect } from "react";
import {
  FaUniversity,
  FaMoneyBillWave,
  FaCreditCard,
//   FaShieldAlt,
//   FaArrowLeft,
//   FaGift,
//   FaHeadset,
//   FaRedo
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import type { Companies, CompaniesRegistration, plans, plansRegistration} from "../../config/ModelConfig";
import { getCompanyRegistrationById } from "../../service/CompanyRegistrationsService";
import { getCompaniesById } from "../../service/CompaniesService";
import { getPlanRegistrationById } from "../../service/PlanRegistrationService";
import { getPlansById } from "../../service/PlansService";

const paymentMethods = [
  {
    id: "bank",
    title: "Chuyển khoản ngân hàng",
    desc: "Thanh toán qua tài khoản ngân hàng của chúng tôi",
    icon: <FaUniversity />,
    badge: "Được khuyến nghị"
  },
  {
    id: "momo",
    title: "Ví MoMo",
    desc: "Thanh toán nhanh chóng qua ví MoMo",
    icon: "💗"
  },
  {
    id: "card",
    title: "Thẻ tín dụng / ghi nợ",
    desc: "Visa, Mastercard, JCB, Napas",
    icon: <FaCreditCard />
  },
  {
    id: "cash",
    title: "Thanh toán tiền mặt",
    desc: "Thanh toán trực tiếp tại văn phòng",
    icon: <FaMoneyBillWave />,
    badge: "Tại văn phòng"
  }
];

export default function PaymentPage() {
    const [method, setMethod] = useState("bank");
    const {type ,id} = useParams();
    const [companies, setCompanies] = useState<Companies | null>(null);
    const [companiesNew, setCompaniesNew] = useState<CompaniesRegistration | null>(null);
    const [plan, setPlan] = useState<plansRegistration | null>(null);
    const [planSelect, setPlanSelect] = useState<plans | null>(null);
//   const [agree, setAgree] = useState(true);

  useEffect (() => {
    const  fetchData = async () => {
        
      const planResponse = await getPlanRegistrationById(id ?? "");
      setPlan(planResponse.data);

       const companyResId = planResponse.data.companyResId;
       const planId = planResponse.data.planID;

      if(type === "new"){
        const response = await getCompanyRegistrationById(companyResId ?? "");
        setCompaniesNew(response.data);
      }else{
        const response = await getCompaniesById(companyResId ?? "");
        setCompanies(response.data);
      }

      const planGet = await getPlansById(planId);
      setPlanSelect(planGet.data);

        
    }
    void fetchData();
  },[id])

  return (
    <div className="payment-page">

      {/* HEADER */}

      <div className="page-top">

        <div>
          <div className="breadcrumb">
            Trang chủ / Giao dịch / Thanh toán
          </div>

          <h1>Thanh toán</h1>

          <p>
            Vui lòng kiểm tra thông tin đơn hàng và chọn phương thức thanh toán
          </p>
        </div>

        {/* <button className="back-btn">
          <FaArrowLeft />
          Quay lại
        </button> */}

      </div>

      <div className="payment-layout">

        {/* LEFT */}

        <div className="payment-main">

          {/* SECURITY */}

          {/* <div className="security-banner">
            <FaShieldAlt />

            <div>
              <strong>Thanh toán an toàn & bảo mật</strong>
              <p>
                Thông tin thanh toán của bạn được mã hóa và bảo vệ tuyệt đối.
              </p>
            </div>
          </div> */}

          {/* ORDER */}

          <div className="card">
            <h3>1. Thông tin đơn hàng</h3>

            <div className="order-info">

              <div className="order-details">

                <div className="row">
                  <span>Khách hàng</span>
                  <strong>{companiesNew?.fullName || companies?.name}</strong>
                </div>

                <div className="row">
                  <span>Loại giao dịch</span>
                  <strong className="badge">
                    {type}
                  </strong>
                </div>

                <div className="row">
                  <span>Gói dịch vụ</span>
                  <strong>{planSelect?.code}</strong>
                </div>

                <div className="row">
                  <span>Thời gian</span>
                  <strong>{plan?.month} tháng</strong>
                </div>

                <div className="row">
                  <span>Ngày hết hạn mới</span>
                  <strong className="green">
                    15/12/2026
                  </strong>
                </div>

              </div>

              {/* <div className="illustration">
                📄
              </div> */}

            </div>
          </div>

          {/* PAYMENT METHOD */}

          <div className="card">

            <h3>2. Chọn phương thức thanh toán</h3>

            <div className="method-list">

              {paymentMethods.map(item => (
                <div
                  key={item.id}
                  className={`method-item ${
                    method === item.id
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setMethod(item.id)
                  }
                >
                  <input
                    type="radio"
                    checked={method === item.id}
                    readOnly
                  />

                  <div className="method-icon">
                    {item.icon}
                  </div>

                  <div className="method-content">
                    <strong>
                      {item.title}
                    </strong>

                    <span>
                      {item.desc}
                    </span>
                  </div>

                  {item.badge && (
                    <div className="small-badge">
                      {item.badge}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

          {/* NOTE */}

          <div className="card">

            <h3>3. Ghi chú (tùy chọn)</h3>

            <textarea
              placeholder="Nhập ghi chú hoặc yêu cầu đặc biệt..."
            />

          </div>

        </div>

        {/* SIDEBAR */}

        <div className="payment-sidebar">

          <div className="summary-card">

            <h3>Thông tin thanh toán</h3>

            <div className="summary-row">
              <span>Giá gói ({plan?.month} tháng)</span>
              <strong>4.308.000đ</strong>
            </div>

            <div className="summary-row green">
              <span>Giảm giá (10%)</span>
              <strong>-430.800đ</strong>
            </div>

            <div className="summary-row">
              <span>VAT (10%)</span>
              <strong>387.720đ</strong>
            </div>

            <hr />

            <div className="summary-row total">
              <span>Tổng thanh toán</span>
              <strong>4.264.920đ</strong>
            </div>

            {/* <div className="saving-box">
              <FaGift />
              Bạn đã tiết kiệm 430.800đ
            </div> */}

            <button className="pay-btn">
              Tạo hoá đơn
            </button>

            {/* <label className="agree-box">
              <input
                type="checkbox"
                checked={agree}
                onChange={() =>
                  setAgree(!agree)
                }
              />

              Tôi đồng ý với điều khoản sử dụng
            </label> */}

          </div>

          {/* <div className="guarantee-card">

            <h3>Cam kết của chúng tôi</h3>

            <div className="guarantee-item">
              <FaShieldAlt />
              <div>
                <strong>Bảo mật tuyệt đối</strong>
                <p>Mã hóa SSL 256-bit</p>
              </div>
            </div>

            <div className="guarantee-item">
              <FaRedo />
              <div>
                <strong>Hoàn tiền 100%</strong>
                <p>Trong 7 ngày nếu không hài lòng</p>
              </div>
            </div>

            <div className="guarantee-item">
              <FaHeadset />
              <div>
                <strong>Hỗ trợ 24/7</strong>
                <p>Đội ngũ luôn sẵn sàng hỗ trợ</p>
              </div>
            </div>

          </div> */}

        </div>

      </div>

    </div>
  );
}