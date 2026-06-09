import "./about.scss";
import type { UserInfo } from "../../context/AuthContext";
import { useState } from "react";


const About = () => {
        const [user] = useState<UserInfo | null>(() => {
                const savedUser = localStorage.getItem("user");
                if (savedUser) {
                    try {
                        return JSON.parse(savedUser);
                    } catch (e) {
                        return e;
                    }
                }
                return null;
        });
    return(
        <div className="about-container">
            <div className="about-header">
                <h2>Hệ sinh thái VFprint - Ứng dụng báo giá in ấn</h2>
                <button className="button-vesion">Phiên bản 1.0.0</button>
            </div>

            <div className="about-main">
                <div className="about-main-left">
                    <div className="card features-card">
                        <div className="about-us-section">
                            <h3>Về chúng tôi</h3>
                            <p>
                                Mang sứ mệnh của một nền tảng công nghệ, Hệ sinh thái VFprint Ecosystem 
                                toàn diện hóa công cụ tính toán tự động báo giá và quản lý quy trình in ấn tối ưu nhất.
                            </p>
                        </div>

                        <div className="divider"></div>

                        <div className="core-features-section">
                            <h4>Icon-based Core Features</h4>
    
                            <div className="features-grid">
      
                                <div className="feature-item">
                                    <div className="feature-icon icon-blue">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                                    </div>
                                    <div className="feature-text">Tính giá siêu tốc</div>
                                </div>

                                <div className="feature-item">
                                    <div className="feature-icon icon-blue">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                                    </div>
                                    <div className="feature-text">Biên lợi nhuận</div>
                                </div>

                                <div className="feature-item">
                                    <div className="feature-icon icon-blue">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                                    </div>
                                <div className="feature-text">Gia công thông minh</div>
                            </div>

                            <div className="feature-item">
                                <div className="feature-icon icon-blue">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                </div>
                                <div className="feature-text">Độ chính xác cao</div>
                            </div>

                        </div>
                    </div>
                </div>

                </div>

                <div className="about-main-right">
                    <div className="card subscription-card">
                        <h3>Thông tin gói dịch vụ</h3>
        
                        <div className="sub-info-group">
                            <label>Tên doanh nghiệp</label>
                            <div className="company-name">{user?.fullname}</div>
                        </div>

                       <div className="sub-info-group">
  <label>Gói dịch vụ</label>
  {/* Thêm class động dựa theo tên gói dịch vụ */}
  <div className={`plan-badge ${user?.plan ? user.plan.toLowerCase() : 'trial'}-plan`}>
    <span className="icon">
      {user?.plan === 'PRO' ? '👑' : user?.plan === 'BASIC' ? '⭐' : '🌱'}
    </span> 
    GÓI {user?.plan || 'TRIAL'} - ĐĂNG KÝ HẰNG NĂM
  </div>
</div>

                        <div className="sub-info-group flex-row">
                            <div className="icon-indicator">📅</div>
                            <div className="text-data">
                                <label>Hạn sử dụng</label>
                                <span>31/12/2026</span>
                            </div>
                        </div>

                        <div className="sub-info-group flex-row">
                            <div className="icon-indicator">🕒</div>
                            <div className="text-data">
                                <label>Thời gian còn lại</label>
                                <span className="highlight-days">Còn 210 ngày</span>
                            </div>
                        </div>

                        <div className="progress-wrapper">
                            <div className="progress-bar"></div>
                        </div>
        
                    </div>

                </div>

            </div>

            <div className="about-footer">

            </div>
        </div>
    )
}

export default About;