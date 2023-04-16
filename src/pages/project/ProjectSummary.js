import "./Project.css"
import Avatar from "../../components/avatar/Avatar";
import React, {useState} from "react"
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProjectSummary({project}) {
    var date = project.dueDate.split("T")[0].split("-");
    var formattedDate = `${date[1]}/${date[2]}/${date[0]}`;
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [error, setError] = useState(null);

    const handleDelete = async () => {

        if (user._id === project.createdBy.id) {
        
            project.isCompleted = true;

            const response = await fetch('/project/complete', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(project)
            });

            const data = await response.json();

            if(response.ok) {
                navigate('/');
            }

            if(!response.ok) {
                setError(data.error);
            }
        }
        else {
            setError("Can't mark as complete, you are not the creator of the project");
            return;
        }
    }

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
            <button onClick={handleDelete} className="btn">Mark as Complete</button>
            {error && <div className="error">{error}</div>}
        </div>
    )
}