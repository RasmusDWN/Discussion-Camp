import { useState } from "react";

export default function CommentForm({onCommentPost}) {

    const [comment, setComment] = useState("");

    const handleButtonClick = () => {
        if (typeof onCommentPost === "function") {
            onCommentPost(comment);
            setComment("");
        }
        console.log("comment", comment);
    }

    return (
        <form>
            <div className="form-group mb-2">
                <textarea onChange={(event) => setComment(event.target.value)} className="form-control" value={comment} placeholder="Your Comment"></textarea>                
            </div>
            <button type="button" onClick={handleButtonClick} className="btn btn-primary mb-2" >Post Comment</button>
        </form>
    )
}