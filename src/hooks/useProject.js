import {useState} from "react";

export default function useSignup() {
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const createProject = async (project) => {
    setLoading(true);
    setError(null);
   
    const response = await fetch("/project/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: project.name,
            details: project.details,
            category: project.category,
            dueDate: project.dueDate,
            comments: project.comments,
            createdBy: project.createdBy,
            assignedUserList: project.assignedUserList
        })
    });

    const data = await response.json();

    if(!response.ok) {
        setError(data.error)
        setLoading(false);
    }

    if(response.ok) {
        setLoading(false);
        return true;
    }
}
return {error, loading, createProject}
}