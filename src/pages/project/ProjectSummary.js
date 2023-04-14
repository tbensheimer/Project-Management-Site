import "./Project.css"
import Avatar from "../../components/avatar/Avatar";
import React from "react"

export default function ProjectSummary({project}) {
    var date = project.dueDate.split("T")[0].split("-");
    var formattedDate = `${date[1]}/${date[2]}/${date[0]}`;

    return (
        <div className="project-summary">
            <h2 className="page-title">{project.name}</h2>
            <p className="due-date">Project due by {formattedDate}</p>
            <p className="details">{project.details}</p>
            <h4>Project is assigned to:</h4>
            {project.assignedUserList.map(user => {
                return <React.Fragment key={user.id}>
                <div key={user.id}>
                    <Avatar src={user.photoUrl} />
                </div>
                </React.Fragment>
            })}
        </div>
    )
}