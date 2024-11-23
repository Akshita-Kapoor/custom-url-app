const express = require("express");
const URL = require("./models/url");
const { connectMongoDb } = require("./connect");
const urlRoute = require("./routes/url");
const app = express();
const PORT = 8001;

//Connection
connectMongoDb("mongodb://localhost:27017/shortUrl");

app.use(express.json());
app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitedHistory: [
            {
                timeStamp: Date.now()
            }
        ]
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, console.log("Server is running"));
