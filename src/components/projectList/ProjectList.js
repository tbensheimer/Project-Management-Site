import "./ProjectList.css"
import { Link } from "react-router-dom"
import Avatar from "../avatar/Avatar";

export default function ProjectList({projects}) {

    return (
        <div className="project-list">
            {projects.length === 0 && <p>No Projects</p>}

            {projects.length > 0 && projects.map(project => {
                var date = project.dueDate.split("T")[0].split("-");
                var formattedDate = `${date[1]}/${date[2]}/${date[0]}`;

                const dateDifference = (Math.round((new Date(project.dueDate).getTime() - new Date(Date.now()).getTime()) / (990 * 3600 * 24)) + 1);

                let color;
                let description;
                if(dateDifference > 7) {
                    color = "good";
                    description = null;
                }
                else if(dateDifference <= 7 && dateDifference > 2) {
                    color = "warning";
                    description = "Upcoming";
                }
                else if(dateDifference <= 2 && dateDifference >= 0) {
                    color = "danger";
                    description = "Due soon!"
                }
                else if(dateDifference < 0) {
                    color = "danger";
                    description = "Late!";
                }

                return <Link to={`/projects/${project._id}`} data-testid={project.name} key={project._id}>
                    <h4>{project.name}<span className={color}>
                        {dateDifference < 0 && <i className="fa-solid fa-circle-exclamation fa-xl late"></i>} 
                        {description && description} <i className="fa-solid fa-hourglass-start fa-xl"></i>
                        </span></h4>
                    <p>Due By: {formattedDate}</p>
                    <div className="assigned-to">
                        <ul>
                            {project.assignedUserList.map(user => {
                                return <div key={user._id}>
                                <li key={user._id}>
                                    <Avatar src={user.photoUrl} />
                                </li>
                                </div>
                            })}
                        </ul>
                    </div>
                    </Link>
            })}

        </div>
    )
}