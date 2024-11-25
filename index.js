const express = require("express");
const path = require("path");
const URL = require("./models/url");
const { connectMongoDb } = require("./connect");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const app = express();
const PORT = 8001;

//Connection
connectMongoDb("mongodb://localhost:27017/shortUrl");

// set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false})) // for form data

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
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
