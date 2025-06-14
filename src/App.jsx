import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import html2pdf from "html2pdf.js";
import Template from "./Template.jsx";
import industrySuggestions from "./utils/industrySuggestions";
import atsKeywords from "./utils/atsKeywords";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const App = () => {
   const [theme, setTheme] = useState("light");
  const [atsScore, setAtsScore] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    education: [{ degree: "", institution: "", year: "", details: "" }],
    skills: "",
    experience: [{ title: "", company: "", year: "", details: "" }],
    summary: "",
    projects: [{ title: "", description: "" }],
    certifications: [{ title: "", issuer: "", year: "", details: "" }],
    achievements: [],
    photo: null,
    languages: "",
    industry: "",
    linkedin: "",
    github: "",
    portfolio: "",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [feedback, setFeedback] = useState("");
  const [skillEntry, setSkillEntry] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [eduEntry, setEduEntry] = useState({
    degree: "",
    institution: "",
    year: "",
    details: "",
  });
  const [expEntry, setExpEntry] = useState({
    title: "",
    company: "",
    year: "",
    details: "",
  });
  const [projEntry, setProjEntry] = useState({
    title: "",
    description: "",
    link: "",
  });
  const [certEntry, setCertEntry] = useState({
    title: "",
    issuer: "",
    year: "",
    details: "",
  });
  const [achieveEntry, setAchieveEntry] = useState({
    title: "",
    year: "",
    description: "",
  });

  const [industryData, setIndustryData] = useState({
    summary: "",
    skills: "",
  });

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    const savedTemplate = localStorage.getItem("selectedTemplate");
    const savedTheme = localStorage.getItem("theme");
    if (savedData) setFormData(JSON.parse(savedData));
    if (savedTemplate) setSelectedTemplate(savedTemplate);
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Persist to localStorage when formData changes
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("selectedTemplate", selectedTemplate);
  }, [selectedTemplate]);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleIndustrySuggestions = (industry) => {
    if (industrySuggestions[industry]) {
      setIndustryData(industrySuggestions[industry]);
    } else {
      setIndustryData({
        summary: "",
        skills: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "industry") {
      handleIndustrySuggestions(value);
    }
  };

  const handleDownload = () => {
    const element = document.getElementById("resume-preview");
    const opt = {
      margin: 0.5,
      filename: `${formData.name || "resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(element).set(opt).save();
  };
 const handleSave = () => {
  const errors = validateForm(); // ✅ call validation first
  if (Object.keys(errors).length > 0) {
    setFormErrors(errors); // show errors in the form
    alert("Please fix the errors before saving.");
    return;
  }

  try {
    const dataToSave = JSON.stringify(formData);
    localStorage.setItem("savedResume", dataToSave);
    alert("Resume data saved successfully!");
  } catch (error) {
    console.error("Error saving resume data:", error);
    alert("Failed to save resume data.");
  }
};

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear the form?")) {
      setFormData(emptyForm);
      localStorage.removeItem("resumeData");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setAtsScore(null);
      setFeedback("");
    }
  };
  const provideFeedback = (data) => {
    let msg = "";
    if (!data.name) msg += "Please add your name. ";
    if (!data.email) msg += "Email is missing. ";
    if (!data.skills) msg += "Skills section is empty. ";
    if (!data.experience) msg += "Experience section is missing. ";
    if (!data.summary) msg += "Summary is empty. ";
    if (!data.education) msg += "Education section is missing. ";
    setFeedback(msg || "All required sections are filled.");
  };

  const generateSummary = () => {
    const { name, skills, experience } = formData;
    const skillList = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const skillSentence = skillList.length
      ? `Skilled in ${skillList.join(", ")}.`
      : "";
    const experienceSentence = experience
      ? `Has experience in ${experience}.`
      : "";
    const summary = `${
      name ? `${name} is a results-driven professional. ` : ""
    }${skillSentence} ${experienceSentence} Eager to contribute through dedication and continuous learning.`;
    setFormData((prev) => ({ ...prev, summary }));
  };
  const addEducation = () => {
    if (!eduEntry.degree.trim() || !eduEntry.institution.trim()) return;
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, eduEntry],
    }));

    setEduEntry({ degree: "", institution: "", year: "", details: "" });
  };
  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...(Array.isArray(prev.experience) ? prev.experience : []),
        expEntry,
      ],
    }));

    setExpEntry({
      title: "",
      company: "",
      year: "",
      details: "",
    });
  };

  const addSkill = () => {
    if (skillEntry.trim() === "") return;
    setFormData((prev) => ({
      ...prev,
      skills: [...(prev.skills || []), skillEntry.trim()],
    }));
    setSkillEntry("");
  };
  const addProject = () => {
    if (!projEntry.title?.trim()) {
      alert("Project title is required");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      projects: [
        ...(prev.projects || []),
        {
          title: projEntry.title.trim(),
          description: projEntry.description?.trim() || "",
          link: projEntry.link?.trim() || "",
        },
      ],
    }));

    setProjEntry({ title: "", description: "", link: "" });
  };

  const addCertification = () => {
    if (!certEntry.title.trim() || !certEntry.issuer.trim()) {
      alert("Please enter both Certification Name and Issuer");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      certifications: [...(prev.certifications || []), certEntry],
    }));

    setCertEntry({ title: "", issuer: "", year: "", details: "" });
  };
  const addAchievement = () => {
  if (!achieveEntry.title.trim()) {
    alert("Achievement title is required");
    return;
  }

  setFormData((prev) => ({
    ...prev,
    achievements: [...(prev.achievements || []), achieveEntry],
  }));

  setAchieveEntry({ title: "", year: "", description: "" });
};
  const calculateATSScore = () => {
    const keywords = [
      "developed",
      "managed",
      "designed",
      "led",
      "created",
      "engineered",
      "implemented",
    ];
    const content = `${formData.summary} ${formData.experience} ${formData.skills} ${formData.projects} ${formData.education}`.toLowerCase();
    let score = 0;
    [
      "name",
      "email",
      "phone",
      "summary",
      "experience",
      "education",
      "skills",
      "projects",
    ].forEach((f) => {
      if (formData[f]) score += 10;
    });
    const matches = keywords.reduce(
      (cnt, w) => (content.includes(w) ? cnt + 1 : cnt),
      0
    );
    score = Math.min(100, score + matches * 3);
    setAtsScore(score);
  };

  const getAtsSuggestions = () => {
    const relevant = atsKeywords[formData.industry] || [];
    const text = `${formData.summary} ${formData.skills} ${formData.experience} ${formData.projects}`.toLowerCase();
   const missing = relevant.filter((keyword) => !text.includes(keyword.toLowerCase()));
const suggs = [];
if (missing.length)
  suggs.push(`Consider including keywords: ${missing.join(", ")}`);
if (formData.skills.split(",").length > 15)
  suggs.push("Too many skills listed — consider shortening for clarity.");
if (formData.photo)
  suggs.push("Avoid using a photo in ATS resumes — many systems skip images.");
return suggs;

  };
  const validateForm = () => {
  const errors = {};
  
  if (!formData.name.trim()) errors.name = "Full name is required.";
  
  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Invalid email format.";
  }

  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\d{10}$/.test(formData.phone)) {
    errors.phone = "Phone number must be 10 digits.";
  }

  return errors;
};

return (
  <div className={`app-container ${theme}`}>
    <div className="content-container">
      {/* LEFT column: form, templates, feedback, actions */}
      <div className="left-column">
        <div className="form-section">
          <h2>Resume Builder</h2>
          <form noValidate>
            {/* Photo upload */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  photo: URL.createObjectURL(e.target.files[0]),
                }))
              }
            />

            {/* Basic info inputs */}
           <input
  type="text"
  name="name"
  placeholder="Full Name"
  value={formData.name}
  onChange={handleChange}
/>
{formErrors.name && <p className="error">{formErrors.name}</p>}

<input
  type="email"
  name="email"
  placeholder="Email"
  value={formData.email}
  onChange={handleChange}
/>
{formErrors.email && <p className="error">{formErrors.email}</p>}

<input
  type="tel"
  name="phone"
  placeholder="Phone Number"
  value={formData.phone}
  onChange={handleChange}
/>
{formErrors.phone && <p className="error">{formErrors.phone}</p>}


            {/* Industry select */}
            <label htmlFor="industry">Industry</label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
            >
              <option value="">Select Industry</option>
              <option value="software">Software</option>
              <option value="marketing">Marketing</option>
              {/* Add more options here */}
            </select>

            {/* Industry suggestions */}
            {industryData.summary && (
              <div className="suggestions-section">
                <h3>Industry Suggestions</h3>
                <div>
                  <p>
                    <strong>Summary:</strong> {industryData.summary}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        summary: industryData.summary,
                      }))
                    }
                  >
                    Add Summary
                  </button>
                </div>

                {industryData.skills && (
                  <div>
                    <p>
                      <strong>Skills:</strong> {industryData.skills}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          skills: prev.skills
                            ? `${prev.skills}, ${industryData.skills}`
                            : industryData.skills,
                        }))
                      }
                    >
                      Add Skills
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Social links */}
            <div className="social-links">
              <label>LinkedIn:</label>
              <input
                type="url"
                name="linkedin"
                placeholder="https://linkedin.com/in/you"
                value={formData.linkedin}
                onChange={handleChange}
              />
              <label>GitHub:</label>
              <input
                type="url"
                name="github"
                placeholder="https://github.com/you"
                value={formData.github}
                onChange={handleChange}
              />
              <label>Portfolio:</label>
              <input
                type="url"
                name="portfolio"
                placeholder="https://yourportfolio.com"
                value={formData.portfolio}
                onChange={handleChange}
              />
            </div>

            {/* Summary textarea */}
            <textarea
              name="summary"
              placeholder="Professional Summary"
              value={formData.summary}
              onChange={handleChange}
            />
            <button type="button" onClick={generateSummary}>
              Generate Summary
            </button>

            {/* Education Section */}
            <section>
              <h3>Education</h3>
              <div>
                <input
                  type="text"
                  placeholder="Degree"
                  value={eduEntry.degree}
                  onChange={(e) =>
                    setEduEntry((prev) => ({ ...prev, degree: e.target.value }))
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Institution"
                  value={eduEntry.institution}
                  onChange={(e) =>
                    setEduEntry((prev) => ({ ...prev, institution: e.target.value }))
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={eduEntry.year}
                  onChange={(e) =>
                    setEduEntry((prev) => ({ ...prev, year: e.target.value }))
                  }
                />
                <textarea
                  placeholder="Details"
                  value={eduEntry.details}
                  onChange={(e) =>
                    setEduEntry((prev) => ({ ...prev, details: e.target.value }))
                  }
                />
                <button type="button" onClick={addEducation}>
                  Add Education
                </button>
              </div>

              {Array.isArray(formData.education) && formData.education.length > 0 && (
                <ul>
                  {formData.education
                    .filter(
                      (edu) =>
                        edu.degree || edu.institution || edu.year || edu.details
                    )
                    .map((edu, idx) => (
                      <li key={idx}>
                        <b>{edu.degree || "Degree not specified"}</b> at{" "}
                        {edu.institution || "Institution not specified"} (
                        {edu.year || "Year not specified"})
                        <br />
                        <small>{edu.details || ""}</small>
                      </li>
                    ))}
                </ul>
              )}
            </section>

            {/* Skills Section */}
            <div>
              <input
                type="text"
                placeholder="Add a skill"
                value={skillEntry}
                onChange={(e) => setSkillEntry(e.target.value)}
              />
              <button type="button" onClick={addSkill}>
                Add Skill
              </button>

              {/* List of skills */}
              <ul>
                {(Array.isArray(formData.skills)
                  ? formData.skills
                  : formData.skills?.split(",") || []
                ).map((skill, idx) => (
                  <li key={idx}>{skill.trim()}</li>
                ))}
              </ul>
            </div>

            {/* Experience Section */}
            <div>
              <input
                type="text"
                placeholder="Role"
                value={expEntry.title}
                onChange={(e) => setExpEntry({ ...expEntry, title: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Company"
                value={expEntry.company}
                onChange={(e) =>
                  setExpEntry((prev) => ({ ...prev, company: e.target.value }))
                }
                required
              />
              <input
                type="text"
                placeholder="Year"
                value={expEntry.year}
                onChange={(e) =>
                  setExpEntry((prev) => ({ ...prev, year: e.target.value }))
                }
              />
              <textarea
                placeholder="Details"
                value={expEntry.details}
                onChange={(e) =>
                  setExpEntry((prev) => ({ ...prev, details: e.target.value }))
                }
              />
              <button type="button" onClick={addExperience}>
                Add Experience
              </button>

              {Array.isArray(formData.experience) && formData.experience.length > 0 && (
                <ul>
                  {formData.experience
                    .filter(
                      (exp) => exp?.title || exp?.company || exp?.year || exp?.details
                    )
                    .map((exp, idx) => (
                      <li key={idx}>
                        <b>{exp?.title || "Title not specified"}</b> at{" "}
                        {exp?.company || "Company not specified"} (
                        {exp?.year || "Year not specified"})
                        <br />
                        <small>{exp?.details || ""}</small>
                      </li>
                    ))}
                </ul>
              )}
            </div>

            {/* Projects Section */}
 <div>
  <h3>Projects</h3>
  {/* Just show projects as list, no editable inputs for existing projects */}
  {Array.isArray(formData.projects) && formData.projects.length > 0 && (
    <ul>
      {formData.projects
        .filter((proj) => proj.title && proj.title.trim() !== "")  // Filter out empty titles
        .map((proj, idx) => (
          <li key={idx}>
            <b>{proj.title}</b>: {proj.description}
            <br />
            {proj.link && (
              <a href={proj.link} target="_blank" rel="noopener noreferrer">
                Link
              </a>
            )}
          </li>
        ))}
    </ul>
  )}

  {/* Add new project inputs */}
  <input
    type="text"
    placeholder="Project title"
    value={projEntry.title}
    onChange={(e) => setProjEntry((prev) => ({ ...prev, title: e.target.value }))}
    required
  />
  <input
    type="text"
    placeholder="Project description"
    value={projEntry.description}
    onChange={(e) => setProjEntry((prev) => ({ ...prev, description: e.target.value }))}
  />
  <input
    type="url"
    placeholder="Project link (https://...)"
    value={projEntry.link}
    onChange={(e) => setProjEntry((prev) => ({ ...prev, link: e.target.value }))}
  />
  <button type="button" onClick={addProject}>
    Add Project
  </button>
</div>

            {/* Certifications Section */}
            <div>
              <input
                type="text"
                placeholder="Certification name"
                value={certEntry.title}
                onChange={(e) =>
                  setCertEntry((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
              <input
                type="text"
                placeholder="Issuing organization"
                value={certEntry.issuer}
                onChange={(e) =>
                  setCertEntry((prev) => ({ ...prev, issuer: e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="Year"
                value={certEntry.year}
                onChange={(e) =>
                  setCertEntry((prev) => ({ ...prev, year: e.target.value }))
                }
              />
              <input 
                type="text"
                placeholder="Details"
                value={certEntry.details}
                onChange={(e) =>
                  setCertEntry((prev) => ({ ...prev, details: e.target.value }))
                }
                />
              <button type="button" onClick={addCertification}>
                Add Certification
              </button>

              {Array.isArray(formData.certifications) &&
                formData.certifications.length > 0 && (
                  <ul>
                    {formData.certifications
                      .filter(
                        (cert) =>
                          cert.title || cert.issuer || cert.year || cert.details
                      )
                      .map((cert, idx) => (
                        <li key={idx}>
                          <b>{cert.title || "Certification name missing"}</b> by{" "}
                          {cert.issuer || "Organization missing"} (
                          {cert.year || "Year missing"}
                          {cert.details || "Details missing"})
                        </li>
                      ))}
                  </ul>
                )}
            </div>

            {/* Achievements Section */}
           <div>
    <input
      type="text"
      placeholder="Achievement title"
      value={achieveEntry.title}
      onChange={(e) =>
        setAchieveEntry((prev) => ({ ...prev, title: e.target.value }))
      }
      required
    />
    <input
      type="text"
      placeholder="Year"
      value={achieveEntry.year}
      onChange={(e) =>
        setAchieveEntry((prev) => ({ ...prev, year: e.target.value }))
      }
    />
    <input
      type="text"
      placeholder="Description"
      value={achieveEntry.description}
      onChange={(e) =>
        setAchieveEntry((prev) => ({ ...prev, description: e.target.value }))
      }
    />
    <button type="button" onClick={addAchievement}>
      Add Achievement
    </button>

    {Array.isArray(formData.achievements) && formData.achievements.length > 0 && (
      <ul>
        {formData.achievements.map((ach, idx) => (
          <li key={idx}>
            <b>{ach.title || "No title"}</b>
            {ach.year && ` (${ach.year})`}
            {ach.description && `: ${ach.description}`}
          </li>
        ))}
      </ul>
    )}
  </div>
          </form>
        </div>
{/* Theme toggle button */}
 <div>
      <button
        type="button"
        className="button"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        Switch to {theme === "light" ? "Dark" : "Light"} Theme
      </button>
    </div>

{/* Template selection */}
<div className="template-selection">
  {[1, 2, 3, 4, 5, 6].map((num) => (
    <div
      key={num}
      className={`template-card ${
        selectedTemplate === `template${num}` ? "selected" : ""
      }`}
      onClick={() => setSelectedTemplate(`template${num}`)}
    >
      Template {num}
    </div>
  ))}
</div>

{/* ATS Section */}
<div className="ats-feedback">
  <button onClick={calculateATSScore} className="ats-btn">
    Check ATS Score
  </button>
  {atsScore !== null && (
    <>
      <p className="ats-score">ATS Score: {atsScore}/100</p>
      <ul>
        {getAtsSuggestions().map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </>
  )}
  <div className="feedback-message">
    <p>{feedback}</p>
  </div>
</div>

{/* Extra actions */}
<div className="actions">
  <button onClick={handleDownload} className="download-btn">
    Download as PDF
  </button>
  <button onClick={handleReset} className="reset-btn">
    Reset Form
  </button>
  <button
    className="cover-letter-btn"
    onClick={() => {
      localStorage.setItem("resumeData", JSON.stringify(formData));
      navigate("/cover-letter");
    }}
  >
    Go to Cover Letter Generator
  </button>
  <Link to="/job-match" className="job-match-btn">
    Go to Job Matcher
  </Link>
  <Link to="/resume-tips" className="text-blue-500 hover:underline">
    Resume Tips
  </Link>
  <Link to="/tracker">Job Tracker</Link>
</div>
</div>

{/* RIGHT column: resume preview */}
<div className="right-column">
  <div id="resume-preview" className="resume-preview">
    <Template selectedTemplate={selectedTemplate} formData={formData} />
  </div>
</div>
</div>
</div>
);
};

export default App;

        