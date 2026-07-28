import { useState } from "react";
import "./faq.scss";

const data=[

{
q:"Có dùng thử miễn phí không?",
a:"Có, bạn được dùng thử đầy đủ tính năng trong 14 ngày."
},

{
q:"Có xuất PDF không?",
a:"Có, hệ thống hỗ trợ xuất PDF chuyên nghiệp."
},

{
q:"Có cần cài đặt không?",
a:"Không. Chỉ cần trình duyệt web."
}

];

export default function FAQ(){

const [open,setOpen]=useState<number|null>(0);

return(

<section className="faq">

<div className="container">

<h2>Câu hỏi thường gặp</h2>

{
data.map((item,index)=>(

<div className="item" key={index}>

<div
className="question"
onClick={()=>setOpen(open===index?null:index)}
>

<span>{item.q}</span>

<strong>

{open===index?"−":"+"}

</strong>

</div>

{
open===index&&

<div className="answer">

{item.a}

</div>

}

</div>

))
}

</div>

</section>

)

}