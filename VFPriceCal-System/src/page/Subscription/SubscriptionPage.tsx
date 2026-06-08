import "./SubscriptionPage.scss";

const plans = [
  {
    title: "Cơ bản",
    price: "199.000đ",
    desc: "Phù hợp cho cá nhân, cửa hàng nhỏ",
    button: "Chọn gói",
    color: "blue",
  },
  {
    title: "Tiêu chuẩn",
    price: "399.000đ",
    desc: "Phù hợp cho doanh nghiệp vừa",
    button: "Chọn gói",
    popular: true,
    color: "purple",
  },
  {
    title: "Nâng cao",
    price: "699.000đ",
    desc: "Phù hợp cho doanh nghiệp lớn",
    button: "Chọn gói",
    color: "green",
  },
  {
    title: "Doanh nghiệp",
    price: "Liên hệ",
    desc: "Giải pháp toàn diện cho doanh nghiệp",
    button: "Liên hệ tư vấn",
    color: "violet",
  },
];

export default function SubscriptionPage() {
  return (
    <div className="subscription">
      <div className="top-header">
        <div>
          <h1>Đăng ký gói dịch vụ</h1>
          <p>Chọn gói phù hợp với nhu cầu doanh nghiệp của bạn</p>
        </div>

        <button className="guide-btn">
          Hướng dẫn
        </button>
      </div>

      <div className="stepper">
        <div className="step active">1 Chọn gói dịch vụ</div>
        <div className="step">2 Thông tin thanh toán</div>
        <div className="step">3 Xác nhận & Thanh toán</div>
        <div className="step">4 Hoàn tất</div>
      </div>

      <div className="main-grid">
        <div className="left-content">
          <div className="section-card">
            <div className="section-header">
              <h3>1. Chọn gói dịch vụ</h3>

              <div className="billing-switch">
                <span>Thanh toán theo:</span>

                <button className="active">
                  Tháng
                </button>

                <button>Năm</button>

                <span className="save">
                  Tiết kiệm 20%
                </span>
              </div>
            </div>

            <div className="plans-grid">
              {plans.map((plan) => (
                <div
                  key={plan.title}
                  className={`plan-card ${
                    plan.popular
                      ? "popular"
                      : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="popular-tag">
                      ⭐ Phổ biến nhất
                    </div>
                  )}

                  <div className="icon-circle">
                    🚀
                  </div>

                  <h4>{plan.title}</h4>

                  <p className="desc">
                    {plan.desc}
                  </p>

                  <div
                    className={`price ${plan.color}`}
                  >
                    {plan.price}
                    {plan.price !==
                      "Liên hệ" && (
                      <span>/tháng</span>
                    )}
                  </div>

                  <ul>
                    <li>
                      ✔ Quản lý đơn hàng
                    </li>
                    <li>
                      ✔ Kho mẫu có sẵn
                    </li>
                    <li>
                      ✔ Báo giá nhanh
                    </li>
                    <li>
                      ✔ Hỗ trợ email
                    </li>
                    <li>
                      ✔ 1 tài khoản
                    </li>
                  </ul>

                  <button
                    className={`choose-btn ${plan.color}`}
                  >
                    {plan.button}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="right-content">
          <div className="summary-card">
            <h3>Thông tin đơn hàng</h3>

            <div className="row">
              <span>Gói dịch vụ</span>
              <b>Tiêu chuẩn</b>
            </div>

            <div className="row">
              <span>Chu kỳ thanh toán</span>
              <b>Thanh toán theo tháng</b>
            </div>

            <div className="row">
              <span>Giá gói</span>
              <b>399.000đ</b>
            </div>

            <div className="row">
              <span>VAT (10%)</span>
              <b>39.900đ</b>
            </div>

            <hr />

            <div className="total">
              <span>Tổng thanh toán</span>
              <strong>438.900đ</strong>
            </div>
          </div>

          <div className="benefit-card">
            <h3>
              Quyền lợi khi đăng ký
            </h3>

            <ul>
              <li>
                Sử dụng đầy đủ tính năng
              </li>
              <li>
                Hỗ trợ kỹ thuật nhanh
                chóng
              </li>
              <li>
                Dữ liệu được bảo mật
              </li>
              <li>
                Khởi tạo nhanh trong 5
                phút
              </li>
              <li>
                Không cần cam kết dài
                hạn
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}