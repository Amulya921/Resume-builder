import React, { useState, useEffect } from "react";
import "./JobTracker.css";

const JobTracker = () => {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    company: "",
    position: "",
    resumeFile: "",
    date: "",
    link: "",
    location: "",
    status: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobApplications")) || [];
    setJobs(storedJobs);
  }, []);

  useEffect(() => {
    localStorage.setItem("jobApplications", JSON.stringify(jobs));
  }, [jobs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedJobs = [...jobs];
      updatedJobs[editIndex] = form;
      setJobs(updatedJobs);
      setEditIndex(null);
    } else {
      setJobs([...jobs, form]);
    }
    setForm({
      company: "",
      position: "",
      resumeFile: "",
      date: "",
      link: "",
      location: "",
      status: "",
    });
  };

  const handleEdit = (index) => {
    setForm(jobs[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
  };

  return (
    <div className="job-tracker">
      <h2>Job Tracker</h2>
      <form onSubmit={handleSubmit}>
        <input name="company" value={form.company} onChange={handleChange} placeholder="Company Name" required />
        <input name="position" value={form.position} onChange={handleChange} placeholder="Position" required />
        <input name="resumeFile" value={form.resumeFile} onChange={handleChange} placeholder="Resume File Name" required />
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <input name="link" value={form.link} onChange={handleChange} placeholder="Application Link" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" />
        <select name="status" value={form.status} onChange={handleChange} required>
          <option value="">Select Status</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button type="submit">{editIndex !== null ? "Update Job" : "Add Job"}</button>
      </form>

      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            <strong>{job.position}</strong> at <strong>{job.company}</strong> — {job.status}
            <br />
            <small>{job.date} | {job.location}</small>
            <br />
            <a href={job.link} target="_blank" rel="noopener noreferrer">{job.link}</a>
            <br />
            Resume: {job.resumeFile}
            <br />
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobTracker;

