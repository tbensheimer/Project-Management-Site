const express = require('express');
const {getAllProjects, createProject, getProjectDetails, addProjectComment} = require("../controllers/projectController");

const router = express.Router();

router.get("/projects", getAllProjects);

router.post("/create", createProject);

router.get("/:id", getProjectDetails);

router.post("/add-comment/:id", addProjectComment)

// router.post("/update", {});

// router.post("/delete", {});

module.exports = router;