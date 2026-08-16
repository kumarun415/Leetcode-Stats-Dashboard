import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==============================
  // Search LeetCode User
  // ==============================

  const handleSearch = async () => {
    if (username.trim() === "") {
      setError("Please enter a LeetCode username");
      return;
    }

    setLoading(true);
    setError("");
    setStats(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/leetcode/${encodeURIComponent(
          username.trim()
        )}`
      );

      const data = await response.json();

      if (!response.ok) {
  throw new Error(
    data.message || "Unable to find this LeetCode username"
  );
}
      setStats(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Get Problem Count
  // ==============================

  const getCount = (difficulty) => {
    if (!stats?.submitStats?.acSubmissionNum) {
      return 0;
    }

    const problem = stats.submitStats.acSubmissionNum.find(
      (item) => item.difficulty === difficulty
    );

    return problem ? problem.count : 0;
  };

  // ==============================
  // Difficulty Percentage
  // ==============================

  const getPercentage = (difficulty) => {
    const total = getCount("All");
    const count = getCount(difficulty);

    if (total === 0) {
      return 0;
    }

    return ((count / total) * 100).toFixed(1);
  };

  // ==============================
  // Get Calendar Data
  // ==============================

  const getCalendar = () => {
    if (!stats?.userCalendar?.submissionCalendar) {
      return {};
    }

    try {
      return JSON.parse(
        stats.userCalendar.submissionCalendar
      );
    } catch (error) {
      console.error("Calendar parsing error:", error);
      return {};
    }
  };

  // ==============================
  // Activity Statistics
  // ==============================

  const getActivityStats = () => {
    const calendar = getCalendar();

    if (!stats?.userCalendar) {
      return {
        streak: 0,
        last7Days: 0,
        last30Days: 0,
        score: 0,
      };
    }

    const now = Math.floor(Date.now() / 1000);

    const sevenDays = 7 * 24 * 60 * 60;
    const thirtyDays = 30 * 24 * 60 * 60;

    let last7Days = 0;
    let last30Days = 0;

    Object.entries(calendar).forEach(([timestamp]) => {
      const time = Number(timestamp);

      if (now - time <= sevenDays) {
        last7Days++;
      }

      if (now - time <= thirtyDays) {
        last30Days++;
      }
    });

    const streak = Number(stats.userCalendar.streak) || 0;

    // ==============================
    // CodePulse Score
    // ==============================

    const streakScore = Math.min(streak / 30, 1) * 40;

    const monthlyScore =
      Math.min(last30Days / 20, 1) * 40;

    const weeklyScore =
      Math.min(last7Days / 5, 1) * 20;

    const score = Math.round(
      streakScore + monthlyScore + weeklyScore
    );

    return {
      streak,
      last7Days,
      last30Days,
      score,
    };
  };

  // ==============================
  // Heatmap Data
  // ==============================

  const getHeatmapData = () => {
    const calendar = getCalendar();

    if (Object.keys(calendar).length === 0) {
      return [];
    }

    const today = new Date();

    const days = [];

    // Last 84 days
    for (let i = 83; i >= 0; i--) {
      const date = new Date(today);

      date.setDate(today.getDate() - i);
      date.setHours(0, 0, 0, 0);

      let count = 0;

      Object.entries(calendar).forEach(
        ([timestamp, value]) => {
          const submissionDate = new Date(
            Number(timestamp) * 1000
          );

          submissionDate.setHours(0, 0, 0, 0);

          if (
            submissionDate.getTime() ===
            date.getTime()
          ) {
            count = Number(value);
          }
        }
      );

      days.push({
        date: date.toLocaleDateString(),
        count,
      });
    }

    return days;
  };

  // ==============================
  // Calculate Activity
  // ==============================

  const activity = getActivityStats();

  const heatmapData = getHeatmapData();

  // ==============================
  // Heatmap Level
  // ==============================

  const getHeatmapLevel = (count) => {
    if (count === 0) {
      return 0;
    }

    if (count <= 2) {
      return 1;
    }

    if (count <= 5) {
      return 2;
    }

    if (count <= 9) {
      return 3;
    }

    return 4;
  };

  // ==============================
  // UI
  // ==============================

  return (
    <div className="app">
      <div className="container">

        {/* =========================
            Header
        ========================= */}

        <h1>
          LeetCode Stats Dashboard
        </h1>

        <p className="subtitle">
          Track your LeetCode progress in one place.
        </p>

        {/* =========================
            Search
        ========================= */}

        <div className="search-box">

          <input
            type="text"
            placeholder="Enter LeetCode username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />

          <button
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Loading..." : "Search"}
          </button>

        </div>

        {/* =========================
            Error
        ========================= */}

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        {/* =========================
            Dashboard
        ========================= */}

        {stats && (
          <div className="stats-section">

            {/* =====================
                Username
            ===================== */}

            <h2>
              {stats.username}'s Stats
            </h2>

            {/* =====================
                Stats Cards
            ===================== */}

            <div className="stats-grid">

              <div className="stat-card total">
                <h3>Total Solved</h3>
                <p>{getCount("All")}</p>
              </div>

              <div className="stat-card easy">
                <h3>Easy</h3>
                <p>{getCount("Easy")}</p>
              </div>

              <div className="stat-card medium">
                <h3>Medium</h3>
                <p>{getCount("Medium")}</p>
              </div>

              <div className="stat-card hard">
                <h3>Hard</h3>
                <p>{getCount("Hard")}</p>
              </div>

            </div>

            {/* =====================
                Difficulty Distribution
            ===================== */}

            <div className="difficulty-section">

              <h2>
                Difficulty Distribution
              </h2>

              {/* Easy */}

              <div className="difficulty-item">

                <div className="difficulty-header">
                  <span>Easy</span>

                  <span>
                    {getPercentage("Easy")}%
                  </span>
                </div>

                <div className="progress-bar">

                  <div
                    className="progress easy-progress"
                    style={{
                      width: `${getPercentage(
                        "Easy"
                      )}%`,
                    }}
                  ></div>

                </div>

              </div>

              {/* Medium */}

              <div className="difficulty-item">

                <div className="difficulty-header">
                  <span>Medium</span>

                  <span>
                    {getPercentage("Medium")}%
                  </span>
                </div>

                <div className="progress-bar">

                  <div
                    className="progress medium-progress"
                    style={{
                      width: `${getPercentage(
                        "Medium"
                      )}%`,
                    }}
                  ></div>

                </div>

              </div>

              {/* Hard */}

              <div className="difficulty-item">

                <div className="difficulty-header">
                  <span>Hard</span>

                  <span>
                    {getPercentage("Hard")}%
                  </span>
                </div>

                <div className="progress-bar">

                  <div
                    className="progress hard-progress"
                    style={{
                      width: `${getPercentage(
                        "Hard"
                      )}%`,
                    }}
                  ></div>

                </div>

              </div>

            </div>

            {/* =====================
                CodePulse Activity
            ===================== */}

            <div className="activity-section">

              <h2>
                🔥 CodePulse Activity
              </h2>

              <div className="activity-grid">

                {/* Current Streak */}

                <div className="activity-card streak-card">

                  <div className="activity-icon">
                    🔥
                  </div>

                  <h3>
                    Current Streak
                  </h3>

                  <p>
                    {activity.streak}
                  </p>

                  <span>
                    days
                  </span>

                </div>

                {/* Last 30 Days */}

                <div className="activity-card">

                  <div className="activity-icon">
                    📅
                  </div>

                  <h3>
                    Last 30 Days
                  </h3>

                  <p>
                    {activity.last30Days}
                  </p>

                  <span>
                    active days
                  </span>

                </div>

                {/* Last 7 Days */}

                <div className="activity-card">

                  <div className="activity-icon">
                    ⚡
                  </div>

                  <h3>
                    Last 7 Days
                  </h3>

                  <p>
                    {activity.last7Days}
                  </p>

                  <span>
                    active days
                  </span>

                </div>

                {/* CodePulse Score */}

                <div className="activity-card score-card">

                  <div className="activity-icon">
                    🚀
                  </div>

                  <h3>
                    CodePulse Score
                  </h3>

                  <p>
                    {activity.score}
                  </p>

                  <span>
                    / 100
                  </span>

                  <div className="score-bar">

                    <div
                      className="score-fill"
                      style={{
                        width: `${activity.score}%`,
                      }}
                    ></div>

                  </div>

                </div>

              </div>

            </div>

            {/* =====================
                Activity Heatmap
            ===================== */}

            <div className="heatmap-section">

              <h2>
                📅 Coding Activity
              </h2>

              <p className="heatmap-subtitle">
                Your coding activity over the
                last 84 days
              </p>

              <div className="heatmap">

                {heatmapData.map(
                  (day, index) => {

                    const level =
                      getHeatmapLevel(
                        day.count
                      );

                    return (
                      <div
                        key={index}
                        className={`heatmap-cell level-${level}`}
                        title={`${day.date}: ${day.count} submissions`}
                      ></div>
                    );
                  }
                )}

              </div>

              {/* Legend */}

              <div className="heatmap-legend">

                <span>
                  Less
                </span>

                <div className="legend-cell level-0"></div>

                <div className="legend-cell level-1"></div>

                <div className="legend-cell level-2"></div>

                <div className="legend-cell level-3"></div>

                <div className="legend-cell level-4"></div>

                <span>
                  More
                </span>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;