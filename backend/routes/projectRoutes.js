const express = require('express');
const {getAllProjects, createProject} = require("../controllers/projectController");

const router = express.Router();

router.get("/projects", getAllProjects);

router.post("/create", createProject);

// router.post("/update", {});

// router.post("/delete", {});

module.exports = router;