import React from 'react';
import './addQuoteModal.scss';
import {
  X,
  RotateCcw,
  Plus,
  Info,
  ChevronDown,
  Box
} from 'lucide-react';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddQuoteModal: React.FC<Props> = ({ open, setOpen }) => {
  if (!open) return null;

  const handleClose = () => setOpen(false);

  return (
    <div className="quote-modal-overlay">
      <div className="quote-modal">
        
        {/* 1. Header Modal */}
        <div className="quote-modal__header">
          {/* <div className="quote-modal__header-info"> */}
            {/* <div className="quote-modal__header-icon"> */}
              {/* <Box size={22} /> */}
            {/* </div> */}
            <div>
              <h2 className="quote-modal__header-title">Thêm sản phẩm</h2>
              {/* <p className="quote-modal__header-subtitle">Nhập thông tin sản phẩm để tính giá</p> */}
            </div>
          {/* </div> */}
          <button className="quote-modal__header-close" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        {/* 2. Body Modal */}
        <div className="quote-modal__body">
          
          {/* Cột Trái: Thông tin & Gia công */}
          <div className="quote-modal__col-left">
            
            {/* Section 1: Thông tin sản phẩm */}
            <div className="form-section">
              <h3 className="form-section__title">1. Thông tin sản phẩm</h3>
              
              <div className="form-grid form-grid--2">
                {/* Tên sản phẩm */}
                <div className="form-group">
                  <label className="form-group__label">
                    Tên sản phẩm <span className="form-group__required">*</span>
                  </label>
                  <div className="form-input-wrapper">
                    <input
                      type="text"
                      placeholder="Nhập tên sản phẩm"
                      className="form-control"
                    />
                    <span className="form-input-wrapper__counter">0/100</span>
                  </div>
                </div>

                {/* Loại sản phẩm */}
                <div className="form-group">
                  <label className="form-group__label">Loại sản phẩm</label>
                  <div className="form-select-wrapper">
                    <select className="form-control form-control--placeholder">
                      <option value="">Chọn loại sản phẩm</option>
                    </select>
                    <ChevronDown className="form-select-wrapper__icon" size={16} />
                  </div>
                </div>

                {/* Kích thước thành phẩm */}
                <div className="form-group">
                  <label className="form-group__label">
                    Kích thước thành phẩm <span className="form-group__required">*</span>
                  </label>
                  <div className="dimension-group">
                    <input
                      type="text"
                      defaultValue="210"
                      placeholder="Chiều rộng"
                      className="form-control"
                    />
                    <span className="dimension-group__separator">x</span>
                    <input
                      type="text"
                      defaultValue="297"
                      placeholder="Chiều cao"
                      className="form-control"
                    />
                    <div className="form-select-wrapper dimension-group__unit">
                      <select className="form-control">
                        <option>mm</option>
                        <option>cm</option>
                      </select>
                      <ChevronDown className="form-select-wrapper__icon" size={14} />
                    </div>
                  </div>
                </div>

                {/* Loại giấy */}
                <div className="form-group">
                  <label className="form-group__label">
                    Loại giấy <span className="form-group__required">*</span>
                  </label>
                  <div className="form-select-wrapper">
                    <select className="form-control form-control--placeholder">
                      <option value="">Chọn loại giấy</option>
                    </select>
                    <ChevronDown className="form-select-wrapper__icon" size={16} />
                  </div>
                </div>

                {/* Loại hình in */}
                <div className="form-group">
                  <label className="form-group__label">
                    Loại hình in <span className="form-group__required">*</span>
                  </label>
                  <div className="form-select-wrapper">
                    <select className="form-control form-control--placeholder">
                      <option value="">Chọn loại hình in</option>
                    </select>
                    <ChevronDown className="form-select-wrapper__icon" size={16} />
                  </div>
                </div>

                {/* Số lượng */}
                <div className="form-group">
                  <label className="form-group__label">
                    Số lượng <span className="form-group__required">*</span>
                  </label>
                  <div className="input-unit-group">
                    <input
                      type="text"
                      placeholder="Nhập số lượng"
                      className="form-control input-unit-group__input"
                    />
                    <div className="form-select-wrapper input-unit-group__unit">
                      <select className="form-control">
                        <option>tờ</option>
                        <option>cái</option>
                      </select>
                      <ChevronDown className="form-select-wrapper__icon" size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Gia công sau in */}
            <div className="form-section">
              <div className="form-section__header">
                <h3 className="form-section__title">2. Gia công sau in</h3>
                <button className="btn btn--outline-primary btn--sm">
                  <Plus size={14} /> Thêm gia công
                </button>
              </div>
              <div className="tag-list">
                {['Cán mờ', 'Đóng kim', 'Bế theo hình'].map((tag, idx) => (
                  <span key={idx} className="tag-item">
                    {tag}
                    <button className="tag-item__remove">
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Section 3: Thông tin tính giá */}
            <div className="form-section">
              <h3 className="form-section__title">3. Thông tin tính giá</h3>
              <div className="form-grid form-grid--4">
                
                <div className="form-group">
                  <label className="form-group__label">Khổ giấy in</label>
                  <div className="form-select-wrapper">
                    <select className="form-control">
                      <option>65 x 86 cm</option>
                    </select>
                    <ChevronDown className="form-select-wrapper__icon" size={14} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-group__label">Hướng giấy</label>
                  <div className="form-select-wrapper">
                    <select className="form-control">
                      <option>Ngang (86cm)</option>
                    </select>
                    <ChevronDown className="form-select-wrapper__icon" size={14} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-group__label">Số sản phẩm / tờ</label>
                  <input type="text" defaultValue="8" className="form-control form-control--readonly" readOnly />
                </div>

                <div className="form-group">
                  <label className="form-group__label">Số tờ in</label>
                  <input type="text" defaultValue="625" className="form-control form-control--readonly" readOnly />
                </div>

                <div className="form-group">
                  <label className="form-group__label">Định lượng giấy</label>
                  <div className="form-select-wrapper">
                    <select className="form-control">
                      <option>C150 (150gsm)</option>
                    </select>
                    <ChevronDown className="form-select-wrapper__icon" size={14} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-group__label">In màu</label>
                  <div className="form-select-wrapper">
                    <select className="form-control">
                      <option>4 màu 1 mặt</option>
                    </select>
                    <ChevronDown className="form-select-wrapper__icon" size={14} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-group__label">Tổng giấy (tờ)</label>
                  <input type="text" defaultValue="625" className="form-control form-control--readonly" readOnly />
                </div>

                <div className="form-group">
                  <label className="form-group__label">Tổng giấy (kg)</label>
                  <input type="text" defaultValue="11.25" className="form-control form-control--readonly" readOnly />
                </div>

              </div>

              {/* Notice Box */}
              <div className="notice-box">
                <Info className="notice-box__icon" size={16} />
                <span>Lưu ý: Giá tính toán mang tính tham khảo. Giá cuối cùng có thể thay đổi tùy theo thực tế sản xuất.</span>
              </div>
            </div>

          </div>

          {/* Cột Phải: Kết quả tính giá */}
          <div className="quote-modal__col-right">
            <div className="price-result">
              <h3 className="form-section__title">4. Kết quả tính giá</h3>

              <div className="price-result__list">
                <div className="price-row">
                  <span className="price-row__label">Giá giấy</span>
                  <span className="price-row__value">1.875.000 đ</span>
                </div>
                <div className="price-row">
                  <span className="price-row__label">Giá in</span>
                  <span className="price-row__value">2.100.000 đ</span>
                </div>
                <div className="price-row">
                  <span className="price-row__label">Gia công</span>
                  <span className="price-row__value">450.000 đ</span>
                </div>

                <hr className="price-result__divider" />

                <div className="price-row price-row--bold">
                  <span className="price-row__label">Tổng giá vốn</span>
                  <span className="price-row__value">4.425.000 đ</span>
                </div>

                <div className="price-row">
                  <span className="price-row__label price-row__label--with-icon">
                    Chi phí khác <Info size={14} />
                  </span>
                  <div className="input-addon-group input-addon-group--wide">
                    <input type="text" defaultValue="0" className="input-addon-group__input" />
                    <span className="input-addon-group__unit">đ</span>
                  </div>
                </div>

                <hr className="price-result__divider" />

                <div className="price-row price-row--bold">
                  <span className="price-row__label">Giá vốn</span>
                  <span className="price-row__value">4.425.000 đ</span>
                </div>

                <div className="price-row">
                  <span className="price-row__label">Lợi nhuận mong muốn</span>
                  <div className="input-addon-group">
                    <input type="text" defaultValue="20" className="input-addon-group__input" />
                    <span className="input-addon-group__unit">%</span>
                  </div>
                </div>

                <div className="price-row">
                  <span className="price-row__label">Lợi nhuận</span>
                  <span className="price-row__value">885.000 đ</span>
                </div>

                <div className="price-row">
                  <span className="price-row__label">VAT</span>
                  <div className="price-row__inline">
                    <div className="input-addon-group input-addon-group--sm">
                      <input type="text" defaultValue="8" className="input-addon-group__input" />
                      <span className="input-addon-group__unit">%</span>
                    </div>
                    <span className="price-row__value min-w-70">424.800 đ</span>
                  </div>
                </div>

                <hr className="price-result__divider" />

                <div className="price-row price-row--highlight">
                  <span className="price-row__label">Đơn giá</span>
                  <span className="price-row__value price-row__value--blue">5.734.800 đ/tờ</span>
                </div>
              </div>

              {/* Total Box */}
              <div className="total-box">
                <span className="total-box__title">Thành tiền</span>
                <div className="total-box__amount">5.734.800 đ</div>
                <p className="total-box__sub">(Đã bao gồm VAT)</p>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Footer Modal */}
        <div className="quote-modal__footer">
          <button className="btn btn--outline">
            <RotateCcw size={14} /> Đặt lại
          </button>
          
          <div className="quote-modal__footer-actions">
            <button className="btn btn--outline" onClick={handleClose}>
              Hủy
            </button>
            <button className="btn btn--primary">
              Lưu sản phẩm
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddQuoteModal;