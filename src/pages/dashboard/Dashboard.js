import ProjectList from "../../components/projectList/ProjectList";
import "./Dashboard.css"
import { useSelector } from "react-redux";
import ProjectFilter from "./ProjectFilter";
import { useState } from "react";

export default function Dashboard() {
   const projects = useSelector(state => state.projects);
   const [filter, setFilter] = useState('All');
   const user = useSelector(state => state.user);

    const changeFilter = (newFilter) => {
        setFilter(newFilter);
    }

    const filteredProjects = projects ? projects.filter(project => {

        switch(filter) {
            case 'All':
                return true
            case 'Mine':
                let assignedToMe = false
                project.assignedUserList.forEach(u => {
                    if(u._id === user._id) {
                        assignedToMe = true;
                    }
                })
                return assignedToMe
            case 'Development':
                return project.category === filter
            case 'Design':
                return project.category === filter
            case 'Sales':
                return project.category === filter
            case 'Marketing':
                return project.category === filter
            default:
                return true
                
        }
    }) : null;

    return (
        <div className="project-list">
            {projects.length === 0 && <p>No Projects</p>}
            {projects.length > 0 && <ProjectFilter filter={filter} changeFilter={changeFilter} />}
            {projects.length > 0 && <ProjectList projects={filteredProjects} />}
        </div>
    )
}