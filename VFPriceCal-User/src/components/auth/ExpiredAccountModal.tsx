import "./ExpiredAccountModal.scss";

interface ExpiredAccountModalProps {
  open: boolean;
  planMess: string;
  onClose?: () => void;
}

const getContent = (type?: string) => {
    switch (type) {
        case "TRIAL":
            return {
                title: "Thời gian dùng thử đã kết thúc",
                message:
                    "Tài khoản dùng thử của bạn đã hết hạn. Vui lòng nâng cấp lên gói dịch vụ chính thức để tiếp tục sử dụng hệ thống."
            };

        case "BASIC":
            return {
                title: "Gói Basic đã hết hạn",
                message:
                    "Gói Basic của bạn đã hết hạn. Vui lòng gia hạn để tiếp tục sử dụng các tính năng của hệ thống."
            };
        
        case "PRO":
            return {
                title: "Gói PRO đã hết hạn",
                message:
                    "Gói Pro của bạn đã hết hạn. Vui lòng gia hạn để tiếp tục sử dụng các tính năng nâng cao và dịch vụ hỗ trợ ưu tiên."
            };    
        default:
            return {
                title: "Tài khoản đã hết hạn",
                message:
                    "Thời hạn sử dụng tài khoản của bạn đã kết thúc. Vui lòng liên hệ quản trị viên để được hỗ trợ."
            };
    }
};

export default function ExpiredAccountModal({
  open,
  planMess
}: ExpiredAccountModalProps) {
  if (!open) return null;

  const content = getContent(planMess);

  return (
    <div className="expired-modal-overlay">
      <div className="expired-modal">
        <div className="expired-icon">⚠️</div>

        <h2>{content.title}</h2>

        <p>{content.message}</p>

        <div className="expired-contact">
          Email: vfprintquote@gmail.com
          <br />
          {/* Hotline: 0368 757 921 */}
        </div>

        <button
          className="expired-btn"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Đăng nhập lại
        </button>
      </div>
    </div>
  );
}