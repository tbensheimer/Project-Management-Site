import "./Create.css"
import Select from "react-select";
import {useState, useEffect} from "react";
import {useSelector} from "react-redux";

export default function Create() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.user);
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
        {label: "Development", value: "development"},       //FUTURE: add form + table to manage categories (using database)
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

        const createdBy = {                         //user signed in info
            displayName: user.displayName,
            profileUrl: user.profileUrl,
            _id: user._id
        };

        const assignedUserList = assignedUsers.map(user => {
            return {displayName: user.value.displayName, photoUrl: user.value.profileUrl, _id: user.value._id};
        });

        const project = {
            name,
            details,
            category: category.value,
            dueDate: new Date(dueDate),
            comments: [],
            createdBy,
            assignedUserList
        }

        console.log(project);
        //Add hook here to create project into DB

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