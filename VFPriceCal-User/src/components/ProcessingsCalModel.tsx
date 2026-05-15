import { useEffect, useState } from "react";
import "./processingsCalModel.scss";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import {
    getCategories,
    getProcessingById,
} from "../service/ProcessingService";

interface ProcessingItem {
    id: number;
    name: string;
}

interface ProcessingTypeResponse {
    processings: ProcessingItem[];
}

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onAdd: (data: any) => void;
    data: any[];
}

const ProcessingsCalModel = ({
    open,
    setOpen,
    onAdd,
    data
}: Props) => {

    const [processingNameList, setProcessingNameList] = useState<ProcessingItem[]>([]);

    const [typeList, setTypeList] = useState<ProcessingTypeResponse | null>(null);

    const [processingName, setProcessingName] =useState<number | null>(null);

    const [type, setType] =useState("");

    const [error, setError] = useState("");

    const [user] = useState(() => {
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
            try {
                return JSON.parse(savedUser);
            } catch (e) {
                return null;
            }
        }

        return null;
    });

    // Lấy danh sách tên gia công
    useEffect(() => {

        const fetchProcessingNames = async () => {
            try {
                const data = await getCategories(user.companyId);

                setProcessingNameList(data.data || []);

            } catch (error) {
                console.error(
                    "Lỗi khi lấy danh sách tên gia công:",
                    error
                );
            }
        };

        if (open) {
            fetchProcessingNames();
        }

    }, [open]);

    // Lấy loại theo processing đã chọn
    useEffect(() => {

        const fetchTypes = async () => {

            if (!processingName) return;

            try {
                const data = await getProcessingById(
                    processingName
                );

                setTypeList(data.data);

            } catch (error) {
                console.error(
                    "Lỗi khi lấy danh sách loại gia công:",
                    error
                );
            }
        };

        fetchTypes();

    }, [processingName]);

    const handleSubmit = () => {

        if (!processingName || !type) {

            setError("Vui lòng điền đầy đủ thông tin.");

            toast.error("Vui lòng điền đầy đủ thông tin.");

            return;
        }

        const selectedProcessing = processingNameList.find(
            (item) => item.id === processingName
        );
        // Tên processing
        const processingText = selectedProcessing?.name || "";
       // Kiểm tra trùng
    const isDuplicate = data.some(
    (item) =>
        String(item.processing).toLowerCase() ===
            processingText.toLowerCase() &&
        String(item.type).toLowerCase() ===
            type.toLowerCase()
);

    if (isDuplicate) {
        setError("Dữ liệu đã tồn tại.");

        toast.error("Dữ liệu đã tồn tại.");

        return;
    }


        const newData = {
            id: processingName,
            name: type,
        };

        onAdd(newData);

        setOpen(false);

        // Reset
        setProcessingName(null);
        setType("");
        setError("");

        toast.success("Thêm gia công thành công");
    };

    if (!open) return null;

    return (
        <div className="overlay">

            <div className="modal">

                <div className="modal-header">
                    Thông tin gia công
                </div>

                <div className="main">

                    <div className="info">

                        <label>Tên gia công</label>

                        <select
                            value={processingName ?? ""}
                            onChange={(e) =>
                                setProcessingName(
                                    Number(e.target.value)
                                )
                            }
                        >

                            <option value="">
                                Chọn gia công
                            </option>

                            {processingNameList.map((item) => (

                                <option
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.name}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="info">

                        <label>Loại</label>

                        <select
                            value={type ?? ""}
                            onChange={(e) =>
                                setType(e.target.value)
                            }
                        >

                            <option value="">
                                Chọn loại
                            </option>

                            {typeList?.processings?.map((item) => (

                                <option
                                    key={item.id}
                                    value={item.name}
                                >
                                    {item.name}
                                </option>

                            ))}

                        </select>

                    </div>

                    {error && (
                        <p className="error-text">
                            {error}
                        </p>
                    )}

                </div>

                <div className="modal-footer">

                    <button
                        className="btn btn-cancel"
                        onClick={() => setOpen(false)}
                    >
                        Hủy
                    </button>

                    <button
                        className="btn btn-add"
                        onClick={handleSubmit}
                    >
                        Xác nhận
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ProcessingsCalModel;