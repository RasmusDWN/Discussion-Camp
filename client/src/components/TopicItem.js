import Button from "./Button";
import { useNavigate } from "@reach/router";

export default function TopicItem({id, topic, hideButton}) {
    let navigate = useNavigate();

    const handleClick = () => {
        navigate(`/topics/${id}`);
    };

    return (
        <div className="topic" key={`t${id}`}>
            <h2>{topic}</h2>
            {!hideButton && <Button label="Posts" onClick={handleClick} />}
        </div>
    );
}