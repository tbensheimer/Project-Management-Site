import "./ProjectList.css"
import { Link } from "react-router-dom"
import Avatar from "../avatar/Avatar";

export default function ProjectList({projects, error, loading}) {

    return (
        <div className="project-list">
            {!loading && projects.length === 0 && <p>No Projects</p>}

            {projects.length > 0 && projects.map(project => {
                return <Link to={`/projects/${project._id}`} key={project._id}>
                    <h4>{project.name}</h4>
                    <p>Due By: {project.dueDate}</p>
                    <div className="assigned-to">
                        <ul>
                            {project.assignedUserList.map(user => {
                                return <li key={user._id}>
                                    <Avatar src={user.photoUrl} />
                                </li>
                            })}
                        </ul>
                    </div>
                    </Link>
            })}

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        </div>
    )
}