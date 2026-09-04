# 📊 LeetCode Stats Dashboard

A full-stack web application that allows users to search for a LeetCode username and view their coding progress, problem-solving statistics, activity, and custom CodePulse score in one place.

---

## 🚀 Features

- 🔎 Search LeetCode users by username
- 📊 Total problems solved
- 🟢 Easy problems solved
- 🟠 Medium problems solved
- 🔴 Hard problems solved
- 📈 Difficulty distribution
- 🔥 Current coding streak
- 📅 Last 7 days activity
- 📆 Last 30 days activity
- 🚀 Custom CodePulse Score
- 🟩 Coding activity heatmap
- ❌ Proper error handling for invalid usernames
- ⚡ Real-time data fetched from LeetCode
- 📱 Responsive dashboard UI

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Vite

### Backend

- Node.js
- Express.js
- JavaScript
- REST API

### Data Source

- LeetCode GraphQL API

---

## 📂 Project Structure

```text
Leetcode-Stats-Dashboard/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

---

## 🌐 Live Demo

🚧 Live demo coming soon.

The application is currently being prepared for deployment.

---

## 📸 Screenshots

### Dashboard

The dashboard provides an overview of:

- LeetCode problem-solving progress
- Difficulty distribution
- Coding streak
- Recent activity
- CodePulse Score
- Coding activity heatmap

### Invalid Username Handling

The application displays a clear error message when an invalid LeetCode username is entered:

```text
LeetCode username not found
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/kumarun415/Leetcode-Stats-Dashboard.git
```

Navigate into the project:

```bash
cd Leetcode-Stats-Dashboard
```

---

## ▶️ Run Backend

Open a terminal and navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend server:

```bash
node server.js
```

Backend will run on:

```text
http://localhost:5000
```

---

## ▶️ Run Frontend

Open another terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL provided by Vite in your browser.

---

## 🔌 API Endpoint

The backend provides the following API:

```text
GET /api/leetcode/:username
```

Example:

```text
http://localhost:5000/api/leetcode/arun-k____231
```

The backend fetches LeetCode user statistics and activity data and sends the required information to the frontend.

---

## 📊 Dashboard Information

### Problem Statistics

The dashboard displays:

- Total problems solved
- Easy problems
- Medium problems
- Hard problems

### Difficulty Distribution

Displays the percentage distribution of solved problems across:

- Easy
- Medium
- Hard

### CodePulse Activity

The dashboard calculates a custom CodePulse Score using:

- Current coding streak
- Last 7 days activity
- Last 30 days activity

The score is displayed out of 100.

> CodePulse Score is a custom metric created for this project and is not an official LeetCode score.

### Coding Activity Heatmap

A contribution-style heatmap visualizes the user's coding activity over the recent activity period.

---

## 🧪 Testing

The application has been tested with both valid and invalid LeetCode usernames.

### Valid Username

```text
arun-k____2311
```

The dashboard successfully displays the user's:

- Problem statistics
- Difficulty distribution
- Coding streak
- Recent activity
- CodePulse Score
- Coding activity heatmap

### Invalid Username

For an invalid username, the application displays:

```text
LeetCode username not found
```

---

## 🎯 Future Improvements

- 🏆 LeetCode Global Ranking
- ⭐ Contest Rating
- 📊 Acceptance Rate
- 👥 User Comparison
- 🌙 Dark Mode
- 📄 PDF Export
- 🔗 Shareable Profile
- 📈 Historical Analytics

---

## 👨‍💻 Author

**Arun Kumar**

B.Tech Information Technology Student

---

## ⭐ Support

If you like this project, consider giving the repository a ⭐ on GitHub.