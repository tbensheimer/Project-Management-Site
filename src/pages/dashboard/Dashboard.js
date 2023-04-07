import ProjectList from "../../components/projectList/ProjectList";
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
            <ProjectList error={error} loading={loading} projects={projects} />
        </div>
    )
}