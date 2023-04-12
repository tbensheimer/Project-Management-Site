import "./Project.css"
import { useParams } from "react-router"
import { useEffect, useState } from "react";
import ProjectSummary from "./ProjectSummary";

export default function Project() {
    const id = useParams().id;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [project, setProject] = useState(null);

    useEffect(() => {

        const fetchProjectDetails = async () => {
            setError(null);
            setLoading(true);

            const response = await fetch(`/project/${id}`);

            const data = await response.json();

            if(response.ok) {
                setProject(data);
                setError(null);
                setLoading(false);
            }

            if(!response.ok) {
                setError(data.error);
                setLoading(false);
            }
        }
        fetchProjectDetails();
    }, [id]);

    return (
        <div className="project-details">
            {loading && <div className="loading">Loading...</div>}
            {project && <ProjectSummary project={project} /> }
            {error && <div className="error">{error}</div>}
        </div>
    )
}