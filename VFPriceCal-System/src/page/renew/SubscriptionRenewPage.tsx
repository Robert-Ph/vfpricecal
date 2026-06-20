import "./subscriptionRenewPage.scss";
import { useState } from "react";

const plans = [
  {
    id: 1,
    name: "Cơ bản",
    price: 199000,
    color: "blue",
    features: [
      "Quản lý đơn hàng",
      "Kho mẫu có sẵn",
      "Báo giá nhanh",
      "Hỗ trợ email",
      "1 tài khoản",
    ],
  },
  {
    id: 2,
    name: "Tiêu chuẩn",
    price: 399000,
    color: "purple",
    current: true,
    features: [
      "Quản lý đơn hàng",
      "Kho mẫu có sẵn",
      "Báo giá nhanh",
      "Hỗ trợ email",
      "1 tài khoản",
    ],
  },
  {
    id: 3,
    name: "Nâng cao",
    price: 699000,
    color: "green",
    features: [
      "Quản lý đơn hàng",
      "Kho mẫu có sẵn",
      "Báo giá nhanh",
      "Hỗ trợ email",
      "5 tài khoản",
    ],
  },
];

export default function SubscriptionRenewPage() {
  const [selectedPlan, setSelectedPlan] = useState(2);
  const [duration, setDuration] = useState(12);
  const [paymentMethod, setPaymentMethod] = useState("bank");

  return (
    <div className="renew-page">
      {/* Header */}

      <div className="page-header-renew">
        <h1>Đăng ký / Gia hạn gói dịch vụ</h1>
        {/* <p>
          Chọn gói dịch vụ phù hợp và thiết lập thời gian sử dụng cho khách hàng
        </p> */}
      </div>

      <div className="renew-layout">
        {/* LEFT */}

        <div className="main-content">
            <div className="top-section">
                          {/* Customer */}

          <div className="card">
            <div className="card-title">
              1. Thông tin khách hàng
            </div>

            <div className="customer-box">
              <div>
                <h3>Công ty TNHH ABC</h3>

                <div>Mã KH: KH000123</div>
                <div>MST: 0101234567</div>
                <div>Email: abc@company.com</div>
                <div>Điện thoại: 0901234567</div>
              </div>

              <div className="current-plan">
                <span>Gói hiện tại</span>
                <h4>Tiêu chuẩn</h4>

                <p>Hết hạn: 15/12/2025</p>
              </div>
            </div>
          </div>

          {/* Transaction */}

          <div className="card">
            <div className="card-title">
              2. Loại giao dịch
            </div>

            <div className="transaction-list">
              <label>
                <input type="radio" name="type" />
                Đăng ký mới
              </label>

              <label >
                <input type="radio" name="type" />
                Gia hạn
              </label>

              <label>
                <input type="radio" name="type" />
                Nâng cấp gói
              </label>

              <label>
                <input type="radio" name="type" />
                Hạ cấp gói
              </label>
            </div>
          </div>
            
        </div>


          {/* Plans */}

          <div className="card">
            <div className="card-title">
              3. Chọn gói dịch vụ
            </div>

            <div className="plans-grid">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`plan-card ${
                    selectedPlan === plan.id ? "selected" : ""
                  }`}
                >
                  <div className="plan-name">
                    {plan.name}
                  </div>

                  <div className={`price ${plan.color}`}>
                    {plan.price.toLocaleString()}đ
                  </div>

                  <ul>
                    {plan.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>

                  <button
                    onClick={() =>
                      setSelectedPlan(plan.id)
                    }
                  >
                    Chọn gói
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Duration */}

          <div className="card">
            <div className="card-title">
              4. Thời gian gia hạn
            </div>

            <div className="duration-grid">
              {[1, 3, 6, 12].map((item) => (
                <div
                  key={item}
                  className={`duration-card ${
                    duration === item
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setDuration(item)
                  }
                >
                  {item} tháng
                </div>
              ))}
            </div>
          </div>

          {/* Payment */}

          <div className="card">
            <div className="card-title">
              5. Hình thức thanh toán
            </div>

            <div className="payment-methods">
              <label>
                <input
                  type="radio"
                  checked={
                    paymentMethod === "bank"
                  }
                  onChange={() =>
                    setPaymentMethod("bank")
                  }
                />
                Chuyển khoản
              </label>

              <label>
                <input
                  type="radio"
                  checked={
                    paymentMethod === "cash"
                  }
                  onChange={() =>
                    setPaymentMethod("cash")
                  }
                />
                Tiền mặt
              </label>

              <label>
                <input
                  type="radio"
                  checked={
                    paymentMethod === "momo"
                  }
                  onChange={() =>
                    setPaymentMethod("momo")
                  }
                />
                MoMo
              </label>
            </div>
          </div>

          {/* Note */}

          <div className="card">
            <div className="card-title">
              6. Ghi chú
            </div>

            <textarea
              placeholder="Nhập ghi chú..."
            />
          </div>
        </div>

        {/* SIDEBAR */}

        <div className="summary-card">
          <h3>Thông tin đơn hàng</h3>

          <div className="row">
            <span>Khách hàng</span>
            <strong>
              Công ty TNHH ABC
            </strong>
          </div>

          <div className="row">
            <span>Loại giao dịch</span>
            <strong>Gia hạn</strong>
          </div>

          <div className="row">
            <span>Gói dịch vụ</span>
            <strong>Tiêu chuẩn</strong>
          </div>

          <hr />

          <div className="row">
            <span>Giá gói</span>
            <strong>4.308.000đ</strong>
          </div>

          <div className="row green">
            <span>Giảm giá</span>
            <strong>-430.800đ</strong>
          </div>

          <div className="row total">
            <span>Tổng thanh toán</span>
            <strong>4.264.920đ</strong>
          </div>

          <button className="btn-submit">
            Gia hạn gói dịch vụ
          </button>

          <button className="btn-cancel">
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  );
}