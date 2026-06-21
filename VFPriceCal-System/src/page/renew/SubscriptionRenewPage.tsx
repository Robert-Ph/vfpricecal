import "./subscriptionRenewPage.scss";
import { useState, useEffect } from "react";
import type { Companies, plans } from "../../config/ModelConfig";
import { getCompaniesById } from "../../service/CompaniesService";
import { format } from 'date-fns';
import { useParams } from "react-router-dom";
import { getAllPlans } from "../../service/PlansService";
import { formatCurrency } from "../../ultils/formatters";


export default function SubscriptionRenewPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [duration, setDuration] = useState(12);
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [plansList, setPlansList] = useState<plans[]>([]);
  const {id} = useParams(); 
  const [companies, setCompanies] = useState<Companies | null>(null);
  const [transactionType, setTransactionType] = useState<string>('new');
  const typeLabels: Record<string, string> = {
      new: 'Đăng ký mới',
      renew: 'Gia hạn',
      upgrade: 'Nâng cấp gói',
      downgrade: 'Hạ cấp gói'
    };

    // 1. Tìm gói hiện tại
const currentPlan = plansList.find(plan => plan.id === selectedPlan);

// 2. Lấy giá tiền của gói (Nếu undefined thì lấy bằng 0)
const planPrice = currentPlan?.price ?? 0;

// 3. Tính toán số tiền gốc dựa trên thời hạn (duration)
const baseAmount = planPrice * duration;

// 4. Tính thuế VAT (10% của số tiền gốc)
const vat = baseAmount * 0.1;

// 5. Tính tổng tiền (Tiền gốc + VAT)
const totalAmount = baseAmount + vat;

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setTransactionType(e.target.value);
  };

  useEffect (() => {
    const  fetchData = async () => {
        const response = await getCompaniesById(id ?? "");
        setCompanies(response.data);
    }
    void fetchData();
  },[id])

      
  
      useEffect(() => {
          const fetchData = async () => {
              const list = await getAllPlans();
              setPlansList(list.data);
          }
  
          void fetchData();
      },[])

  
  return (
    <div className="renew-page">
      {/* Header */}

      <div className="page-header-renew">
        <h1>Đăng ký / Gia hạn gói dịch vụ</h1>
        {/* <p>
          Chọn gói dịch vụ phù hợp và thiết lập thời gian sử dụng cho khách hàng
        </p> */}
      </div>

      <div className="renew-layout">
        {/* LEFT */}

        <div className="main-content">
            <div className="top-section">
                          {/* Customer */}

          <div className="card">
            <div className="card-title">
              1. Thông tin khách hàng
            </div>

            <div className="customer-box">
              <div>
                <h3>{companies?.name}</h3>

                <div>Mã KH: {companies?.code}</div>
                <div>MST: {companies?.taxCode}</div>
                <div>Email: {companies?.email}</div>
                <div>Điện thoại: {companies?.phone}</div>
              </div>

              <div className="current-plan">
                <span>Gói hiện tại</span>
                <h4>{companies?.plan}</h4>

                <p>Hết hạn: {companies?.endTime ? format(new Date(companies?.endTime), 'dd/MM/yyyy') : '---'}</p>
              </div>
            </div>
          </div>

          {/* Transaction */}

          <div className="card">
            <div className="card-title">
              2. Loại giao dịch
            </div>

            <div className="transaction-list">
              <label>
                <input type="radio" name="type"
                        value="new"
                        checked={transactionType === 'new'}
                        onChange={handleTypeChange}
                        />
                Đăng ký mới
              </label>

              <label >
                <input type="radio" name="type" 
                      value="renew" 
                      checked={transactionType === 'renew'} 
                      onChange={handleTypeChange}
                    />
                Gia hạn
              </label>

              <label>
                <input type="radio" name="type" 
                      value="upgrade" 
                      checked={transactionType === 'upgrade'} 
                      onChange={handleTypeChange}
                      />
                Nâng cấp gói
              </label>

              <label>
                <input type="radio" name="type" 
                      value="downgrade" 
                      checked={transactionType === 'downgrade'} 
                      onChange={handleTypeChange}
                      />
                Hạ cấp gói
              </label>
            </div>
          </div>
            
        </div>


          {/* Plans */}

          <div className="card">
            <div className="card-title">
              3. Chọn gói dịch vụ
            </div>

            <div className="plans-grid">
              {plansList?.slice()
                    .sort((a, b) => a.price - b.price).map((plan) => (
                <div
                  key={plan.id}
                  className={`plan-card ${
                    selectedPlan === plan.id ? "selected" : ""
                  }`}
                >
                  <div className="plan-name">
                    {plan.name}
                  </div>
                  <div className="plan-name">
                    {plan.code}
                  </div>

                  <div className={`price blue`}>
                    {formatCurrency(plan.price, {locale: "vi-VN", currency: "VND"})}
                  </div>

                  <ul>
                      <li key="{}">{plan.description}</li>
                  </ul>

                  <button
                    onClick={() =>
                      setSelectedPlan(plan.id)
                    }
                  >
                    Chọn gói
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Duration */}

          <div className="card">
            <div className="card-title">
              4. Thời gian gia hạn
            </div>

            <div className="duration-grid">
              {[1, 12, 24, 36].map((item) => (
                <div
                  key={item}
                  className={`duration-card ${
                    duration === item
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setDuration(item)
                  }
                >
                  {item} tháng
                </div>
              ))}
            </div>
          </div>

          {/* Payment */}

          <div className="card">
            <div className="card-title">
              5. Hình thức thanh toán
            </div>

            <div className="payment-methods">
              <label>
                <input
                  type="radio"
                  checked={
                    paymentMethod === "bank"
                  }
                  onChange={() =>
                    setPaymentMethod("bank")
                  }
                />
                Chuyển khoản
              </label>

              <label>
                <input
                  type="radio"
                  checked={
                    paymentMethod === "cash"
                  }
                  onChange={() =>
                    setPaymentMethod("cash")
                  }
                />
                Tiền mặt
              </label>

              <label>
                <input
                  type="radio"
                  checked={
                    paymentMethod === "momo"
                  }
                  onChange={() =>
                    setPaymentMethod("momo")
                  }
                />
                MoMo
              </label>
            </div>
          </div>

          {/* Note */}

          <div className="card">
            <div className="card-title">
              6. Ghi chú
            </div>

            <textarea
              placeholder="Nhập ghi chú..."
            />
          </div>
        </div>

        {/* SIDEBAR */}

        <div className="summary-card">
          <h3>Thông tin đơn hàng</h3>

          <div className="row">
            <span>Khách hàng</span>
            <strong>
              {companies?.code}
            </strong>
          </div>

          <div className="row">
            <span>Loại giao dịch</span>
            <strong>{typeLabels[transactionType]}</strong>
          </div>

          <div className="row">
            <span>Gói dịch vụ</span>
            <strong>{currentPlan ? currentPlan.name : "Chưa chọn gói"}</strong>
          </div>

          <hr />

          <div className="row">
            <span>Giá gói</span>
            <strong>{formatCurrency(currentPlan?.price ?? 0, {locale: "vi-VN", currency: "VND"})}</strong>
          </div>
          

          <div className="row green">
            <span>Thời hạn</span>
            <strong>{duration} tháng</strong>
          </div>

          <div className="row green">
            <span>VAT(10%)</span>
            <strong>{formatCurrency(vat, {locale: "vi-VN", currency: "VND"})}</strong>
          </div>

          <div className="row total">
            <span>Tổng thanh toán</span>
            <strong>{formatCurrency(totalAmount, {locale: "vi-VN", currency: "VND"})}</strong>
          </div>

          <button className="btn-submit">
            Gia hạn gói dịch vụ
          </button>

          <button className="btn-cancel">
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  );
}