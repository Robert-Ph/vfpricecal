import React, { useState } from "react";
import { FiX, FiSend, FiCheckCircle, FiLoader } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import "./feedbackForm.scss";
import type { UserInfo } from "../../context/AuthContext";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [user] = useState<UserInfo | null>(() => {
          const savedUser = localStorage.getItem("user");
          if (savedUser) {
              try {
                  return JSON.parse(savedUser);
              } catch {
                  return null;
              }
          }
          return null;
      });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || status === "sending") return;

    setStatus("sending");

    // Các tham số cấu hình mẫu của EmailJS (Bạn đăng ký tài khoản trên emailjs.com để lấy 3 key này)
    const SERVICE_ID = "service_s2z7esy"; 
    const TEMPLATE_ID = "template_5dxaint";
    const PUBLIC_KEY = "wYJrAGgbP3LCNXB72";

    // Gói dữ liệu gửi đi khớp với các trường xử lý trong Email Template của bạn
    const templateParams = {
      from_name: user?.companyName,
      from_email: user?.email,
      message: content,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setStatus("success");
        setContent("");
      })
      .catch((error) => {
        console.error("Lỗi gửi mail:", error);
        alert("Gửi góp ý thất bại, vui lòng kiểm tra lại cấu hình EmailJS!");
        setStatus("idle");
      });
  };

  const handleCloseModal = () => {
    setStatus("idle");
    onClose();
  };

  return (
    <div className="feedback-overlay" onClick={handleCloseModal}>
      <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
        
        <button className="feedback-modal__close-btn" onClick={handleCloseModal}>
          <FiX />
        </button>

        {status === "success" ? (
          /* TRẠNG THÁI 1: GỬI THÀNH CÔNG */
          <div className="feedback-modal__success-view">
            <FiCheckCircle className="feedback-modal__success-icon" />
            <h3 className="feedback-modal__success-title">Cảm ơn bạn!</h3>
            <p className="feedback-modal__success-desc">
              Ý kiến đóng góp của bạn đã được gửi thẳng tới đội ngũ phát triển VFprint.
            </p>
            <button className="feedback-modal__done-btn" onClick={handleCloseModal}>
              Đóng cửa sổ
            </button>
          </div>
        ) : (
          /* TRẠNG THÁI 2: ĐANG NHẬP HOẶC ĐANG GỬI */
          <form onSubmit={handleSubmit} className="feedback-modal__form">
            <div className="feedback-modal__group">
              <label className="feedback-modal__label">
                Nội dung góp ý <span className="feedback-modal__required">*</span>
              </label>
              <textarea
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nhập ý kiến đóng góp của bạn tại đây để giúp chúng tôi hoàn thiện hệ thống..."
                className="feedback-modal__textarea"
                required
                disabled={status === "sending"}
                autoFocus
              />
            </div>

            <button 
              type="submit" 
              className="feedback-modal__submit-btn"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <>
                  <FiLoader className="feedback-modal__spinner" />
                  <span>Đang gửi ý kiến...</span>
                </>
              ) : (
                <>
                  <FiSend className="feedback-modal__icon" />
                  <span>Gửi góp ý ngay</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}