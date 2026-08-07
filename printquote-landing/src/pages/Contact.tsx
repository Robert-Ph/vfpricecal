import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  Send,
  User,
  MessageSquare,
} from "lucide-react";
import Navbar from "../component/Navbar";
import styles from "./Contact.module.scss";
import anh from "../assets/backgound_Email.png";
import Footer from "../component/Footer";
import { sendFeedback } from "../service/FeedbacksService";
import { toast } from "react-toastify";

interface ContactForm {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type ContactErrors = Partial<Record<keyof ContactForm, string>>;

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<ContactErrors>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors: ContactErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên";
    }

    if (!form.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email không đúng định dạng";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^(0|\+84)(3|5|7|8|9)\d{8}$/.test(form.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!form.subject.trim()) {
      newErrors.subject = "Vui lòng nhập chủ đề";
    }

    if (!form.message.trim()) {
      newErrors.message = "Vui lòng nhập nội dung";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;
    const formSend = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      content: form.message,
    }

    try {
      const response = await sendFeedback(formSend);
      if(response.code === 200 || response.code === 201){
        toast.success(response.message)
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      toast.error("Thất bại!")
      console.log(error)
    }

    // TODO: Call API
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.left}>
            <h2>Liên hệ với chúng tôi</h2>

            <p>
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.
              <br />
              Hãy gửi tin nhắn hoặc liên hệ qua thông tin bên dưới.
            </p>
          </div>

          <div className={styles.right}>
            <img
              src={anh}
              alt="Contact"
            />
          </div>
        </div>
      </section>

      <section className={styles.contact}>
        <div className={styles.info}>
          <h2>Thông tin liên hệ</h2>

          <div className={styles.item}>
            <div className={styles.icon}>
              <MapPin size={20} />
            </div>

            <div>
              <h4>Địa chỉ</h4>
              <p>
                Thành phố Hồ Chí Minh
                <br />
                {/* Quận Hải Châu, Đà Nẵng */}
              </p>
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.icon}>
              <Mail size={20} />
            </div>

            <div>
              <h4>Email</h4>
              <p>vfprintquote@gmail.com</p>
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.icon}>
              <Phone size={20} />
            </div>

            <div>
              <h4>Số điện thoại</h4>
              <p>Chưa cập nhật</p>
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.icon}>
              <Clock3 size={20} />
            </div>

            <div>
              <h4>Giờ làm việc</h4>
              <p>
                Thứ 2 - Thứ 6: 08:00 - 17:30
                <br />
                Thứ 7: 08:00 - 12:00
              </p>
            </div>
          </div>

          {/* <div className={styles.map}>
            <iframe
              title="map"
              src="https://www.google.com/maps?q=Da%20Nang&output=embed"
              loading="lazy"
            />
          </div> */}
        </div>

        <div className={styles.formCard}>
          <h2>Gửi tin nhắn cho chúng tôi</h2>

          <p>
            Vui lòng điền đầy đủ thông tin, chúng tôi sẽ phản
            hồi bạn sớm nhất.
          </p>

          <form onSubmit={handleSubmit}>
            <div className={styles.grid}>
              <div className={styles.formGroup}>
                <div className={styles.input}>
                  <User size={18} />
                  <input
                    name="fullName"
                    placeholder="Họ và tên"
                    value={form.fullName}
                    onChange={handleChange}
                  />
                </div>

                {errors.fullName && (
                  <span className={styles.error}>
                    {errors.fullName}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <div className={styles.input}>
                  <Mail size={18} />
                  <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                {errors.email && (
                  <span className={styles.error}>
                    {errors.email}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <div className={styles.input}>
                  <Phone size={18} />
                  <input
                    name="phone"
                    placeholder="Số điện thoại"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                {errors.phone && (
                  <span className={styles.error}>
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <div className={styles.input}>
                  <MessageSquare size={18} />
                  <input
                    name="subject"
                    placeholder="Chủ đề"
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>

                {errors.subject && (
                  <span className={styles.error}>
                    {errors.subject}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <textarea
                name="message"
                rows={7}
                placeholder="Nội dung tin nhắn..."
                value={form.message}
                onChange={handleChange}
              />

              {errors.message && (
                <span className={styles.error}>
                  {errors.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
            >
              <Send size={18} />
              Gửi tin nhắn
            </button>
          </form>
        </div>
      </section>

      <Footer/>
    </div>
  );
}