# 📝 Resume Builder

A modern, intelligent **Resume Builder Web App** built with **React 19** and **Vite**, offering resume templates, ATS scoring, industry-based suggestions, grammar checking, and more — everything you need to craft job-winning resumes.

---

## 🚀 Features

- 🎨 **6 Professional Resume Templates**
- 📄 **PDF Download** (via `html2pdf.js`)
- ⚡ **Live Preview** and instant updates
- 🧠 **Industry-Specific Suggestions** for summaries and skills
- 📊 **ATS Score Checker** with keyword analysis
- 🤖 **Grammar Correction** using NLP utilities
- 🧑‍💼 **Cover Letter Generator**
- 🧠 **Job Matcher** for relevant opportunities
- 📋 **Job Tracker** to manage applications
- 🌗 **Dark/Light Theme Toggle**
- 💾 **Autosave** with LocalStorage
- 📷 **Optional Profile Picture Upload**

---

## 🧰 Tech Stack

| Technology        | Purpose                          |
|-------------------|----------------------------------|
| **React 19**       | UI library                       |
| **Vite**           | Lightning-fast bundler           |
| **Tailwind CSS**   | Styling                          |
| **React Router v7**| Page routing                     |
| **html2pdf.js**    | Resume export to PDF             |
| **Tesseract.js**   | OCR support (future-ready)       |
| **Natural**, **Compromise** | NLP features (grammar, keyword) |
| **LocalStorage**   | Persistent user data             |

---

## 🧩 Pages & Routes

| Route               | Component           | Purpose                            |
|---------------------|--------------------|------------------------------------|
| `/`                 | `App.jsx`           | Resume builder UI                  |
| `/cover-letter`     | `CoverLetterPage`   | Generate a personalized cover letter |
| `/job-match`        | `JobMatcher`        | Match resume to job posts          |
| `/resume-tips`      | `ResumeTips`        | Suggestions for resume improvement |
| `/tracker`          | `JobTracker`        | Track job applications             |

---

## 📸 Resume Templates

Supports 6 fully developed templates with a wide variety of layouts:

- ✅ Sidebar, Infographic, Minimalist, and Timeline views
- ✅ Grammar correction built-in
- ✅ Smart rendering of each resume section
- ✅ Easily extendable via `Template.jsx`

---

## 📦 Installation

```bash
git clone https://github.com/Amulya921/Resume-builder.git
cd Resume-builder
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to get started.

---

## 🛠️ Customization Guide

- 📁 **Templates**: Edit or add templates in `Template.jsx`
- 🧠 **Industry Suggestions**: Add to `utils/industrySuggestions.js`
- 📝 **ATS Keywords**: Expand `utils/atsKeywords.js`
- 🎨 **Styling**: Customize with Tailwind in `App.css`, `Template.css`

---

## 🌐 Deployment

Deploy on:
- [Vercel](https://vercel.com/)
- [Netlify](https://netlify.com/)
- GitHub Pages (with routing considerations)

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request

---

## 📄 License

MIT License © Amulya921