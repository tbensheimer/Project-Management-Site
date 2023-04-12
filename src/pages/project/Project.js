import "./Project.css"
import { useParams } from "react-router"
import { useEffect, useState } from "react";

export default function Project() {
    const id = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [project, setProject] = useState([]);

    useEffect(() => {

        const fetchProjectDetails = async () => {
            setError(null);
            setLoading(true);

            const response = await fetch(`/project/${id.id}`);

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
    }, []);

    return (
        <div className="project-details">
            {loading && <div className="loading">Loading...</div>}
            <h1>{project.name}</h1>
            {error && <div className="error">{error}</div>}
        </div>
    )
}