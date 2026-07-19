import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportQuotationPDF = async (): Promise<void> => {
  const element = document.getElementById("quotation-pdf");

  if (!element) {
    console.error("Không tìm thấy quotation-pdf");
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = 210;
    const pageHeight = 297;

    const imgWidth = pageWidth;

    const imgHeight =
      (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Trang đầu
    pdf.addImage(
      imgData,
      "PNG",
      0,
      position,
      imgWidth,
      imgHeight
    );

    heightLeft -= pageHeight;

    // Các trang tiếp theo
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;

      pdf.addPage();

      pdf.addImage(
        imgData,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= pageHeight;
    }

    pdf.save(
      `BaoGia-${new Date().getTime()}.pdf`
    );
  } catch (error) {
    console.error("Lỗi xuất PDF:", error);
  }
};