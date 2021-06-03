import CommentItem from "./CommentItem";
import "./CommentList.css";

export default function CommentList({comments, onVote}) {
    
    const handleVoteClick = (commentId) => {
        if (typeof onVote === "function") {
            onVote(commentId);
        }
    }

    return (
        <div className="comment-list">
            {comments.map((comment) => (
                <CommentItem 
                    id={comment._id}
                    key={comment._id}
                    comment={comment.comment}
                    username={comment.username}
                    upvotes={comment.upvotes}
                    onVoteClick={handleVoteClick}
                />
            ))}
        </div>
    );
}