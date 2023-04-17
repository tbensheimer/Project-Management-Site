import "./Project.css";
import { useState, useEffect} from "react";
import { useSelector } from "react-redux";
import Avatar from "../../components/avatar/Avatar";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import useFetch from "../../hooks/useFetch";

export default function ProjectComments({project, listRef}) {
    const [newComment, setNewComment] = useState("");
    const [projectComments, setProjectComments] = useState([]);
    const user = useSelector(state => state.user);
    const {get, post, error} = useFetch('');

    useEffect(() => {
        const getComments = async () => {    
        const result = await get(`/project/comments/${project._id}`);
        if(result) {
        setProjectComments(result.comments);
        }
    }

    setProjectComments(project.comments);  //sets comments instantly 

   const interval = setInterval(() => {
    getComments();
    }, 3000);  

    return () => clearInterval(interval);
    // eslint-disable-next-line
}, []);

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

        setNewComment("");
        await post(`/project/add-comment/${project._id}`, commentToAdd);
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

                    <button className="btn">Add Comment</button>
                    {error && <div className="error">{error}</div>}
                </label>
            </form>
        </div>
    )
}