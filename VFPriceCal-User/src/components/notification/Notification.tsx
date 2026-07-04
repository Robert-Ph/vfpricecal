import "./Notification.scss";

interface NotificationModalProps {
  open: boolean;
  planMess: string;
  onClose?: () => void;
}


export default function NotificationModal({
  open,
  planMess
}: NotificationModalProps) {
  if (!open) return null;


  return (
    <div className="notification-modal-overlay">
      <div className="notification-modal">
        <div className="notification-icon">⚠️</div>

        <h2>Thông báo</h2>

        <p>{planMess}</p>

        <button
          className="notification-btn"
          onClick={() => {
            window.location.reload();
          }}
        >
          Đồng ý
        </button>
      </div>
    </div>
  );
}