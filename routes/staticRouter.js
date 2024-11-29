const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", (req, res) => {
    if(!req.user) return redirect("/login");
    const allUrls = URL.find({createdBy: req.user._id});
    return res.render("home", {
        urls: allUrls,
    });
})

router.get("/signup", (req, res) => {
    return res.render("signup");
})
router.get("/login", (req, res) => {
    return res.render("login");
})

module.exports = router;