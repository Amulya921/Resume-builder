import React, { useEffect, useState } from "react";
import "./Template.css";
import { checkGrammar } from "./utils/checkGrammar";

// Custom Hook: Grammar checking for specific fields
const useCheckedFormData = (formData) => {
  const [checkedData, setCheckedData] = useState(formData);

  useEffect(() => {
    const checkFields = async () => {
      const fieldsToCheck = [
        "summary",
        "education",
        "experience",
        "projects",
        "certifications",
        "achievements",
      ];

      const updatedData = { ...formData };

      for (const field of fieldsToCheck) {
        if (formData[field]) {
          try {
            const result = await checkGrammar(formData[field]);
            updatedData[field] = result.corrected || formData[field];
          } catch (error) {
            console.error(`Grammar check failed for ${field}:`, error);
          }
        }
      }

      setCheckedData(updatedData);
    };

    checkFields();
  }, [formData]);

  return checkedData;
};

// Template 1

const Template1 = ({ formData }) => {
  const skillsArray = Array.isArray(formData.skills)
    ? formData.skills
    : formData.skills
    ? formData.skills.split(",")
    : [];

  return (
    <div className="template1">
      {/* Left Column (Sidebar) */}
      <div className="sidebar">
        {/* Profile Photo */}
        {formData.photo && (
  <img
    src={formData.photo}
    alt="Profile"
    className="profile-photo"
    onError={(e) => {
      e.target.style.display = "none"; // Hide broken images
    }}
  />
)}
        {/* Basic Info */}
        {formData.name && <h2>{formData.name}</h2>}
        {formData.email && <p>{formData.email}</p>}
        {formData.phone && <p>{formData.phone}</p>}
        {formData.linkedin && (
          <p>
            <a href={formData.linkedin}>LinkedIn</a>
          </p>
        )}
        {formData.github && (
          <p>
            <a href={formData.github}>GitHub</a>
          </p>
        )}
        {formData.portfolio && (
  <p>
    <a href={formData.portfolio} target="_blank" rel="noopener noreferrer">
      Portfolio
    </a>
  </p>
)}

        {/* Skills */}
        {skillsArray.length > 0 && (
          <>
            <h3>Skills</h3>
            <ul>
              {skillsArray.map((skill, i) => (
                <li key={i}>{skill.trim()}</li>
              ))}
            </ul>
          </>
        )}

        {/* Languages */}
        {formData.languages && formData.languages.trim() && (
          <>
            <h3>Languages</h3>
            <p>{formData.languages}</p>
          </>
        )}
      </div>

      {/* Right Column (Main Content) */}
      <div className="main-content">
        {/* Summary */}
        {formData.summary && formData.summary.trim() && (
          <section>
            <h3>Summary</h3>
            <p>{formData.summary}</p>
          </section>
        )}

        {/* Education */}
        {Array.isArray(formData.education) && formData.education.length > 0 && (
          <section>
            <h3>Education</h3>
            {formData.education
  .filter(edu => edu.degree || edu.institution || edu.year || edu.details)
  .map((edu, i) => (
    <div key={i}>
      <strong>{edu.degree || "Degree not specified"}</strong> - {edu.institution || "Institution not specified"} ({edu.year || "Year not specified"})
      {edu.details && <p>{edu.details}</p>}
    </div>
))}

          </section>
        )}

        {/* Experience */}
        {Array.isArray(formData.experience) &&
  formData.experience
    .filter(exp => exp.position || exp.title || exp.company || exp.year || exp.startDate || exp.endDate || exp.details || (exp.responsibilities && exp.responsibilities.length))
    .length > 0 && (
    <section>
      <h3>Experience</h3>
      {formData.experience
        .filter(exp => exp.position || exp.title || exp.company || exp.year || exp.startDate || exp.endDate || exp.details || (exp.responsibilities && exp.responsibilities.length))
        .map((exp, i) => (
          <div key={i}>
            <strong>{exp.position || exp.title || "Title not specified"}</strong>
            {exp.company && ` at ${exp.company}`}
            {(exp.year || exp.startDate || exp.endDate) && (
              <> ({exp.year || `${exp.startDate || "Start"} - ${exp.endDate || "End"}`})</>
            )}
            {exp.details ? (
              <p>{exp.details}</p>
            ) : exp.responsibilities && exp.responsibilities.length > 0 ? (
              <ul>
                {exp.responsibilities.map((res, j) => (
                  <li key={j}>{res}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
    </section>
)}


        {/* Projects */}
{Array.isArray(formData.projects) && formData.projects.filter(
  (proj) => proj.title || proj.description || proj.link
).length > 0 && (
  <section>
  <h3>Projects</h3>
  <ul>
    {formData.projects
      .filter(proj => proj.title || proj.description || proj.link)
      .map((project, idx) => (
        <li key={idx}>
          <strong>{project.title || "Untitled Project"}</strong>
          {project.year && <> ({project.year})</>}
          {project.description && <p>{project.description}</p>}
          {project.link && (
            <p>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            </p>
          )}
        </li>
      ))}
  </ul>
</section>
)}



        {/* Certifications */}
        {Array.isArray(formData.certifications) &&
  formData.certifications.filter(
    cert => cert.title || cert.name || cert.issuer || cert.year
  ).length > 0 && (
    <section>
      <h3>Certifications</h3>
      <ul>
        {formData.certifications
          .filter(cert => cert.title || cert.name || cert.issuer || cert.year)
          .map((cert, i) => (
            <li key={i}>
              {(cert.title || cert.name || "Untitled Certification")}{" "}
              {cert.issuer && `- ${cert.issuer}`}{" "}
              {cert.year && `(${cert.year})`}
            </li>
          ))}
      </ul>
    </section>
)}


        {/* Achievements */}
        {Array.isArray(formData.achievements) &&
  formData.achievements.filter(
    ach => ach.title || ach.description || ach.year
  ).length > 0 && (
    <section>
      <h3>Achievements</h3>
      <ul>
        {formData.achievements
          .filter(ach => ach.title || ach.description || ach.year)
          .map((ach, i) => (
            <li key={i}>
              {ach.title && <strong>{ach.title}</strong>}
              {ach.year && <> ({ach.year})</>}
              {ach.description && (
                <>
                  <br />
                  <small>{ach.description}</small>
                </>
              )}
            </li>
          ))}
      </ul>
    </section>
)}

      
      </div>
    </div>
  );
};


// Template 2
const Template2 = ({ formData }) => {
  // Parse arrays safely
  const skillsArray = Array.isArray(formData.skills)
    ? formData.skills
    : typeof formData.skills === 'string'
    ? formData.skills.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  const languagesArray = Array.isArray(formData.languages)
    ? formData.languages
    : typeof formData.languages === 'string'
    ? formData.languages.split(',').map(l => l.trim()).filter(Boolean)
    : [];

  const experienceArray = Array.isArray(formData.experience) ? formData.experience : [];
  const educationArray = Array.isArray(formData.education) ? formData.education : [];
  const projectsArray = Array.isArray(formData.projects) ? formData.projects : [];
  const certificationsArray = Array.isArray(formData.certifications) ? formData.certifications : [];
  const achievementsArray = Array.isArray(formData.achievements) ? formData.achievements : [];

  // Filtered entries
  const filteredEducation = educationArray.filter(
    (edu) => edu.degree?.trim() || edu.institution?.trim() || edu.year?.trim()
  );

  const filteredProjects = projectsArray.filter(
    (p) =>
      p &&
      ((p.title && p.title.trim()) ||
        (p.name && p.name.trim()) ||
        (p.description && p.description.trim()) ||
        (p.link && p.link.trim()))
  );

  const filteredExperience = experienceArray.filter(
    (exp) => exp.role?.trim() || exp.company?.trim() || exp.year?.trim() || exp.details?.trim()
  );

  const filteredCertifications = certificationsArray.filter(
    (cert) => cert.title?.trim() || cert.issuer?.trim() || cert.year?.trim()
  );

  const filteredAchievements = achievementsArray.filter(
    (ach) => typeof ach === 'string' && ach.trim() !== ''
  );

  return (
    <div className="template template2">
      <header>
       {formData.photo && (
  <img
    src={formData.photo}
    alt="Profile"
    className="profile-photo"
    onError={(e) => {
      e.target.style.display = "none"; // Hide broken images
    }}
  />
)}
        {formData.name && <h1>{formData.name}</h1>}
        {(formData.email || formData.phone) && (
          <p>
            {formData.email} {formData.email && formData.phone && ' | '} {formData.phone}
          </p>
        )}
      </header>

      {formData.summary && (
        <section>
          <h3>Summary</h3>
          <p>{formData.summary}</p>
        </section>
      )}

      {filteredEducation.length > 0 && (
        <section>
          <h3>Education</h3>
          <div className="timeline">
            {filteredEducation.map((edu, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-content">
                  <strong>{edu.degree}</strong> - {edu.institution} ({edu.year})
                  {typeof edu.details === 'string' && <p>{edu.details}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {skillsArray.length > 0 && (
        <section>
          <h3>Skills</h3>
          <ul>
            {skillsArray.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {filteredProjects.length > 0 && (
        <section>
          <h3>Projects</h3>
          {filteredProjects.map((project, i) => (
            <div key={i}>
              <strong>{project.title || project.name || 'Untitled Project'}</strong>{' '}
              {project.year && `(${project.year})`}
              <p>{project.description}</p>
              {project.link && (
                <p>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                </p>
              )}
            </div>
          ))}
        </section>
      )}
{filteredExperience.length > 0 && (
  <section>
    <h3>Experience</h3>
    <div className="timeline">
      {filteredExperience.map((exp, i) => (
        <div className="timeline-item" key={i}>
          <div className="timeline-content">
            {(exp.position || exp.title || exp.role) && (
              <h4>{exp.position || exp.title || exp.role}</h4>
            )}
            {exp.company && <p>{exp.company}</p>}
            {exp.year && <p>{exp.year}</p>}
            {typeof exp.details === 'string' && <p>{exp.details}</p>}
          </div>
        </div>
      ))}
    </div>
  </section>
)}



      {filteredCertifications.length > 0 && (
        <section>
          <h3>Certifications</h3>
          <ul>
            {filteredCertifications.map((cert, i) => (
              <li key={i}>
                {cert.title} - {cert.issuer} ({cert.year})
              </li>
            ))}
          </ul>
        </section>
      )}

      {languagesArray.length > 0 && (
        <section>
          <h3>Languages</h3>
          <ul>
            {languagesArray.map((lang, i) => (
              <li key={i}>{lang}</li>
            ))}
          </ul>
        </section>
      )}

      {Array.isArray(formData.achievements) &&
  formData.achievements.filter(
    ach => ach.title || ach.description || ach.year
  ).length > 0 && (
    <section>
      <h3>Achievements</h3>
      <ul>
        {formData.achievements
          .filter(ach => ach.title || ach.description || ach.year)
          .map((ach, i) => (
            <li key={i}>
              {ach.title && <strong>{ach.title}</strong>}
              {ach.year && <> ({ach.year})</>}
              {ach.description && (
                <>
                  <br />
                  <small>{ach.description}</small>
                </>
              )}
            </li>
          ))}
      </ul>
    </section>
)}

    </div>
  );
};



// Template 3//
const Template3 = ({ formData }) => {
  const skillsArray = Array.isArray(formData.skills)
    ? formData.skills
    : formData.skills
    ? formData.skills.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  const languagesArray = Array.isArray(formData.languages)
    ? formData.languages
    : formData.languages
    ? formData.languages.split(',').map(l => l.trim()).filter(Boolean)
    : [];

  const filteredEducation = (formData.education || []).filter(
    edu => edu.degree || edu.institution || edu.year
  );

  const filteredExperience = (formData.experience || []).filter(
    exp => exp.position || exp.company || exp.year || exp.details
  );

 const filteredProjects = (formData.projects || []).filter(
  proj => proj.title || proj.description || proj.link
);


  const filteredCertifications = (formData.certifications || []).filter(
    cert => cert.title || cert.issuer || cert.year
  );

  const filteredAchievements = (formData.achievements || []).filter(
    ach => ach.title || ach.description || ach.year
  );

  return (
    <div className="template3 minimalist">
      <header className="resume-header">
        {formData.name && <h1>{formData.name}</h1>}
        {(formData.email || formData.phone) && (
          <p>
            {formData.email}
            {formData.email && formData.phone && ' | '}
            {formData.phone}
          </p>
        )}
      </header>

      {formData.summary && (
        <section>
          <h2>Professional Summary</h2>
          <p>{formData.summary}</p>
        </section>
      )}

      {filteredExperience.length > 0 && (
        <section>
          <h2>Experience</h2>
          {filteredExperience.map((exp, i) => (
            <div key={i}>
              <strong>{exp.position || exp.title}</strong>
              {exp.company && `, ${exp.company}`}
              {exp.year && ` (${exp.year})`}
              {exp.details && <p>{exp.details}</p>}
            </div>
          ))}
        </section>
      )}

      {filteredEducation.length > 0 && (
        <section>
          <h2>Education</h2>
          {filteredEducation.map((edu, i) => (
            <div key={i}>
              <strong>{edu.degree}</strong>
              {edu.institution && `, ${edu.institution}`}
              {edu.year && ` (${edu.year})`}
              {edu.details && <p>{edu.details}</p>}
            </div>
          ))}
        </section>
      )}

      {skillsArray.length > 0 && (
        <section>
          <h2>Skills</h2>
          <ul>
            {skillsArray.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

    {Array.isArray(formData.projects) && formData.projects.filter(
  proj => proj.title || proj.description || proj.link
).length > 0 && (
  <section>
    <h2>Projects</h2> {/* changed from h3 to h2 */}
    <ul>
      {formData.projects
        .filter(proj => proj.title || proj.description || proj.link)
        .map((project, idx) => (
          <li key={idx}>
            <strong>{project.title || "Untitled Project"}</strong>
            {project.year && <> ({project.year})</>}
            {project.description && <p>{project.description}</p>}
            {project.link && (
              <p>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              </p>
            )}
          </li>
        ))}
    </ul>
  </section>
)}


      {filteredCertifications.length > 0 && (
        <section>
          <h2>Certifications</h2>
          <ul>
            {filteredCertifications.map((cert, i) => (
              <li key={i}>
                {cert.title}
                {cert.issuer && ` - ${cert.issuer}`}
                {cert.year && ` (${cert.year})`}
              </li>
            ))}
          </ul>
        </section>
      )}

      {filteredAchievements.length > 0 && (
        <section>
          <h2>Achievements</h2>
          <ul>
            {filteredAchievements.map((ach, i) => (
              <li key={i}>
                <strong>{ach.title}</strong>
                {ach.year && ` (${ach.year})`}
                {ach.description && ` - ${ach.description}`}
              </li>
            ))}
          </ul>
        </section>
      )}

      {languagesArray.length > 0 && (
        <section>
          <h2>Languages</h2>
          <ul>
            {languagesArray.map((lang, i) => (
              <li key={i}>{lang}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};


// Template 4

const Template4 = ({ formData }) => {
  const skillsArray = Array.isArray(formData.skills)
    ? formData.skills
    : formData.skills
    ? formData.skills.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  const languagesArray = Array.isArray(formData.languages)
    ? formData.languages
    : formData.languages
    ? formData.languages.split(',').map(l => l.trim()).filter(Boolean)
    : [];

  return (
    <div className="template4">
      <header className="resume-header">
        {formData.photo && (
          <img src={formData.photo} alt="Profile" className="profile-photo" />
        )}
        {formData.name && <h1>{formData.name}</h1>}
        {(formData.email || formData.phone) && (
          <p>
            {formData.email}
            {formData.email && formData.phone && ' | '}
            {formData.phone}
          </p>
        )}
      </header>

      {formData.summary && (
        <section>
          <h2>Professional Summary</h2>
          <p>{formData.summary}</p>
        </section>
      )}

      {/* Experience Section */}
      {formData.experience?.filter(
        exp => exp && (exp.title || exp.company || exp.year || exp.details)
      ).length > 0 && (
        <section>
          <h2>Experience</h2>
          {formData.experience.map((exp, i) =>
            exp && (exp.title || exp.company || exp.year || exp.details) ? (
              <div key={i} className="experience-item">
                {exp.title && <h3>{exp.title}</h3>}
                {(exp.company || exp.year) && (
                  <p>
                    {exp.company}
                    {exp.company && exp.year && ' | '}
                    {exp.year}
                  </p>
                )}
                {exp.details && <p>{exp.details}</p>}
              </div>
            ) : null
          )}
        </section>
      )}

      {/* Education Section */}
      {formData.education?.filter(
        edu => edu && (edu.degree || edu.institution || edu.year || edu.details)
      ).length > 0 && (
        <section>
          <h2>Education</h2>
          {formData.education.map((edu, i) =>
            edu && (edu.degree || edu.institution || edu.year || edu.details) ? (
              <div key={i}>
                {edu.degree && <h3>{edu.degree}</h3>}
                {(edu.institution || edu.year) && (
                  <p>
                    {edu.institution}
                    {edu.institution && edu.year && ' | '}
                    {edu.year}
                  </p>
                )}
                {edu.details && <p>{edu.details}</p>}
              </div>
            ) : null
          )}
        </section>
      )}

      {/* Projects Section */}
      {formData.projects?.filter(
  proj => proj && (proj.title || proj.description || proj.link)
).length > 0 && (
  <section>
    <h2>Projects</h2>
    {formData.projects.map((proj, i) =>
      proj && (proj.title || proj.description || proj.link) ? (
        <div key={i} className="project-item">
          {proj.title && <h3>{proj.title}</h3>}
          {proj.link && (
            <p>
              <a href={proj.link} target="_blank" rel="noopener noreferrer">
                {proj.link}
              </a>
            </p>
          )}
          {proj.description && <p>{proj.description}</p>}
        </div>
      ) : null
    )}
  </section>
)}
      {/* Certifications Section */}
      {formData.certifications?.filter(
        cert => cert && (cert.name || cert.issuer || cert.year)
      ).length > 0 && (
        <section>
          <h2>Certifications</h2>
          {formData.certifications.map((cert, i) =>
            cert && (cert.title || cert.issuer || cert.year) ? (
              <div key={i}>
               <p>
  {cert.title && <strong>{cert.title}</strong>}
  {cert.issuer && ` - ${cert.issuer}`}
  {cert.year && ` (${cert.year})`}
</p>

              </div>
            ) : null
          )}
        </section>
      )}

      {/* Skills Section */}
      {skillsArray.length > 0 && (
        <section>
          <h2>Skills</h2>
          <div className="chips">
            {skillsArray.map((skill, i) => (
              <span key={i} className="chip">{skill}</span>
            ))}
          </div>
        </section>
      )}

      {/* Languages Section */}
      {languagesArray.length > 0 && (
        <section>
          <h2>Languages</h2>
          <div className="chips">
            {languagesArray.map((lang, i) => (
              <span key={i} className="chip">{lang}</span>
            ))}
          </div>
        </section>
      )}

      {/* Achievements Section */}
      {Array.isArray(formData.achievements) &&
        formData.achievements.filter(
          ach => ach.title || ach.description || ach.year
        ).length > 0 && (
          <section>
            <h2>Achievements</h2>
            <ul>
              {formData.achievements
                .filter(ach => ach.title || ach.description || ach.year)
                .map((ach, i) => (
                  <li key={i}>
                    {ach.title && <strong>{ach.title}</strong>}
                    {ach.year && <> ({ach.year})</>}
                    {ach.description && (
                      <>
                        <br />
                        <small>{ach.description}</small>
                      </>
                    )}
                  </li>
                ))}
            </ul>
          </section>
      )}
    </div>
  );
};




// Template 5
const Template5 = ({ formData }) => {
  const skillsArray = Array.isArray(formData.skills)
    ? formData.skills
    : formData.skills
    ? formData.skills.split(',').map(skill => skill.trim()).filter(Boolean)
    : [];

  const languagesArray = Array.isArray(formData.languages)
    ? formData.languages
    : formData.languages
    ? formData.languages.split(',').map(lang => lang.trim()).filter(Boolean)
    : [];

  const renderItem = (item) => {
    if (typeof item === 'string') {
      return <p>{item}</p>;
    } else if (typeof item === 'object' && item !== null) {
      const {
        title,
        name,
        degree,
        organization,
        issuer,
        institution,
        company,
        employer,
        year,
        details,
        description,
      } = item;

      const mainText = [
        title || name || degree,
        organization || issuer || institution || company || employer,
      ]
        .filter(Boolean)
        .join(' - ');

      return (
        <p style={{ marginBottom: '0.5rem' }}>
          <strong>{mainText}</strong>
          {year && ` (${year})`}
          {(details || description) && (
            <>
              <br />
              <span>{details || description}</span>
            </>
          )}
        </p>
      );
    }
    return null;
  };

  const hasMeaningfulExperience = formData.experience?.some(
    exp =>
      exp &&
      (exp.title || exp.name || exp.company || exp.description || exp.year || exp.duration)
  );

  return (
    <div className="template template5 infographic-layout">
      <div className="sidebar">
        <div className="profile">
          {formData.name && <h2>{formData.name}</h2>}
          {formData.photo && (
            <img src={formData.photo} alt="Profile" className="profile-photo" />
          )}
        </div>

        {(formData.email || formData.phone) && <h4>Contact</h4>}
        {formData.email && <p><strong>Email:</strong> {formData.email}</p>}
        {formData.phone && <p><strong>Phone:</strong> {formData.phone}</p>}

        {skillsArray.length > 0 && (
          <>
            <h4>Skills</h4>
            <div className="skills">
              {skillsArray.map((skill, i) => (
                <div className="skill-bar" key={i}>
                  <span className="skill-name">{skill}</span>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: "80%" }}></div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {languagesArray.length > 0 && (
          <>
            <h4>Languages</h4>
            <p>{languagesArray.join(', ')}</p>
          </>
        )}

        {formData.certifications?.filter(
          cert => cert && (cert.title || cert.issuer || cert.year || cert.details)
        ).length > 0 && (
          <>
            <h4>Certifications</h4>
            {formData.certifications.map((cert, i) =>
              cert && (cert.title || cert.issuer || cert.year || cert.details) ? (
                <div key={i}>{renderItem(cert)}</div>
              ) : null
            )}
          </>
        )}
      </div>

      <div className="main-content">
        {formData.summary && (
          <section>
            <h3>Summary</h3>
            <p>{formData.summary}</p>
          </section>
        )}

        {formData.education?.filter(Boolean).length > 0 && (
          <section>
            <h3>Education</h3>
            {formData.education.map((edu, i) => (
              <div key={i}>{renderItem(edu)}</div>
            ))}
          </section>
        )}

        {hasMeaningfulExperience && (
          <section>
            <h3>Experience</h3>
            {formData.experience.map((exp, i) =>
              exp &&
              (exp.title || exp.name || exp.company || exp.description || exp.year || exp.duration) ? (
                <div key={i}>{renderItem(exp)}</div>
              ) : null
            )}
          </section>
        )}

        {formData.projects?.filter(Boolean).length > 0 && (
          <section>
            <h3>Projects</h3>
            {formData.projects.map((proj, i) => (
              <div key={i}>{renderItem(proj)}</div>
            ))}
          </section>
        )}

        {formData.achievements?.filter(Boolean).length > 0 && (
          <section>
            <h3>Achievements</h3>
            {formData.achievements.map((ach, i) => (
              <div key={i}>{renderItem(ach)}</div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};
// Template 6

const Template6 = ({ formData = {} }) => {
  const parseArray = (input) =>
    Array.isArray(input)
      ? input
      : input
      ? input.split(',').map(item => item.trim()).filter(Boolean)
      : [];

  const skillsArray = parseArray(formData.skills);
  const languagesArray = parseArray(formData.languages);

  const renderItem = (item) => {
    if (typeof item === 'string') {
      return <p>{item}</p>;
    } else if (typeof item === 'object' && item !== null) {
      const {
        title,
        name,
        degree,
        institution,
        organization,
        company,
        issuer,
        location,
        duration,
        year,
        description,
        details,
        technologies,
        link,
      } = item;

      return (
        <div>
          <p>
            <strong>{title || name || degree}</strong>
            {(institution || organization || issuer || company) &&
              ` - ${institution || organization || issuer || company}`}
            {location && `, ${location}`}
            {(year || duration) && ` (${year || duration})`}
          </p>
          {description && <p>{description}</p>}
          {details && <p>{details}</p>}
          {technologies && (
            <p><em>Technologies: {Array.isArray(technologies) ? technologies.join(', ') : technologies}</em></p>
          )}
          {link && (
            <p>
              <a href={link} target="_blank" rel="noopener noreferrer">
                Project Link
              </a>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="template template6 infographic-layout">
      <div className="header">
        <h1>{formData.name || 'Your Name'}</h1>
        {(formData.email || formData.phone) && (
          <p>
            {formData.email && <span>{formData.email}</span>}
            {formData.phone && <span> | {formData.phone}</span>}
          </p>
        )}
      </div>

      {formData.photo && typeof formData.photo === 'string' && (
        <div className="profile-photo">
          <img src={formData.photo} alt="Profile" />
        </div>
      )}

      {formData.summary && (
        <section>
          <h3>Summary</h3>
          <p>{formData.summary}</p>
        </section>
      )}

      {skillsArray.length > 0 && (
        <section>
          <h3>Skills</h3>
          <ul>
            {skillsArray.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {languagesArray.length > 0 && (
        <section>
          <h3>Languages</h3>
          <p>{languagesArray.join(', ')}</p>
        </section>
      )}

      {formData.certifications?.filter(
        cert => cert && (cert.title || cert.issuer || cert.year || cert.details)
      ).length > 0 && (
        <section>
          <h3>Certifications</h3>
          {formData.certifications.map((cert, i) =>
            cert && (cert.title || cert.issuer || cert.year || cert.details) ? (
              <div key={cert.id || cert.title || cert.name || i}>
                {renderItem(cert)}
              </div>
            ) : null
          )}
        </section>
      )}

      {formData.education?.filter(Boolean).length > 0 && (
        <section>
          <h3>Education</h3>
          {formData.education.map((edu, i) => (
            <div key={edu.id || edu.title || edu.name || i}>
              {renderItem(edu)}
            </div>
          ))}
        </section>
      )}

      {formData.experience?.filter(
        exp =>
          exp &&
          (exp.title || exp.name || exp.company || exp.description || exp.year || exp.duration)
      ).length > 0 && (
        <section>
          <h3>Experience</h3>
          {formData.experience.map((exp, i) =>
            exp &&
            (exp.title || exp.name || exp.company || exp.description || exp.year || exp.duration) ? (
              <div key={exp.id || exp.title || exp.name || i}>
                {renderItem(exp)}
              </div>
            ) : null
          )}
        </section>
      )}

      {formData.projects?.filter(
        proj => proj && (proj.title || proj.description || proj.link)
      ).length > 0 && (
        <section>
          <h3>Projects</h3>
          {formData.projects.map((proj, i) =>
            proj && (proj.title || proj.description || proj.link) ? (
              <div key={proj.id || proj.title || proj.name || i}>
                {proj.title && <h4>{proj.title}</h4>}
                {proj.link && (
                  <p>
                    <a href={proj.link} target="_blank" rel="noopener noreferrer">
                      {proj.link}
                    </a>
                  </p>
                )}
                {proj.description && <p>{proj.description}</p>}
              </div>
            ) : null
          )}
        </section>
      )}

      {formData.achievements?.filter(Boolean).length > 0 && (
        <section>
          <h3>Achievements</h3>
          {formData.achievements.map((ach, i) => (
            <div key={ach.id || ach.title || ach.name || i}>
              {renderItem(ach)}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};




// Main Template Switcher
const Template = ({ selectedTemplate, formData }) => {
  const checkedData = useCheckedFormData(formData);

  switch (selectedTemplate) {
    case "template1":
      return <Template1 formData={checkedData} />;
    case "template2":
      return <Template2 formData={checkedData} />;
    case "template3":
      return <Template3 formData={checkedData} />;
    case "template4":
      return <Template4 formData={checkedData} />;
    case "template5":
      return <Template5 formData={checkedData} />;
    case "template6":
      return <Template6 formData={checkedData} />;
    default:
      return <Template1 formData={checkedData} />;
  }
};

export default Template;