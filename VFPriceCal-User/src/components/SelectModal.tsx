import "./selectModal.scss";

const SelectModal = ({ open, setOpen, data, onSelect, title }) => {
    if (!open) return null;

    return (
        <div className="overlay">
            <div className="modal">

                <h3>{title}</h3>

                {data.map(item => (
                    <div
                        key={item.id}
                        className="row"
                        onClick={() => {
                            onSelect(item);
                            setOpen(false);
                        }}
                    >
                        {item.name}
                    </div>
                ))}

            </div>
        </div>
    );

}

export default SelectModal;