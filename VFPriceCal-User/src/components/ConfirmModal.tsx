import "./confirmModal.scss";

interface ConfirmModalProps {
    isOpen: boolean;
    title?: string;
    message?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal = ({
    isOpen,
    title = "Xác nhận xoá",
    message = "Bạn có chắc muốn xoá dữ liệu này?",
    onConfirm,
    onCancel,
}: ConfirmModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-modal-overlay">
            <div className="confirm-modal">
                <h3>{title}</h3>

                <p>{message}</p>

                <div className="confirm-actions">
                    <button
                        className="cancel-btn"
                        onClick={onCancel}
                    >
                        Huỷ
                    </button>

                    <button
                        className="confirm-btn"
                        onClick={onConfirm}
                    >
                        Xoá
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;