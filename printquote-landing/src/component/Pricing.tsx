import "./pricing.scss";

const plans = [
  
  {
    name: "BETA(Thử nghiệm)",
    price: "0",
    popular: false,
    features: [
      "Thời gian thử nghiệm đến khi thông báo ra mắt chính thức",
      "Miễn phí toàn bộ tính năng",
      "Không giới hạn báo giá",
      "Xuất PDF",
      "Cập nhật tính năng mới",
      "Hỗ trợ trực tuyến",
    ],
  }

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
                {item.price}
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