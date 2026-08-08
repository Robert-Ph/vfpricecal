
import Navbar from "../component/Navbar";
import styles from "./TermsOfUse.module.scss";
import Footer from "../component/Footer";
import PdfViewer from "../component/PdfViewer";

export default function TermsOfUser() {
  

  return (
    <div className={styles.page}>
      <Navbar />
    
             <main className={styles.content}>
                <PdfViewer file="/pdf/dieu-khoan-su-dung.pdf"/>
            </main>


      <Footer/>
    </div>
  );
}