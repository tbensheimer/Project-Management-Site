import ProjectList from "../../components/projectList/ProjectList";
import "./Dashboard.css"
import { useSelector } from "react-redux";
import ProjectFilter from "./ProjectFilter";

export default function Dashboard() {
   const projects = useSelector(state => state.projects);

    return (
        <div className="project-list">
            {projects === [] && <p>No Projects</p>}
            {projects.length > 0 && <ProjectFilter />}
            {projects.length > 0 && <ProjectList projects={projects} />}
        </div>
    )
}