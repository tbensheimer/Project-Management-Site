import "./History.css"
import { useSelector } from "react-redux";
import ProjectList from "../../components/projectList/ProjectList";
import { useState } from "react";
import ProjectFilter from "../../components/projectFilter/ProjectFilter";

export default function History() {
    const completedProjects = useSelector(state => state.completedProjects);
    const [filter, setFilter] = useState('All');
    const user = useSelector(state => state.user);
 
     const changeFilter = (newFilter) => {
         setFilter(newFilter);
     }
 
     const filteredProjects = completedProjects ? completedProjects.filter(project => {
 
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
             case 'Design':
             case 'Sales':
             case 'Marketing':
                 return project.category === filter
             default:
                 return true
                 
         }
     }) : null;
 
     return (
         <div className="project-list">
             {completedProjects.length === [] && <p>No Projects</p>}
             {completedProjects.length > 0 && <ProjectFilter filter={filter} changeFilter={changeFilter} />}
             {completedProjects.length > 0 && <ProjectList projects={filteredProjects} />}
         </div>
     )
}