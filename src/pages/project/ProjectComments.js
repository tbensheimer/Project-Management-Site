import "./Project.css";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ProjectComments({project}) {
    const [newComment, setNewComment] = useState("");
    const user = useSelector(state => state.user);

    const handleAddComment = async (e) => {
        e.preventDefault();

        const commentToAdd = {
            displayName: user.displayName,
            photoUrl: user.profileUrl,
            content: newComment,
            createdAt: Date().toLocaleString(),
            id: Math.random()                      
            // need to find better solution for id generation
        };
        console.log(commentToAdd);
    }

    return (
        <div className="project-comments">
            <h4>Project Comments</h4>

            <form className="add-comment" onSubmit={handleAddComment}>
                <label>
                    <span>Add new comment:</span>
                    <textarea required onChange={e => setNewComment(e.target.value)} value={newComment} />

                    <button className="btn">Add Comment</button>
                </label>
            </form>
        </div>
    )
}