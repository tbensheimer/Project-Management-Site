import "./Project.css"
import Avatar from "../../components/avatar/Avatar";
import React, {useState} from "react"
import {useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeCompleteProject } from "../../redux/store";
import useFetch from "../../hooks/useFetch";

export default function ProjectSummary({project}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const {loading, error, post} = useFetch('');
    const [completeError, setCompleteError] = useState(null);

    var date = project.dueDate.split("T")[0].split("-");
    var formattedDate = `${date[1]}/${date[2]}/${date[0]}`;

    const handleComplete = async () => {
        if (user._id === project.createdBy._id) {
            project.isCompleted = true;
            const result = await post('/project/complete', project);
           
            if(result) {
            dispatch(removeCompleteProject(result))
            navigate('/');
        }
        }
        else {
            setCompleteError("Can't mark as complete, you are not the creator of the project");
            return;
        }
    }

    return (
        <div>
        <div className="project-summary">
            <h2 className="page-title">{project.name}</h2>
            <p className="due-date">Project due by {formattedDate}</p>
            <p className="details">{project.details}</p>
            <h4>Project is assigned to:</h4>
            {project.assignedUserList.map(user => {
                return <React.Fragment key={user._id}>
                <div className="avatar" key={user._id}>
                    <Avatar src={user.photoUrl} />
                </div>
                </React.Fragment>
            })}
            </div>
            {!project.isCompleted && <button disabled={loading} onClick={handleComplete} className="btn">{!loading ? "Mark as Complete" : "Loading..."}</button>}
            {error && <div className="error">{error}</div>}
            {completeError && <div className="error">{completeError}</div>}
            {project.isCompleted && <div className="success">Marked Complete</div>}
        </div>
    )
}