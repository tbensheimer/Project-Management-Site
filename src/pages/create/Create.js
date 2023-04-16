import "./Create.css"
import Select from "react-select";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import useProject from "../../hooks/useProject";
import {addProject} from "../../redux/store";

export default function Create() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.user);
    const [userOptions, setUserOptions] = useState([]);
    const {createProject, loading, error} = useProject();
    const dispatch = useDispatch();

    // form fields
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [category, setCategory] = useState("");
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [formError, setFormError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if(users != null) {
        let options = users.map(user => {
            return {label: user.displayName, value: user};
        });

        setUserOptions(options);
    }
    // eslint-disable-next-line
    }, []);

    const categoryOptions = [
        {label: "Development", value: "development"},       //FUTURE: add form + table to manage categories (using database)
        {label: "Marketing", value: "Marketing"},
        {label: "Design", value: "design"},
        {label: "Sales", value: "sales"}
    ]

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSuccess(null);
        setFormError(null);

        if(!category) {
            setFormError("Please select a project category");
            return;
        }

        if(assignedUsers.length < 1) {
            setFormError("Please assign at least one user");
            return;
        }

        if(Date.now() > new Date(dueDate)) {
            setFormError("Can't set due date in the past");
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

        const projectToCreate = {
            name,
            details,
            category: category.value,
            dueDate: new Date(dueDate),
            comments: [],
            createdBy,
            assignedUserList,
            isCompleted: false
        }

            const createdProject = await createProject(projectToCreate);    //success message (this works)

            if(createdProject) {
                setSuccess("Project created successfully");
                setName("");
                setDetails("");
                setCategory("");
                setDueDate("");
                setAssignedUsers("");

                dispatch(addProject(createdProject));
            }
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
                <Select value={category} options={categoryOptions} onChange={option => setCategory(option)} />
            </label>

            <label>
                <span>Assign Users:</span>
                <Select value={assignedUsers} isMulti options={userOptions} onChange={option => setAssignedUsers(option)} />  
            </label>

            <label>
                <span>Due Date:</span>
                <input type="date" required onChange={e => setDueDate(e.target.value)} value={dueDate} />
            </label>

            <button disabled={loading} className="btn">{loading ? "Loading..." : "Create Project"}</button>
            {formError && <p className="error">{formError}</p>}
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            </form>
        </div>
    )
}