import "./Dashboard.css";

export default function ProjectFilter({filter, changeFilter}) {

    const filterList = ['All', 'Mine', 'Development', 'Marketing', 'Design', 'Sales'];

    const changeFilterClick = (filter) => {
        changeFilter(filter);
    }

    return (
        <div className="project-filter">
            <nav>
                <p>Filter By:</p>
                {filterList.map(filterOption => {
                    return <button key={filterOption} onClick={() => changeFilterClick(filterOption)} className={filter === filterOption ? "active" : ""}>{filterOption}</button> 
                })}
            </nav>
        </div>
    )
}