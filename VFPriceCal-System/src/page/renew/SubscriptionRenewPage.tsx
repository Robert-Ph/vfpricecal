import "./subscriptionRenewPage.scss";
import { useState, useEffect } from "react";
import type { Companies, CompaniesRegistration, paymentMethod, paymentStatus, plans} from "../../config/ModelConfig";
import { getCompaniesById } from "../../service/CompaniesService";
import { format } from 'date-fns';
import { useParams, useNavigate } from "react-router-dom";
import { getAllPlans } from "../../service/PlansService";
import { formatCurrency } from "../../ultils/formatters";
import { getCompanyRegistrationById } from "../../service/CompanyRegistrationsService";
import { getAllPaymentStatus } from "../../service/PaymentStatusService";
import { createPayment } from "../../service/PaymentService";
import { getAllPaymentMethod } from "../../service/PaymentMethodService";
import { toast } from "react-toastify";


export default function SubscriptionRenewPage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [duration, setDuration] = useState(1);
  const [plansList, setPlansList] = useState<plans[]>([]);

  const [paymentMethodList, setPaymentMethodList] = useState<paymentMethod[] | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const {type ,id} = useParams(); 
  const [companies, setCompanies] = useState<Companies | null>(null);
  const [companiesNew, setCompaniesNew] = useState<CompaniesRegistration | null>(null);
  const [transactionType, setTransactionType] = useState<string>('new');

  const [paymentStatusList, setPaymentStatusList] = useState<paymentStatus[] | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string>("");
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

      const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();

          if(!paymentMethod || !paymentStatus || !selectedPlan){
            toast.success('Vui lòng chọn đầy đủ thông tin!');
            return;
          }

          const createcom = {
              id: companies?.id || companiesNew?.id || "",
              code: companies?.code || companiesNew?.name || "",
              userName:companies?.userName || companiesNew?.userName || "",
              name: companies?.name || companiesNew?.fullName || "",
              phone: companies?.phone || companiesNew?.phone || "",
              address: companies?.address || companiesNew?.address || "",
              taxCode: companies?.taxCode || companiesNew?.taxCode || "",
              email: companies?.email || companiesNew?.email || "",
              statusId: "5c7a3b1e-92fd-4a6c-bc84-1d2e3f4a5b6c",
              logoUrl: '',
              createAt: '',
              updateAt: '',
              customType: companies?.customType || companiesNew?.customType || ""
          }

          const createSub = {
                companyId: companies?.id ?? "",
                planId: selectedPlan ,
                time: duration,
          }

          const form = {
                  paymentStatus: paymentStatus,
                  type: type || "",
                  companyRes: createcom,
                  sub: createSub,
          }

          try{
            const response = await createPayment(form);
            if (response.code === 200 || response.code === 201) {
              navigate('/company-management');
                
            }
          }catch (error) {
            console.error("Lỗi khi thêm công ty:", error);
        }
          
          
      };

  useEffect (() => {
     const fetchDataPlanList = async () => {
            const list = await getAllPlans();

      if (list.code === 200 ||  list.code === 201) {
        setPlansList(
            type !== "new"
                ? list.data.filter((plan: plans )=> plan.code !== "TRIAL")
                : list.data
        );
    }
          }

    const  fetchData = async () => {
      if(type === "renew"){
        const response = await getCompaniesById(id ?? "");
        setCompanies(response.data);
      }

      if(type === "new"){
        const response = await getCompanyRegistrationById(id ?? "");
        setCompaniesNew(response.data);

      }

      const statusReponse = await getAllPaymentStatus();
      setPaymentStatusList(statusReponse.data);

      const methodReponse = await getAllPaymentMethod();
      setPaymentMethodList(methodReponse.data);
        
    }
    void fetchDataPlanList();
    void fetchData();
  },[id, type])



  
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
              {type === "renew" ? (
                  <div>
                <h3>{companies?.name}</h3>

                <div>Tên KH: {companies?.customType === 'PERSONAL' ? companies.userName : companies?.name}</div>
                <div>MST: {companies?.taxCode}</div>
                <div>Email: {companies?.email}</div>
                <div>Điện thoại: {companies?.phone}</div>
              </div>
              ):(
                <div>
                <h3>{companiesNew?.fullName}</h3>

                <div>Mã KH: {companiesNew?.customType === 'PERSONAL' ? companiesNew.userName : companies?.name}</div>
                <div>MST: {companiesNew?.taxCode}</div>
                <div>Email: {companiesNew?.email}</div>
                <div>Điện thoại: {companiesNew?.phone}</div>
              </div>
              )}
              

              {type === "renew" ? (
              
              <div className="current-plan">
                <span>Gói hiện tại</span>
                <h4>{companies?.plan}</h4>

                <p>Hết hạn: {companies?.endTime ? format(new Date(companies?.endTime), 'dd/MM/yyyy') : '---'}</p>
              </div>
              ): null}
              
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
              3. Chọn gói dịch vụ <span className="lik-red">*</span>
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
                      {plan.description?.split(",").map((item, index) => (
                            <li key={index}>{item.trim()}</li>
                            ))}
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
              4. Thời gian gia hạn <span className="lik-red">*</span>
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
              5. Hình thức thanh toán <span className="lik-red">*</span>
            </div>

            <div className="payment-methods">

              {paymentMethodList?.map(item => (
                 <label>
                <input
                  type="radio"
                  checked={
                    paymentMethod === item.id
                  }
                  onChange={() =>
                    setPaymentMethod(item.id)
                  }
                />
                {item.name}
              </label>
              ))}
            </div>
          </div>

          {/* Status */}
          
          <div className="card">
            <div className="card-title">
              5. Trạng thái thanh toán <span className="lik-red">*</span>
            </div>

            <div className="payment-methods">
              {paymentStatusList?.map(item => (
                              <label>
                <input
                  type="radio"
                  checked={
                    paymentStatus === item.id
                  }
                  onChange={() =>
                    setPaymentStatus(item.id)
                  }
                />
                {item.name}
              </label>
              ))}

              {/* <label>
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
              </label> */}

              {/* <label>
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
              </label> */}

              {/* <label>
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
              </label> */}
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
              {companies?.name}
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

          <button className="btn-submit"
              onClick={handleSubmit}
            > 
            Thanh toán
          </button>

          <button className="btn-cancel">
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  );
}