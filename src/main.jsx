// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CoverLetterPage from "./pages/CoverLetterPage"; // Adjust path if needed
import JobMatcher from "./pages/JobMatcher";
import ResumeTips from "./components/ResumeTips";
import JobTracker from "./components/JobTracker"; // adjust path if needed

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cover-letter" element={<CoverLetterPage />} />
        <Route path="/job-match" element={<JobMatcher />} />
        <Route path="/resume-tips" element={<ResumeTips />} />
            <Route path="/tracker" element={<JobTracker />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

