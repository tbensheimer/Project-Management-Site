import "./Project.css"
import Avatar from "../../components/avatar/Avatar";

export default function ProjectSummary({project}) {

    return (
        <div className="project-summary">
            <h2 className="page-title">{project.name}</h2>
            <p className="due-date">Project due by {project.dueDate}</p>
            <p className="details">{project.details}</p>
            <h4>Project is assigned to:</h4>
            {ProjectSummary.assignedUsersList.map(user => {
                return <div key={user._id}>
                    <Avatar src={user.photoUrl} />
                </div>
            })}
        </div>
    )
}