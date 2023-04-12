const express = require('express');
const {getAllProjects, createProject, getProjectDetails} = require("../controllers/projectController");

const router = express.Router();

router.get("/projects", getAllProjects);

router.post("/create", createProject);

router.get("/:id", getProjectDetails);

// router.post("/update", {});

// router.post("/delete", {});

module.exports = router;