import "./TopicList.css"
import TopicItem from "./TopicItem";

export default function TopicList({topics}) {

    if (!topics || !Array.isArray(topics)) {
        return (
            <div>Loading Topics...</div>
        )
    }

    return (
        <div className="topic-list">
            {topics.map((topic) =>(
                <TopicItem
                    id={topic._id}
                    key={topic._id}
                    topic={topic.title} 
                    />
            ))}
        </div>
    );
}