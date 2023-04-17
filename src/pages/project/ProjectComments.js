import "./Project.css";
import { useState, useEffect} from "react";
import { useSelector } from "react-redux";
import Avatar from "../../components/avatar/Avatar";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function ProjectComments({project, listRef}) {
    const [newComment, setNewComment] = useState("");
    const [projectComments, setProjectComments] = useState([]);
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const user = useSelector(state => state.user);

    useEffect(() => {                   //separate fetch for comments only so whole project isn't reloaded every 2 seconds

        const getComments = async () => {               
        const response = await fetch(`/project/comments/${project._id}`);
        const data = await response.json();

        if(!response.ok) {
          console.log("error getting comments");                //need to use websockets for better performance
        }

        if(response.ok) {
        setProjectComments(data.comments)
        }
    }

    setProjectComments(project.comments);  //sets comments instantly 

   const interval = setInterval(() => {
    getComments();
    }, 3000);  

    return () => clearInterval(interval);

}, []);

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
        
        // setProjectComments([...projectComments, commentToAdd]);  //add comment instantly without delay from fetching comments
        setNewComment("");

        const response = await fetch(`/project/add-comment/${project._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentToAdd)      //needs improved since there's delays in comment add and disapearing temporarily
        });

        const data = await response.json();

        if(!response.ok) {
            setError(data.error);
        }

        setLoading(false);
    }

    return (
        <div className="project-comments">
            <h4>Project Comments</h4>
            <ul ref={listRef}>
                {projectComments.length > 0 && projectComments.map(comment => {
                    return <li key={comment.id}>
                        <div className="comment-author">
                            <Avatar src={comment.photoUrl} />
                            <p>{comment.displayName}</p>
                        </div>
                        <div className="comment-date">
                            <p>{formatDistanceToNow(new Date(comment.createdAt), {addSuffix: true})}</p>
                        </div>
                        <div className="comments-contents">
                            <p>{comment.content}</p>
                        </div>
                    </li>
                })}
            </ul>

            <form className="add-comment" onSubmit={handleAddComment}>
                <label>
                    <span>Add new comment:</span>
                    <textarea required onChange={e => setNewComment(e.target.value)} value={newComment} />

                    <button disabled={loading} className="btn">Add Comment</button>
                    {error && <div className="error">{error}</div>}
                </label>
            </form>
        </div>
    )
}