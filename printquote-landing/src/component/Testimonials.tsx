import "./testimonials.scss";

const reviews = [
    {
        name:"Nguyễn Văn A",
        company:"ABC Printing",
        text:"Hệ thống giúp công ty tôi giảm hơn 80% thời gian làm báo giá."
    },
    {
        name:"Trần Minh",
        company:"Minh Phát",
        text:"Giao diện đẹp, dễ dùng và xuất PDF cực nhanh."
    },
    {
        name:"Lê Quốc",
        company:"An Khang",
        text:"Khách hàng rất thích mẫu báo giá chuyên nghiệp."
    }
]

export default function Testimonials(){

    return(

<section className="testimonials">

<div className="container">

<h2>Khách hàng nói gì?</h2>

<div className="cards">

{
reviews.map((item,index)=>(

<div className="card" key={index}>

⭐⭐⭐⭐⭐

<p>{item.text}</p>

<h4>{item.name}</h4>

<span>{item.company}</span>

</div>

))
}

</div>

</div>

</section>

    )

}