// ResumeTips.jsx
import React from "react";

const ResumeTips = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Resume Tips & Resources</h2>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Well-Written Summary Example</h3>
        <p className="bg-gray-100 p-4 rounded">
          "Highly motivated software developer with 3+ years of experience building scalable web applications. 
          Passionate about user-centric design, efficient algorithms, and delivering clean, maintainable code."
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">How to Write Effective Bullet Points</h3>
        <ul className="list-disc list-inside bg-gray-100 p-4 rounded space-y-2">
          <li>Start with a strong action verb (e.g., "Developed", "Led", "Optimized").</li>
          <li>Quantify results (e.g., "Increased performance by 40%").</li>
          <li>Be specific about your contribution and technologies used.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Crafting Skills Section</h3>
        <ul className="list-disc list-inside bg-gray-100 p-4 rounded space-y-2">
          <li>Group skills by category (e.g., Programming, Tools, Soft Skills).</li>
          <li>List only relevant and updated skills.</li>
          <li>Use industry-standard terminology (e.g., "React.js", not just "React").</li>
        </ul>
      </section>
    </div>
  );
};

export default ResumeTips;
