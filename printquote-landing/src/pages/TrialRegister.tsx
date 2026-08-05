import styles from "./TrialRegister.module.scss";
import {
  Phone,
  Mail,
  User,
  Building2,
  FileText,
  Shield,
  Headphones,
  Printer,
} from "lucide-react";
import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import Navbar from "../component/Navbar";
import { createTrail } from "../service/SystemConfigService";
import type { SubscriTrailOrBetaRequest } from "../api/ConfigModal";
import { toast } from "react-toastify";

interface FormData {
customerType: "PERSONAL" | "BUSINESS";
  fullName: string;
  email: string;
  phone: string;
  company: string;
  tradeName: string;
  agree: boolean;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

interface FeatureProps {
  icon: ReactNode;
  title: string;
  desc: string;
  color: {
    bg: string;
    color: string;
  };
}

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode;
  error?: string;
}

function Feature({
  icon,
  title,
  desc,
  color,
}: FeatureProps) {
  return (
    <div className={styles.feature}>
      <div
        className={styles.icon}
        style={{
          background: color.bg,
          color: color.color,
        }}
      >
        {icon}
      </div>

      <div>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
}

function Input({
  icon,
  error,
  type = "text",
  ...props
}: InputProps) {
  return (
    <div className={styles.inputGroup}>
      <div
        className={`${styles.input} ${
          error ? styles.inputError : ""
        }`}
      >
        <span>{icon}</span>

        <input type={type} {...props} />
      </div>

      {error && (
        <p className={styles.error}>{error}</p>
      )}
    </div>
  );
}

export default function TrialRegister() {
  const [form, setForm] = useState<SubscriTrailOrBetaRequest>({
    customType: "PERSONAL",
    fullName: "",
    email: "",
    phone: "",
    company: "",
    tradeName: "",
    statusId: "5c7a3b1e-92fd-4a6c-bc84-1d2e3f4a5b6c",
    agree: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    const newValue =
      type === "checkbox" ? checked : value;

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};
    if (
  form.customType === "BUSINESS" &&
  !form.company.trim()
) {
  newErrors.company = "Vui lòng nhập tên công ty";
}
if (
  form.customType=== "BUSINESS" &&
  !form.tradeName.trim()
) {
  newErrors.tradeName = "Vui lòng nhập tên thương mại(tên vắn tắt)";
}

    if (!form.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên";
    }

    if (!form.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Email không đúng định dạng";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (
      !/^(0|\+84)(3|5|7|8|9)\d{8}$/.test(form.phone)
    ) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!form.agree) {
      newErrors.agree =
        "Bạn phải đồng ý điều khoản sử dụng";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if(form.customType === 'PERSONAL'){
    setForm({
        ...form,
        tradeName: form.fullName,
        company: form.fullName
    });
}

    try {
      const response = await createTrail(form)
      if(response.code === 200 || response.code === 201){
        toast.success("Đăng ký thành công!")
      }
    } catch (error) {
      console.error("Lỗi khi thêm công ty:", error);
    }

    if (!validate()) return;

    console.log(form);

    // TODO: Call API
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <section className={styles.left}>
          <h1>
            Thử nghiệm <span>PrintQuote</span>
            <br />
            hoàn toàn miễn phí
          </h1>

          <p>
            Thử nghiệm đầy đủ tính năng hiện có và các tính năng được cập nhật mới trong giai đoạn này.
            <br />
            {/* Không cần thẻ tín dụng. */}
          </p>

          <div className={styles.features}>
            <Feature
              icon={<FileText />}
              title="Tạo tài khoản nhanh chóng"
              desc="Đăng ký chỉ trong vài giây."
              color={{
                bg: "#e8f1ff",
                color: "#2563eb",
              }}
            />

            <Feature
              icon={<Printer />}
              title="Đầy đủ tính năng"
              desc="Sử dụng toàn bộ hệ thống."
              color={{
                bg: "#eaf9ef",
                color: "#16a34a",
              }}
            />

            <Feature
              icon={<Shield />}
              title="Không cần thẻ tín dụng"
              desc="Không yêu cầu thanh toán."
              color={{
                bg: "#fff8df",
                color: "#ca8a04",
              }}
            />

            <Feature
              icon={<Headphones />}
              title="Hỗ trợ 24/7"
              desc="Đội ngũ luôn sẵn sàng."
              color={{
                bg: "#f4e8ff",
                color: "#9333ea",
              }}
            />
          </div>
        </section>

        <section className={styles.right}>
          <div className={styles.card}>
            <h2>Đăng ký thử nghiệm</h2>

            <p>
              Bắt đầu thử nghiệm PrintQuote ngay hôm nay.
            </p>
            <div className={styles.customerType}>
                <label>
                    <input
                        type="radio"
                        name="customType"
                        value="PERSONAL"
                        checked={form.customType === "PERSONAL"}
                        onChange={handleChange}
                    />
                    <span>Cá nhân</span>
                </label>

                <label>
                    <input
                        type="radio"
                        name="customType"
                        value="BUSINESS"
                        checked={form.customType === "BUSINESS"}
                        onChange={handleChange}
                    />
                    <span>Doanh nghiệp</span>
                </label>
            </div>

            <form onSubmit={handleSubmit}>
              <Input
                icon={<User size={18} />}
                name="fullName"
                placeholder="Họ và tên"
                value={form.fullName}
                onChange={handleChange}
                error={errors.fullName}
              />

              <Input
                icon={<Mail size={18} />}
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />

              <Input
                icon={<Phone size={18} />}
                type="tel"
                name="phone"
                placeholder="Số điện thoại"
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
              />

             {form.customType === "BUSINESS" && (
                <>
                <Input
                    icon={<Building2 size={18} />}
                    name="company"
                    placeholder="Tên công ty"
                    value={form.company}
                    onChange={handleChange}
                    error={errors.company}
                />

                <Input
                    icon={<Building2 size={18} />}
                    name="tradeName"
                    placeholder="Tên thương mại"
                    value={form.tradeName}
                    onChange={handleChange}
                    error={errors.tradeName}
                />
                </>
            )}

              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                />

                <span>
                  Tôi đồng ý với Điều khoản sử dụng và
                  Chính sách bảo mật
                </span>
              </label>

              {errors.agree && (
                <p className={styles.error}>
                  {errors.agree}
                </p>
              )}

              <button
                className={styles.submitBtn}
                type="submit"
              >
                Đăng ký dùng thử miễn phí
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}