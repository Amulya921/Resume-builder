import React, { useState, useEffect } from "react";

const stopWords = new Set([
  "about", "above", "after", "again", "against", "all", "also", "any", "because", "been",
  "before", "being", "below", "between", "both", "but", "could", "does", "doing", "down",
  "during", "each", "few", "from", "further", "have", "having", "into", "just", "more",
  "most", "other", "over", "same", "should", "some", "such", "than", "that", "their", "there",
  "these", "they", "this", "those", "through", "under", "until", "very", "were", "what",
  "when", "where", "which", "while", "will", "with", "would", "your", "you", "the", "and", "for"
]);

const getKeywords = (text) =>
  new Set(
    text
      .toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 4 && !stopWords.has(word))
  );

const extractJobSections = (text) => {
  const sections = {
    skills: '',
    experience: '',
    projects: '',
    education: '',
    summary: ''
  };

  const lowerText = text.toLowerCase();
  const skillMatch = text.match(/skills?:?([\s\S]*?)(?=(requirements|qualifications|experience|projects|education|$))/i);
  const expMatch = text.match(/(experience|responsibilities):?([\s\S]*?)(?=(skills|projects|education|$))/i);
  const projMatch = text.match(/projects?:?([\s\S]*?)(?=(skills|experience|education|$))/i);
  const eduMatch = text.match(/education:?:?([\s\S]*?)(?=(skills|experience|projects|$))/i);

  if (skillMatch) sections.skills = skillMatch[1];
  if (expMatch) sections.experience = expMatch[2];
  if (projMatch) sections.projects = projMatch[1];
  if (eduMatch) sections.education = eduMatch[1];

  sections.summary = text; // default to full text for summary

  return sections;
};

const JobMatcher = () => {
  const [formData, setFormData] = useState({});
  const [jobDescription, setJobDescription] = useState("");
  const [sectionMatches, setSectionMatches] = useState({});
  const [missingKeywords, setMissingKeywords] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("resumeData");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const handleMatchResume = () => {
    const resumeSections = {
      summary: formData.summary || "",
      skills: Array.isArray(formData.skills) ? formData.skills.join(" ") : formData.skills || "",
      experience: Array.isArray(formData.experience) ? formData.experience.join(" ") : formData.experience || "",
      projects: Array.isArray(formData.projects) ? formData.projects.join(" ") : formData.projects || "",
      education: Array.isArray(formData.education) ? formData.education.join(" ") : formData.education || ""
    };

    const jobSections = extractJobSections(jobDescription);
    const newSectionMatches = {};
    const newMissingKeywords = {};

    for (const [section, resumeText] of Object.entries(resumeSections)) {
      const resumeKeywords = getKeywords(resumeText);
      const jobText = jobSections[section] || "";
      const jobKeywords = getKeywords(jobText);

      const matched = [...jobKeywords].filter(word => resumeKeywords.has(word));
      const missing = [...jobKeywords].filter(word => !resumeKeywords.has(word));

      const matchPercent = jobKeywords.size > 0
        ? Math.round((matched.length / jobKeywords.size) * 100)
        : 0;

      newSectionMatches[section] = {
        matchPercent,
        matchedCount: matched.length,
        totalKeywords: jobKeywords.size
      };

      newMissingKeywords[section] = missing.slice(0, 5);
    }

    setSectionMatches(newSectionMatches);
    setMissingKeywords(newMissingKeywords);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>🎯 Job Description Matcher</h2>

      <textarea
        placeholder="Paste the job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows="10"
        style={{ width: "100%", padding: "10px", marginBottom: "10px", fontSize: "16px" }}
      />

      <button
        onClick={handleMatchResume}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Analyze Resume
      </button>

      {Object.keys(sectionMatches).length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Match Scores by Section</h3>
          {Object.entries(sectionMatches).map(([section, data]) => (
            <div key={section} style={{ marginBottom: "15px" }}>
              <h4 style={{ textTransform: "capitalize", marginBottom: "5px" }}>{section}</h4>
              <div style={{ 
                background: "#e0e0e0", 
                borderRadius: "8px", 
                overflow: "hidden", 
                height: "20px", 
                width: "100%" 
              }}>
                <div
                  style={{
                    width: `${data.matchPercent}%`,
                    backgroundColor: data.matchPercent >= 75 ? "#4caf50" : "#ff9800",
                    height: "100%",
                    transition: "width 0.5s ease"
                  }}
                />
              </div>
              <p style={{ marginTop: "5px", fontWeight: "bold" }}>
                {data.matchPercent}% match ({data.matchedCount} of {data.totalKeywords} keywords)
              </p>

              {missingKeywords[section] && missingKeywords[section].length > 0 && (
                <div style={{ marginTop: "5px" }}>
                  <p style={{ fontWeight: "600", color: "#d9534f" }}>
                    Missing important keywords:
                  </p>
                  <ul style={{ paddingLeft: "20px", lineHeight: "1.5" }}>
                    {missingKeywords[section].map((word, idx) => (
                      <li key={idx} style={{ color: "#d9534f" }}>
                        {word}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobMatcher;





