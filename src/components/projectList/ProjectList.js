import "./ProjectList.css"
import { Link } from "react-router-dom"
import Avatar from "../avatar/Avatar";
import React from "react";

export default function ProjectList({projects}) {

    return (
        <div className="project-list">
            {projects.length === 0 && <p>No Projects</p>}

            {projects.length > 0 && projects.map(project => {
                var date = project.dueDate.split("T")[0].split("-");
                var formattedDate = `${date[1]}/${date[2]}/${date[0]}`;

                return <Link to={`/projects/${project._id}`} key={project._id}>
                    <h4>{project.name}</h4>
                    <p>Due By: {formattedDate}</p>
                    <div className="assigned-to">
                        <ul>
                            {project.assignedUserList.map(user => {
                                return <React.Fragment key={user._id}>
                                <li key={user._id}>
                                    <Avatar src={user.photoUrl} />
                                </li>
                                </React.Fragment>
                            })}
                        </ul>
                    </div>
                    </Link>
            })}

        </div>
    )
}