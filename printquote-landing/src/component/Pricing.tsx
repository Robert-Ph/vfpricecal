import "./pricing.scss";
import { FaUser, FaBuilding } from "react-icons/fa";
import type { ReactNode } from "react";
import type { plansResponse, systemConfig } from "../api/ConfigModal";

type PlanCardProps = {
  plan: plansResponse;
};

function PlanCard({ plan }: PlanCardProps) {
    const configs: systemConfig[] = JSON.parse(
      localStorage.getItem("systemConfig") || "[]"
  );
  const defaultSystem = configs.find(
      config => config.configKey === "SYSTEM_STAGE"
  );
  const items = plan.description
    .split(/,\s*|\n+/)
    .map(item => item.trim())
    .filter(Boolean);
  return (
    <div className="card">
      <h3>{plan.name}</h3>

      <div className="price">
        {Number(plan.price).toLocaleString("vi-VN")}đ
        <span>/tháng</span>
      </div>

      <ul className="description-list">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <button disabled={defaultSystem?.configValue === "BETA"}>{defaultSystem?.configValue === 'BETA' ? "Chưa phát hành" : "Đăng ký"}</button>
    </div>
  );
}

type PlanSectionProps = {
  title: string;
  description: string;
  icon: ReactNode;
  plans: plansResponse[];
  business?: boolean;
};

function PlanSection({
  title,
  description,
  icon,
  plans,
  business = false,
}: PlanSectionProps) {
  if (plans.length === 0) return null;

  return (
    <div className="pricing-group">
      <div className={`group-header ${business ? "business" : ""}`}>
        <div className="icon">{icon}</div>

        <div className="title">
          <h3>{title}</h3>
          <ul className="description-list">
  {description
    .split(",")
    .map(item => item.trim())
    .filter(Boolean)
    .map((item, index) => (
      <li key={index}>{item}</li>
    ))}
</ul>
        </div>
      </div>

      <div
        className={`cards ${
          business ? "three-columns" : "two-columns"
        }`}
      >
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}

export default function Pricing() {
  const plans: plansResponse[] = JSON.parse(
    localStorage.getItem("plans") || "[]"
  );

  const personalPlans = plans.filter(
    (item) => item.plansType === "PERSONAL")
    .sort((a, b) => a.sort - b.sort);

  const businessPlans = plans.filter(
    (item) => item.plansType === "BUSINESS")
     .sort((a, b) => a.sort - b.sort);

  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <h2>Gói dịch vụ</h2>

        <p className="sub-title">
          Chọn gói phù hợp với nhu cầu sử dụng của bạn
        </p>

        <PlanSection
          title="Cá nhân"
          description="Dành cho cá nhân, freelancer và người mới bắt đầu."
          icon={<FaUser />}
          plans={personalPlans}
        />

        <PlanSection
          title="Doanh nghiệp"
          description="Dành cho doanh nghiệp và tổ chức."
          icon={<FaBuilding />}
          plans={businessPlans}
          business
        />
      </div>
    </section>
  );
}