// ============================================================================
// 💚 Core4.AI — pdfExport.js (Beta PDF Engine)
// ----------------------------------------------------------------------------
// • Converts any DOM section into a multipage PDF
// • Supports Arabic text + tables + images
// • No backend required
// ============================================================================

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportPDF(elementId, fileName = "Campaign_Report.pdf") {
  const input = document.getElementById(elementId);

  if (!input) {
    alert("⚠ PDF export failed — element not found.");
    return;
  }

  const canvas = await html2canvas(input, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = 210;
  const pdfHeight = (canvas.height * 210) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

  // Handle multipage content
  let position = -295;
  while (position < pdfHeight) {
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    position += 295;
  }

  pdf.save(fileName);
}
