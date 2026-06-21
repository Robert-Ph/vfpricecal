import { useEffect, useState } from "react";
import "./processingsCalModel.scss";
import { toast } from "react-toastify";
import {
    getCategories,
    getProcessingById,
} from "../../service/ProcessingService";
import type { proCal } from "../../model/model";

interface ProcessingItem {
    id: string;
    name: string;
}

interface ProcessingTypeResponse {
    processings: ProcessingItem[];
}

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onAdd: (data: proCal) => void;
    companyId: string;
    data: proCal[];
}

const ProcessingsCalModel = ({
    open,
    setOpen,
    onAdd,
    companyId,
    data
}: Props) => {

    const [processingNameList, setProcessingNameList] = useState<ProcessingItem[]>([]);

    const [typeList, setTypeList] = useState<ProcessingTypeResponse | null>(null);

    const [processingName, setProcessingName] =useState<string>("");

    const [type, setType] =useState("");

    const [error, setError] = useState("");

    // Lấy danh sách tên gia công
    useEffect(() => {

        const fetchProcessingNames = async () => {
            try {
                const data = await getCategories(companyId);

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

    }, [open,  companyId]);

    // Lấy loại theo processing đã chọn
    useEffect(() => {

        const fetchTypes = async () => {

            if (!processingName) return;

            try {
                const data = await getProcessingById(processingName);

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

       // Kiểm tra trùng
 const isDuplicate = data.some(
    (item) =>
        String(item.id) === String(processingName) ||
        item.name.trim().toLowerCase() ===
            type.trim().toLowerCase()
);

if (isDuplicate) {
    setError("Gia công này đã được chọn.");
    return;
}

console.log("category:", processingName)

        const newData = {
            id: processingName,
            name: type,
           
        };

        onAdd(newData);

        setOpen(false);

        // Reset
        setProcessingName("");
        setType("");
        setError("");

    };

    if (!open) return null;

    return (
        <div className="overlay-modal">

            <div className="modal">

                <div className="modal-header">
                    Thông tin gia công
                </div>

                <div className="main-modal">
                   

                    <div className="info">

                        <label>Tên gia công</label>

                        <select
                            value={processingName ?? ""}
                            onChange={(e) =>
                                setProcessingName(
                                    e.target.value
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