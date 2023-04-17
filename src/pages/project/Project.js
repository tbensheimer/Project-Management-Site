import "./Project.css"
import { useParams } from "react-router"
import { useEffect, useState, useRef } from "react";
import ProjectSummary from "./ProjectSummary";
import ProjectComments from "./ProjectComments";
import useFetch from "../../hooks/useFetch";

export default function Project() {
    const id = useParams().id;
    const [project, setProject] = useState(null);
    const listRef = useRef();
    const {get, loading, error} = useFetch('');

    useEffect(() => {
        const fetchProjectDetails = async () => {
        const result = await get(`/project/${id}`);

        if (result) {
            setProject(result);

            if (listRef.current && listRef.current.scrollHeight > 0) {
            listRef.current.scroll({top: listRef.current.scrollHeight, behavior: "smooth"});
            }
        }
    };

        fetchProjectDetails();

    }, [id]);

    return (
        <div className="project-details">
            {loading && <div className="loading">Loading...</div>}
            {project && <ProjectSummary project={project} /> }
            {project && <ProjectComments project={project} listRef={listRef} />}
            {error && <div className="error">{error}</div>}
        </div>
    )
}