import "./Dashboard.css"
// import useProject from "../../hooks/useProject";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
       
        const getAllProjects = async () => {
            setLoading(true);
            setError(null);

        const response = await fetch("/project/projects");

        const data = await response.json();
    
        if(!response.ok) {
            setError(data.error)
            setLoading(false);
        }
    
        if(response.ok) {
            setLoading(false);
            setProjects(data.projects);;
        }
    };
    getAllProjects();

            // eslint-disable-next-line
    }, []);

    return (
        <div className="project-list">
            {!loading && projects.length === 0 && <p>No Projects</p>}
            {projects.length > 0 && projects.map(project => {
                return <div key={project._id}>{project.name}</div>
            })}

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        </div>
    )
}