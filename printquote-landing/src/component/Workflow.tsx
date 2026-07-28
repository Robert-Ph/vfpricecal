import {
  UserPlus,
  Calculator,
  FileText,
  CheckCircle,
} from "lucide-react";

import "./workflow.scss";

const steps = [
  {
    icon: UserPlus,
    title: "Đăng ký",
    desc: "Tạo tài khoản trong vài giây."
  },
  {
    icon: Calculator,
    title: "Tạo báo giá",
    desc: "Chọn sản phẩm và hệ thống tự tính."
  },
  {
    icon: FileText,
    title: "Xuất PDF",
    desc: "Xuất báo giá chuyên nghiệp."
  },
  {
    icon: CheckCircle,
    title: "Gửi khách hàng",
    desc: "Chia sẻ ngay qua Email hoặc Zalo."
  }
];

export default function Workflow() {
  return (
    <section className="workflow">

      <div className="container">

        <div className="title">
          <h2>Quy trình sử dụng</h2>

          <p>
            Chỉ mất vài phút để tạo một báo giá hoàn chỉnh.
          </p>
        </div>

        <div className="steps">

          {steps.map((item, index) => {

            const Icon = item.icon;

            return (

              <div className="step" key={index}>

                <div className="number">
                  {index + 1}
                </div>

                <Icon size={42} />

                <h3>{item.title}</h3>

                <p>{item.desc}</p>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}