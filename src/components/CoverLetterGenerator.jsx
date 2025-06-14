import React, { useState } from "react";

const CoverLetterGenerator = () => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const CoverLetterGenerator = ({ resumeData }) => {
  const generateLetter = () => {
  const { name, summary, skills, experience } = resumeData;

  const generated = `
Dear Hiring Manager,

I am excited to apply for the position of ${position} at ${company}. With my background in ${experience || "relevant experience"} and skills in ${skills || "key areas"}, I believe I am well-suited for this role.

${summary || "I am passionate about continuous learning and professional growth."}

I would welcome the opportunity to contribute to ${company}'s success and discuss how I can bring value to your team.

Sincerely,  
${name || "[Your Name]"}
  `.trim();

  setCoverLetter(generated);
};


  return (
    <div className="cover-letter-container">
      <h2>Cover Letter Generator</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="text"
          placeholder="Position Title"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <button onClick={generateLetter}>Generate Cover Letter</button>
      </div>

      {coverLetter && (
        <div className="cover-letter-preview">
          <h3>Generated Cover Letter</h3>
          <textarea value={coverLetter} readOnly rows="12" />
        </div>
      )}
    </div>
  );
};
};

export default CoverLetterGenerator;
