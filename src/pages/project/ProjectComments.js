import "./Project.css";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ProjectComments({project}) {
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const user = useSelector(state => state.user);

    const handleAddComment = async (e) => {
        e.preventDefault();

        setError(null);
        setLoading(true);

        const commentToAdd = {
            displayName: user.displayName,
            photoUrl: user.profileUrl,
            content: newComment,
            createdAt: Date().toLocaleString(),
            id: Math.random()                      
            // need to find better solution for id generation
        };
        

        const response = await fetch(`/project/add-comment/${project._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentToAdd)
        });

        const data = await response.json();

        console.log(data);
        if(!response.ok) {
            setError(data.error);
        }

        setLoading(false);
    }

    return (
        <div className="project-comments">
            <h4>Project Comments</h4>

            <form className="add-comment" onSubmit={handleAddComment}>
                <label>
                    <span>Add new comment:</span>
                    <textarea required onChange={e => setNewComment(e.target.value)} value={newComment} />

                    <button disabled={loading} className="btn">{!loading ? "Add Comment" : "Loading..."}</button>
                    {error && <div className="error">{error}</div>}
                </label>
            </form>
        </div>
    )
}