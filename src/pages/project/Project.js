import "./Project.css"
import { useParams } from "react-router"

export default function Project() {
    const id = useParams();
  //  const {project, error} = useFetchProjecthook();

    if(error) {
        return <div className="error">{error}</div>
    }

    if(!project) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div className="project-details">
            <h1>{project.name}</h1>
        </div>
    )
}