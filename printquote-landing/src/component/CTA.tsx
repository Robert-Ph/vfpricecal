import "./cta.scss";
import { useNavigate } from "react-router-dom";

export default function CTA(){
    const navigate = useNavigate();

return(

<section className="cta">

    <div className="container">
        <h2>
            Sẵn sàng trải nghiệm?
        </h2>
        <p>
            Bắt đầu sử dụng hệ thống báo giá in ấn ngay hôm nay.
        </p>
        <div className="buttons">
            <button onClick={() => navigate("/dang-ky-dung-thu")}>
                Dùng thử miễn phí
            </button>
            <button className="outline">
                Liên hệ
            </button>
        </div>
    </div>

</section>

)

}