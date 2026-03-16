import { useState } from "react";
import "./SelectModal.scss";

const SelectModal = ({
    open,
    setOpen,
    data = [],
    columns = [],
    title,
    onSubmit
}) => {

    const [selected, setSelected] = useState([]);

    if (!open) return null;

    const toggle = (item) => {

        const exist = selected.find(x => x.id === item.id);

        if (exist) {
            setSelected(selected.filter(x => x.id !== item.id));
        } else {
            setSelected([...selected, item]);
        }
    };

    const handleAdd = () => {
        onSubmit(selected);
        setSelected([]);
        setOpen(false);
    };

    return (
        <div className="overlay">
            <div className="modal">

                <div className="modal-header">{title}</div>

                <div className="table-header">
                    <div></div>
                    {columns.map(col => (
                        <div key={col.field}>{col.label}</div>
                    ))}
                </div>

                <div className="modal-body">
                    {data.map(item => {

                        const checked = selected.find(x => x.id === item.id);

                        return (
                            <div
                                key={item.id}
                                className={`row ${checked ? "active" : ""}`}
                                onClick={() => toggle(item)}
                            >
                                <input type="checkbox" checked={!!checked} readOnly />

                                {columns.map(col => (
                                    <div key={col.field}>
                                        {item[col.field]}
                                    </div>
                                ))}

                            </div>
                        );
                    })}
                </div>

                <div className="modal-footer">
                    <button className="btn btn-cancel" onClick={() => setOpen(false)}>
                        Hủy
                    </button>
                    <button className="btn btn-add" onClick={handleAdd}>
                        Thêm
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SelectModal;
