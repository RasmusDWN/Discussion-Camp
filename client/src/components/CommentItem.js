export default function CommentItem({id, comment, username, upvotes, onVoteClick}) {

    const handleVoteClick = (event) => {
        event.preventDefault();
        console.log("Vote clicked", id);
        if (typeof onVoteClick === "function") {
            onVoteClick(id);
        }
    }

    return (
        <div className="comment">
            <p>{comment}</p>
            <small>User: {username}</small>
            <div className="votes">Votes <span className="badge bg-info" style={{cursor: "pointer"}} on onClick={handleVoteClicl}>{upvotes}</span></div>
        </div>
    );
}