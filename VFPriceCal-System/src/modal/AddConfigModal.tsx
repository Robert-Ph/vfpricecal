import { useState } from 'react';
import styles from './AddConfigModal.module.scss';
import { createSystemConfig } from '../service/SystemConfigService';

export default function AddConfigModal({ isOpen = true, onClose }) {
  const [formData, setFormData] = useState({
   configKey: '',
    configValue: '',
    configType: '',
    description: '',
    groupCode: '',
    isActive: true
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call your API to create the new config here
     const response = await  createSystemConfig(formData);
      console.log('Config created successfully:', response);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error creating config:', error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Thêm cấu hình</h2>
            <p className={styles.subtitle}>Tạo cấu hình hệ thống mới</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Đóng">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            {/* CONFIG KEY */}
            <div className={styles.formGroup}>
              <label>
                CONFIG KEY <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="configKey"
                placeholder="Nhập config key (VD: MAX_LOGIN_DEVICE)"
                value={formData.configKey}
                onChange={handleChange}
                required
              />
              <span className={styles.hint}>
                Sử dụng chữ hoa, gạch dưới, không dấu và không khoảng trắng
              </span>
            </div>

            {/* GIÁ TRỊ */}
            <div className={styles.formGroup}>
              <label>
                GIÁ TRỊ <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="configValue"
                placeholder="Nhập giá trị cấu hình"
                value={formData.configValue}
                onChange={handleChange}
                required
              />
            </div>

            {/* KIỂU DỮ LIỆU */}
            <div className={styles.formGroup}>
              <label>
                KIỂU DỮ LIỆU <span className={styles.required}>*</span>
              </label>
              <div className={styles.selectWrapper}>
                <select
                  name="configType"
                  value={formData.configType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled hidden>
                    Chọn kiểu dữ liệu
                  </option>
                  <option value="STRING">String</option>
                  <option value="INTEGER">Integer</option>
                  <option value="ENUM">ENUM</option>
                  <option value="BOOLEAN">Boolean</option>
                  <option value="JSON">JSON</option>
                </select>
                <span className={styles.arrow}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </div>
            </div>

            {/* NHÓM CẤU HÌNH */}
            <div className={styles.formGroup}>
              <label>
                NHÓM CẤU HÌNH <span className={styles.required}>*</span>
              </label>
              <div className={styles.selectWrapper}>
                <select
                  name="groupCode"
                  value={formData.groupCode}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled hidden>
                    Chọn nhóm cấu hình
                  </option>
                  <option value="SYSTEM">Hệ thống</option>
                  <option value="SECURITY">Bảo mật</option>
                  <option value="REGISTRATION">Đăng ký tài khoản</option>
                  <option value="PAYMENT">Thanh toán</option>
                  <option value="EMAIL">Email</option>
                  <option value="NOTIFICATION">Thông báo</option>
                </select>
                <span className={styles.arrow}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </div>
            </div>

            {/* MÔ TẢ */}
            <div className={styles.formGroup}>
              <label>MÔ TẢ</label>
              <div className={styles.textContainer}>
                <textarea
                  name="description"
                  placeholder="Nhập mô tả chi tiết về cấu hình"
                  maxLength={255}
                  value={formData.description}
                  onChange={handleChange}
                />
                <span className={styles.charCount}>
                  {formData.description.length}/255
                </span>
              </div>
            </div>

            {/* THỨ TỰ */}
            {/* <div className={styles.formGroup}>
              <label>
                THỨ TỰ
                <span className={styles.infoIcon} title="Thứ tự hiển thị">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                </span>
              </label>
              <input
                type="number"
                name="order"
                placeholder="Nhập thứ tự hiển thị"
                value={formData.order}
                onChange={handleChange}
              />
            </div> */}

            {/* TRẠNG THÁI */}
            {/* <div className={styles.formGroup}>
              <label>
                TRẠNG THÁI <span className={styles.required}>*</span>
              </label>
              <div className={styles.selectWrapper}>
                <select
                  name="status"
                  value={formData.isActive}
                  onChange={handleChange}
                >
                  <option value="true">Bật</option>
                  <option value="false">Tắt</option>
                </select>
                <span className={styles.arrow}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </div>
            </div> */}

            {/* GHI CHÚ */}
            {/* <div className={styles.formGroup}>
              <label>GHI CHÚ</label>
              <div className={styles.textContainer}>
                <textarea
                  name="note"
                  placeholder="Ghi chú thêm (nếu có)"
                  maxLength={255}
                  value={formData.note}
                  onChange={handleChange}
                />
                <span className={styles.charCount}>
                  {formData.note.length}/255
                </span>
              </div>
            </div> */}
          </div>

          {/* Footer Actions */}
          <div className={styles.footer}>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={onClose}
            >
              Hủy
            </button>
            <button type="submit" className={styles.btnSubmit}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              Lưu cấu hình
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}