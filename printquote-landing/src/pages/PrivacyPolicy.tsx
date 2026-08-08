
import Navbar from "../component/Navbar";
import styles from "./TermsOfUse.module.scss";
import Footer from "../component/Footer";
import PdfViewer from "../component/PdfViewer";

export default function PrivacyPolicy() {
  

  return (
    <div className={styles.page}>
      <Navbar />
    
             <main className={styles.content}>
                <PdfViewer file="/pdf/chinh-sach-bao-mat.pdf"/>
            </main>


      <Footer/>
    </div>
  );
}