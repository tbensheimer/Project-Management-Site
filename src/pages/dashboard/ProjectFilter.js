import "./Dashboard.css";
import {useState} from "react"

export default function ProjectFilter() {
    const [currentFilter, setCurrentFilter] = useState('All');

    const filterList = ['All', 'Mine', 'Development', 'Marketing', 'Design', 'Sales'];

    const handleFilter = (filter) => {
        setCurrentFilter(filter);
    }

    return (
        <div className="project-filter">
            <nav>
                <p>Filter By:</p>
                {filterList.map(filter => {
                    return <button key={filter} onClick={() => handleFilter(filter)} className={currentFilter === filter ? "active" : ""}>{filter}</button> 
                })}
            </nav>
        </div>
    )
}