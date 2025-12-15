// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â CreativeExportTools.jsx (Export Kit v1.0)
// ----------------------------------------------------------------------------
// Tools for exporting full Creative Kit as PDF, ZIP, JSON
// Works with CreativeKit V2.5
// ============================================================================

import JSZip from "jszip";
import { jsPDF } from "jspdf";

export default function CreativeExportTools({ creativeKit, productName }) {
  
  // --------------------------------------------------------------------------
  // 1) Export as PDF
  // --------------------------------------------------------------------------
  const exportPDF = () => {
    const pdf = new jsPDF();

    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text(`Core4.AI Creative Kit ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ${productName}`, 10, 15);

    pdf.setFont("Helvetica", "normal");
    pdf.setFontSize(12);

    let y = 30;

    pdf.text("ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬ Storyboard", 10, y);
    y += 10;

    creativeKit.storyboard.forEach((scene) => {
      pdf.text(`Scene ${scene.scene}: ${scene.title}`, 10, y);
      y += 6;
      pdf.text(`Description: ${scene.description}`, 10, y);
      y += 6;
      pdf.text(`Script: ${scene.script}`, 10, y);
      y += 10;
    });

    pdf.addPage();
    y = 20;

    pdf.text("ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â  Ad Variations (Top Ranked)", 10, y);
    y += 10;

    creativeKit.ad_variations_ranked.forEach((ad) => {
      pdf.text(`#${ad.id} ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ${ad.platform} ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â ${ad.angle}`, 10, y);
      y += 6;
      pdf.text(`Hook: ${ad.hook}`, 10, y);
      y += 6;
      pdf.text(`Score: ${ad.score}`, 10, y);
      y += 12;
    });

    pdf.addPage();
    y = 20;

    pdf.text("ÃƒÂ¢Ã…â€œÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â Copy Bank (Arabic Short)", 10, y);
    y += 10;

    creativeKit.copy_bank.arabic_short.forEach((line) => {
      pdf.text(`ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ ${line}`, 10, y);
      y += 6;
    });

    pdf.save(`${productName}_CreativeKit.pdf`);
  };

  // --------------------------------------------------------------------------
  // 2) Export as JSON
  // --------------------------------------------------------------------------
  const exportJSON = () => {
    const data = JSON.stringify(creativeKit, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${productName}_CreativeKit.json`;
    a.click();
  };

  // --------------------------------------------------------------------------
  // 3) Export ZIP (Media Kit)
  // --------------------------------------------------------------------------
  const exportZIP = async () => {
    const zip = new JSZip();

    // Text files
    zip.file("storyboard.txt", creativeKit.storyboard.map(s =>
      `Scene ${s.scene}: ${s.title}\n${s.description}\n${s.script}\n---\n`
    ).join("\n"));

    zip.file("broll_list.txt", creativeKit.broll_pack.join("\n"));
    zip.file("voiceover.txt", creativeKit.voiceover.lines.join("\n"));

    // Thumbnail
    const img = await fetch(creativeKit.thumbnail);
    const imgBlob = await img.blob();
    zip.file("thumbnail.jpg", imgBlob);

    // JSON data
    zip.file("creative_kit.json", JSON.stringify(creativeKit, null, 2));

    const content = await zip.generateAsync({ type: "blob" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(content);
    a.download = `${productName}_CreativeKit.zip`;
    a.click();
  };

  return (
    <div className="bg-white p-6 rounded-xl border shadow mt-10">
      <h3 className="text-xl font-bold mb-4 text-[#006C35]">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦ Download Export Kits
      </h3>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={exportPDF}
          className="px-4 py-3 bg-[#006C35] text-white rounded-lg font-bold w-full md:w-auto"
        >
          ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Å¾ Download PDF
        </button>

        <button
          onClick={exportZIP}
          className="px-4 py-3 bg-blue-700 text-white rounded-lg font-bold w-full md:w-auto"
        >
          ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦ Download ZIP Media Kit
        </button>

        <button
          onClick={exportJSON}
          className="px-4 py-3 bg-gray-800 text-white rounded-lg font-bold w-full md:w-auto"
        >
          ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§ Download JSON
        </button>
      </div>
    </div>
  );
}


