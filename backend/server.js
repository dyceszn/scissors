const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5002;

app.use(cors());
app.use(express.json());

const BITLY_API_KEY = process.env.REACT_APP_BITLY_ACCESS_TOKEN;
const REBRANDLY_API_KEY = process.env.REACT_APP_REBRANDLY_ACCESS_TOKEN;

app.get("/api/bitly/analytics", async (req, res) => {
  const { shortenedUrl } = req.query;
  const linkId = shortenedUrl.replace("https://bit.ly/", "");

  try {
    const response = await axios.get(
      `https://api-ssl.bitly.com/v4/bitlinks/${linkId}/clicks/summary`,
      {
        headers: {
          Authorization: `Bearer ${BITLY_API_KEY}`,
          "Content-Type": "application/json",
          "X-Bitly-Api-Version": "2024-06-12",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching Bitly analytics:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/bitly/clicksByDate", async (req, res) => {
  const { shortenedUrl } = req.query;
  const linkId = shortenedUrl.replace("https://bit.ly/", "");

  try {
    const response = await axios.get(
      `https://api-ssl.bitly.com/v4/bitlinks/${linkId}/clicks?unit=day&units=-1`,
      {
        headers: {
          Authorization: `Bearer ${BITLY_API_KEY}`,
          "Content-Type": "application/json",
          "X-Bitly-Api-Version": "2024-06-12",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Bitly analytics:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/rebrandly/analytics", async (req, res) => {
  const { shortenedUrl } = req.query;
  const linkId = shortenedUrl.replace("https://rebrand.ly/", "");

  try {
    const response = await axios.get(
      `https://api.rebrandly.com/v1/links/${linkId}/clicks`,
      {
        headers: {
          apikey: REBRANDLY_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
