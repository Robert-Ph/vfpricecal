import { FiDownload } from "react-icons/fi";
import { exportQuotationPDF } from "../utils/exportPdf";
import QuotationTemplate from "./QuotationTemplate";
import { useState } from "react";

import "./QuotationPreview.scss";

export default function QuotationPreview() {
  const [customer, setCustomer] = useState({
  name: "",
  phone: "",
  address: "",
});
  return (
    <div className="previewPage">
      <div className="toolbar">
        <input
          placeholder="Khách hàng"
          value={customer.name}
          onChange={(e) =>
            setCustomer({ ...customer, name: e.target.value })
          }
        />

        <input
          placeholder="Điện thoại"
          value={customer.phone}
          onChange={(e) =>
            setCustomer({ ...customer, phone: e.target.value })
          }
        />

        <input
          placeholder="Địa chỉ"
          value={customer.address}
          onChange={(e) =>
            setCustomer({ ...customer, address: e.target.value })
          }
        />
        <button
          className="downloadBtn"
          onClick={exportQuotationPDF}
        >
          <FiDownload />
          Tải PDF
        </button>
      </div>

      <QuotationTemplate customer={customer}/>
    </div>
  );
}