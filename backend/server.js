const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ==============================
// Test Route
// ==============================

app.get("/", (req, res) => {
  res.json({
    message: "LeetCode Stats Backend is running!"
  });
});

// ==============================
// LeetCode Stats + Activity API
// ==============================

app.get("/api/leetcode/:username", async (req, res) => {
  const username = req.params.username.trim();

  // Empty username check
  if (!username) {
    return res.status(400).json({
      message: "Please enter a LeetCode username"
    });
  }

  const query = `
    query getUserStats($username: String!) {
      matchedUser(username: $username) {
        username

        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }

        userCalendar {
          activeYears
          streak
          totalActiveDays
          submissionCalendar
        }
      }
    }
  `;

  try {
    const response = await fetch(
      "https://leetcode.com/graphql/",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Referer": "https://leetcode.com/"
        },

        body: JSON.stringify({
          query: query,
          variables: {
            username: username
          }
        })
      }
    );

    const data = await response.json();

    // ==============================
    // GraphQL Error
    // ==============================

    if (data.errors) {
      console.error("GraphQL Error:", data.errors);

      return res.status(404).json({
        message: "LeetCode username not found"
      });
    }

    // ==============================
    // Username Not Found
    // ==============================

    if (
      !data.data ||
      !data.data.matchedUser
    ) {
      return res.status(404).json({
        message: "LeetCode username not found"
      });
    }

    // ==============================
    // Send Data to Frontend
    // ==============================

    res.json(data.data.matchedUser);

  } catch (error) {
    console.error(
      "LeetCode API Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to fetch LeetCode data"
    });
  }
});

// ==============================
// Start Server
// ==============================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});