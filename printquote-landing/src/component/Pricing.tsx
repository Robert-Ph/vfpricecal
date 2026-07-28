import "./pricing.scss";

const plans = [
  {
    name: "Free",
    price: "0",
    features: [
      "10 báo giá/tháng",
      "Xuất PDF",
      "1 người dùng",
    ],
  },
  {
    name: "Basic",
    price: "199",
    popular: true,
    features: [
      "Không giới hạn báo giá",
      "Quản lý khách hàng",
      "Thống kê",
      "Xuất PDF",
    ],
  },
  {
    name: "Business",
    price: "499",
    features: [
      "Tất cả tính năng",
      "Nhiều nhân viên",
      "API",
      "Backup dữ liệu",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="pricing">

      <div className="container">

        <h2>Bảng giá</h2>

        <div className="cards">

          {plans.map((item) => (

            <div
              className={`card ${item.popular ? "active" : ""}`}
              key={item.name}
            >

              <h3>{item.name}</h3>

              <div className="price">
                £{item.price}
              </div>

              <ul>

                {item.features.map((f) => (

                  <li key={f}>{f}</li>

                ))}

              </ul>

              <button>
                Đăng ký
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}