import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";

const CoverLetterPage = () => {
  const resumeData = JSON.parse(localStorage.getItem("resumeData") || "{}");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [tone, setTone] = useState("formal");
  const [signature, setSignature] = useState(null);
  const [showLetter, setShowLetter] = useState(false);
  const letterRef = useRef();

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSignature(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const generateCoverLetter = (e) => {
    e.preventDefault();
    setShowLetter(true);
  };

  const downloadPDF = () => {
    const element = letterRef.current;
    const opt = {
      margin: 0.5,
      filename: `${resumeData.name || "cover_letter"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const renderLetterContent = () => {
    const intro =
      tone === "formal"
        ? `I am writing to express my strong interest in the position of ${position} at ${company}.`
        : `I'm thrilled to be applying for the ${position} role at ${company}!`;

    const skills = resumeData.skills || "a variety of technical and interpersonal skills";
    const experience = resumeData.experience || "a solid background in relevant work";

    const outro =
      tone === "formal"
        ? `Thank you for your time and consideration. I look forward to the possibility of contributing to ${company}.`
        : `Thanks a lot for checking out my application — I'd love the opportunity to bring my energy to the ${company} team!`;

    return (
      <>
        <p>Dear Hiring Manager,</p>
        <p>{intro}</p>
        <p>
          With experience in {experience} and skills in {skills}, I believe I would be a great fit for your team.
        </p>
        <p>{outro}</p>
        <p>Sincerely,</p>
        {signature && (
          <img
            src={signature}
            alt="Signature"
            style={{ maxWidth: "200px", height: "auto", marginBottom: "10px" }}
          />
        )}
        <p>{resumeData.name || "Your Name"}</p>
      </>
    );
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "30px" }}>
      <h1>Cover Letter Generator</h1>

      <form onSubmit={generateCoverLetter} style={{ marginBottom: "30px" }}>
        <label>
          Company Name:
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            style={{ display: "block", marginBottom: "15px", padding: "8px", width: "100%" }}
          />
        </label>

        <label>
          Position:
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
            style={{ display: "block", marginBottom: "15px", padding: "8px", width: "100%" }}
          />
        </label>

        <label>
          Tone:
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            style={{ display: "block", marginBottom: "15px", padding: "8px", width: "100%" }}
          >
            <option value="formal">Formal</option>
            <option value="enthusiastic">Enthusiastic</option>
          </select>
        </label>

        <label>
          Upload Signature (optional):
          <input
            type="file"
            accept="image/*"
            onChange={handleSignatureUpload}
            style={{ display: "block", marginBottom: "15px" }}
          />
        </label>

        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Generate Cover Letter
        </button>
      </form>

      {showLetter && (
        <>
          <div
            ref={letterRef}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
              marginBottom: "20px",
              fontFamily: "Georgia, serif",
              lineHeight: "1.6",
            }}
          >
            {renderLetterContent()}
          </div>
          <button
            onClick={downloadPDF}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Download as PDF
          </button>
        </>
      )}
    </div>
  );
};

export default CoverLetterPage;



