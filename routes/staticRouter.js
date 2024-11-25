const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", (req, res) => {
    const allUrls = URL.find({});
    return res.render("home", {
        urls: allUrls,
    });
})

module.exports = router;