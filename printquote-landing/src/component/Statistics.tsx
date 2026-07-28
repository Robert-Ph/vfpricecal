import "./statistics.scss";

const stats = [
  {
    number: "1000+",
    title: "Khách hàng"
  },
  {
    number: "50.000+",
    title: "Báo giá"
  },
  {
    number: "99.9%",
    title: "Độ ổn định"
  },
  {
    number: "24/7",
    title: "Hỗ trợ"
  }
];

export default function Statistics() {
  return (
    <section className="statistics">
      <div className="container">
        {stats.map((item, index) => (
          <div className="stat-card" key={index}>
            <h2>{item.number}</h2>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}