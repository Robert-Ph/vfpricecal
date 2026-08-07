
import Navbar from "../component/Navbar";
import styles from "./TermsOfUse.module.scss";
import Footer from "../component/Footer";
import PdfViewer from "../component/PdfViewer";

export default function TermsOfUser() {
  

  return (
    <div className={styles.page}>
      <Navbar />
    
             <main className={styles.content}>
                <PdfViewer file="pdf/Điều khoản sử dụng PrintQuote.pdf"/>
            </main>


      <Footer/>
    </div>
  );
}