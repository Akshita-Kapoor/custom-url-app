const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function generateNewShortURL(req, res) {
  const shortId = nanoid(8);
  const body = req.body;
  
  if (!body.url) return res.status(400).json({ error: "url is required" });

  await URL.create(
    {
      shortId: shortId,
      redirectURL: body.url,
      visitedHistory: [],
      createdBy: req.user._id
    }
  );
  return res.render("home", {
    id: shortId
  })
}

async function getAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitedHistory.length,
    analytics: result.visitedHistory,
  });
}

module.exports = { generateNewShortURL, getAnalytics };
