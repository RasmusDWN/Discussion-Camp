import Button from "./Button";
import { useNavigate } from "@reach/router";

export default function PostItem({ topicId, id, post, desc, date, username, hideButton }) {
    
    let navigate = useNavigate();

    const handleClick = () => {
        navigate(`/topics/${topicId}/${id}`);
    };

    return (
        <div className="post" key={`p${id}`}>
            <h2>{post}</h2>
            <p>{date}</p>
            <h3>Posted by: {username}</h3>     
            {!hideButton && <Button label="View Post" onClick={handleClick} />}
        </div>
    )
}