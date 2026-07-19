import "./QuotationTemplate.scss";
import type { UserInfo } from "../context/AuthContext";
import {useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { formatMoney } from "../utils/formatMoney";
import type { proCal } from "../model/model";
import { getByCompanyId} from "../service/CompanyService";
import type { companyInfo} from "../model/model";

type Customer = {
  name: string;
  phone: string;
  address: string;
};

type Props = {
  customer: Customer;
};

export default function QuotationTemplate({ customer }: Props) {
  const { state } = useLocation();
  const {result, quantity, vat, processingList, paper, name} = state || {}; 
  const today = new Date();
  const [company, setCompany] = useState<companyInfo | null>(null);

  const currentDate = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
  const [user] = useState<UserInfo>(() => {

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
  
          useEffect(() => {
              const fetchCompanyInfo = async () => {
                  try {
                      const companyId = user?.companyId;
                      if (companyId) {
                          const response = await getByCompanyId(companyId);
                          setCompany(response.data);
                      }
      
                      
                  } catch (error) {
                      console.error("Lỗi khi lấy thông tin công ty:", error);
                  }
              };
      
              fetchCompanyInfo();
          }, [user?.companyId]);
  return (
    <div id="quotation-pdf" className="quotation">

      {/* HEADER */}
      <div className="header">

        <div className="company">
          <div className="logo">
            🖨️
          </div>

          <div>
            <h1>{user.fullname}</h1>

            <p>
              NHANH CHÓNG - CHẤT LƯỢNG - GIÁ TỐT
            </p>

            <div className="contact">
              <div>📍 {company?.address}</div>
              <div>📞 {company?.phone}</div>
              <div>✉️ {company?.email}</div>
            </div>
          </div>
        </div>

        <div className="quotationInfo">
          <h2>BÁO GIÁ</h2>

          <span>DỊCH VỤ IN NHANH</span>

          <div className="meta">
            <div>📅 Ngày báo giá: {currentDate}</div>
            {/* <div>📄 Mã báo giá: BG250718001</div> */}
            {/* <div>⏰ Hiệu lực đến: 25/07/2026</div> */}
          </div>
        </div>

      </div>

      {/* CUSTOMER */}

      <div className="customerBox">

        <div className="sectionTitle">
          THÔNG TIN KHÁCH HÀNG
        </div>

        <div className="customerContent">

          <div>
            <p>
              <strong>Khách hàng:</strong> {customer.name}
            </p>

            <p>
              <strong>Điện thoại:</strong> {customer.phone}
            </p>

            {/* <p>
              <strong>Email:</strong> abc@gmail.com
            </p> */}
          </div>

          <div>
            <p>
              <strong>Địa chỉ:</strong> {customer.address}
            </p>

            <p>
              <strong>Ghi chú:</strong> In theo mẫu gửi
            </p>
          </div>

        </div>

      </div>

      {/* PRODUCT TABLE */}

      <div className="tableBox">

        <div className="sectionTitle center">
          DANH SÁCH SẢN PHẨM
        </div>

        <table>

          <thead>
            <tr>
              <th>STT</th>
              <th>Hạng mục</th>
              <th>SL</th>
              <th>Đơn vị</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>

          <tbody>

            <tr className="productRow">
              <td>1</td>

              <td>
                <div className="productName">
                  {name}
                </div>
                <div className="productDesc">
                  {paper}
                </div>
                {processingList.map((item: proCal) =>(
                  <div className="productDesc">
                    {item.name}
                  </div>
                ))}

                {/* <div className="productDesc">
                  Kích thước: 90x54mm
                </div>

                <div className="productDesc">
                  Giấy Couche 300gsm <br /> Cán màng
                </div> */}
              </td>

              <td>{quantity}</td>
              <td>Cái</td>
              <td>{formatMoney( result.price / quantity)}</td>
              <td className="price">
                {formatMoney(result.price)}
              </td>
            </tr>

            {/* <tr className="processingRow">
              <td></td>
              <td>↳ Cán màng bóng</td>
              <td>1000</td>
              <td>Cái</td>
              <td>100 đ</td>
              <td>100.000 đ</td>
            </tr> */}

            {/* <tr className="processingRow">
              <td></td>
              <td>↳ Ép kim vàng</td>
              <td>1000</td>
              <td>Cái</td>
              <td>150 đ</td>
              <td>150.000 đ</td>
            </tr> */}

            {/* <tr className="productRow">
              <td>2</td>

              <td>
                <div className="productName">
                  Tờ rơi A5
                </div>

                <div className="productDesc">
                  Kích thước A5
                </div>
              </td>

              <td>5000</td>
              <td>Cái</td>
              <td>700 đ</td>
              <td className="price">
                3.500.000 đ
              </td>
            </tr> */}

          </tbody>

        </table>

      </div>

      {/* SUMMARY */}

      <div className="summary">

        <div className="row">
          <span>Tạm tính</span>
          <span>{formatMoney(result.price)}</span>
        </div>

        <div className="row">
          <span>VAT ({vat}%)</span>
          <span>{formatMoney(result.price *(vat/100) || 0)}</span>
        </div>

        <div className="row total">
          <span>TỔNG CỘNG</span>
          <span>{formatMoney(
                            ((result?.price || 0) - 
                            (result?.discount || 0)) +
                            (result?.price || 0) *
                            ((vat || 0) / 100)
                        )}</span>
        </div>

      </div>

      {/* FOOTER */}

      <div className="footer">

        <div className="note">

          <h4>GHI CHÚ</h4>

          <ul>
            <li>
              Báo giá có hiệu lực trong vòng 07 ngày.
            </li>

            <li>
              Giá chưa bao gồm VAT.
            </li>

            <li>
              Thời gian sản xuất từ 2-3 ngày.
            </li>

            <li>
              Cảm ơn quý khách đã tin tưởng.
            </li>
          </ul>

        </div>

        <div className="signature">
          <strong>ĐẠI DIỆN CÔNG TY <br /><span>(Ký, ghi rõ họ tên)</span></strong>
          <br />
          <div className="line"></div>

        </div>

        <div className="signature">
          <strong>KHÁCH HÀNG <br /><span>(Ký, ghi rõ họ tên)</span></strong>
          <br />
          <div className="line"></div>

        </div>

      </div>

    </div>
  );
}