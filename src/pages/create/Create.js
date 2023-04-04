import "./Create.css"
import Select from "react-select";
import {useState, useEffect} from "react";
import {useSelector} from "react-redux";

export default function Create() {
    const users = useSelector(state => state.users);
    const [userOptions, setUserOptions] = useState([]);

    // form fields
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [category, setCategory] = useState("");
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        let options = users.map(user => {
            return {label: user.displayName, value: user};
        });

        setUserOptions(options);
    }, [users]);

    const categoryOptions = [
        {label: "Development", value: "development"},
        {label: "Marketing", value: "Marketing"},
        {label: "Design", value: "design"},
        {label: "Sales", value: "sales"}
    ]

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setFormError(null);

        if(!category) {
            setFormError("Please select a project category");
            return;
        }

        if(assignedUsers.length < 1) {
            setFormError("Please assign at least one user");
            return;
        }


        console.log(name, details, dueDate, category, assignedUsers);

    }

    return (
        <div className="create-form">
            <h2 className="page-title">Create a new project</h2>

            <form onSubmit={handleFormSubmit}>
            <label>
                <span>Project Name:</span>
                <input type="text" required onChange={e => setName(e.target.value)} value={name} />
            </label>

            <label>
                <span>Project Details:</span>
                <textarea type="text" required onChange={e => setDetails(e.target.value)} value={details} />
            </label>

            <label>
                <span>Category:</span>
                <Select options={categoryOptions} onChange={option => setCategory(option)} />
            </label>

            <label>
                <span>Assign Users:</span>
                <Select isMulti options={userOptions} onChange={option => setAssignedUsers(option)} />
            </label>

            <label>
                <span>Due Date:</span>
                <input type="date" required onChange={e => setDueDate(e.target.value)} value={dueDate} />
            </label>

            <button className="btn">Create Project</button>
            {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )
}