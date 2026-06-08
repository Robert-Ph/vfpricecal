import "./CompanyDetail.scss";

export default function CompanyDetail() {
  return (
    <div className="company-detail-page">
        <div className="breadcrumb">
            Quản lý doanh nghiệp
            <span>/</span>
            Chi tiết doanh nghiệp
        </div>

        {/* Header */}
        <div className="company-header">
            <div className="company-info-detail">
                <div className="company-logo-detail">
                    ABC
                </div>

                <div className="company-meta">
                    <div className="title-row">
                    <h2>Công ty TNHH ABC</h2>
                    <span className="status active">
                        ACTIVE
                    </span>
                </div>

                <div className="meta-list">
                    <span>MST:{"\u00a0\u00a0"} 0123456789</span>
                    <span>Email:{"\u00a0\u00a0"} contact@abc.vn</span>
                    <span>Điện thoại:{"\u00a0\u00a0"} 0901234567</span>
                    <span>Địa chỉ:{"\u00a0\u00a0"} Hà Nội</span>
                    <span>Ngày tạo:{"\u00a0\u00a0"} xx/xx/xxxx</span>
                </div>
            </div>
        </div>

        <div className="package-info">
            {/* Khối phía trên: Thông tin gói */}
            <div className="main-content">
                <div className="package-detail">
                    <div className="text-group">
                        <h2>Gói hiện tại</h2>
                        <h3>Tiêu chuẩn</h3>
                        <p>399.000đ / tháng</p>
                    </div>
                </div>

                <div className="date-status">
                    <div className="date-labels">
                        <span>Ngày kích hoạt</span>
                        <span>Ngày hết hạn</span>
                    </div>
                    <div className="date-values">
                        <span className="date">15/05/2025</span>
                        <span className="date highlight">15/12/2025</span>
                        <span className="days-left">Còn 128 ngày</span>
                    </div>
                </div>
            </div>

            {/* Khối phía dưới: Nút bấm hành động */}
            <div className="header-actions">
                <button className="btn-primary">
                    <span className="icon">📅</span> Gia hạn gói
                </button>
                <button className="btn-outline">
                    <span className="icon">📈</span> Nâng cấp gói
                </button>
                <button className="btn-danger">
                    <span className="icon">🔒</span> Tạm khóa
                </button>
            </div>
        </div>


    </div>

    <div className="main-info">
      {/* Tabs */}
      <div className="tabs">
        <button className="active">
          Tổng quan
        </button>

        <button>Người dùng</button>

        <button>Thanh toán</button>

        <button>Nhật ký</button>

        <button>Cấu hình</button>
      </div>

      {/* Stats */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="icon">👥</div>
          <div>
            <h3>15</h3>
            <p>Người dùng</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon">📄</div>
          <div>
            <h3>2.451</h3>
            <p>Báo giá</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon">🛒</div>
          <div>
            <h3>1.320</h3>
            <p>Đơn hàng</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon">💲</div>
          <div>
            <h3>135.420.000đ</h3>
            <p>Doanh thu</p>
          </div>
        </div>

      </div>

      {/* Info Grid */}
      <div className="content-grid">

        <div className="card">
          <div className="card-header">
            <h3>Thông tin doanh nghiệp</h3>

            <button>Sửa</button>
          </div>

          <div className="info-list">
            <div>Tên công ty</div>
            <div>Công ty TNHH ABC</div>

            <div>Mã số thuế</div>
            <div>0123456789</div>

            <div>Email</div>
            <div>contact@abc.vn</div>

            <div>Điện thoại</div>
            <div>0901234567</div>

            <div>Địa chỉ</div>
            <div>Hà Nội</div>
          </div>
        </div>

        <div className="card">
          <h3>Thông tin gói dịch vụ</h3>

          <div className="package-detail">

            <div>Gói</div>
            <div>Tiêu chuẩn</div>

            <div>Giá</div>
            <div>399.000đ/tháng</div>

            <div>Thanh toán</div>
            <div>Tháng</div>

            <div>Trạng thái</div>
            <div>Đang hoạt động</div>

          </div>

          <div className="package-actions">
            <button className="primary">
              Gia hạn
            </button>

            <button>
              Nâng cấp
            </button>
          </div>
        </div>

        <div className="card">
          <h3>Người dùng gần đây</h3>

          <div className="users">

            <div className="user">
              <img
                src="https://i.pravatar.cc/40?img=1"
                alt=""
              />
              <div>
                <strong>
                  Nguyễn Văn A
                </strong>
                <span>
                  admin@abc.vn
                </span>
              </div>
            </div>

            <div className="user">
              <img
                src="https://i.pravatar.cc/40?img=2"
                alt=""
              />
              <div>
                <strong>
                  Trần Thị B
                </strong>
                <span>
                  sale@abc.vn
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Payment History */}
      <div className="payment-card">
        <h3>Lịch sử thanh toán</h3>

        <table>
          <thead>
            <tr>
              <th>Mã GD</th>
              <th>Gói</th>
              <th>Số tiền</th>
              <th>Phương thức</th>
              <th>Ngày</th>
              <th>Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>INV-2025-001</td>
              <td>Tiêu chuẩn</td>
              <td>399.000đ</td>
              <td>Chuyển khoản</td>
              <td>15/05/2025</td>

              <td>
                <span className="paid">
                  Đã thanh toán
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    

    </div>
  );
}