import TopicItem from "../components/TopicItem";
import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";
import { useState, useEffect } from "react";
import { useParams } from "@reach/router";

const API_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "";

export default function TopicPage() { 
    const [topic, setTopic] = useState();
    const [isLoading, setIsLoading] = useState([true]);

    const handlePostPOST = (post) => {
        const url = `${API_URL}/api/${topic._id}/posts`;
        fetch(url, {
            method: 'POST', 
            mode: 'cors',
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({post})
          })
        .then (response => {
            if (response.status === 200 || response.status === 201) {
                setIsLoading(true);
            }
        });
    }

    const params = useParams();

    useEffect(() => { 
        if (isLoading) {
            fetch(API_URL + "/api/" + params.id)
            .then(res => res.json())
            .then(data => { 
                setTopic(data);
                setIsLoading(false);
            });
        }
    }, [isLoading]);

    if (!topic) {
        return <div>Loading topic...</div>
    }

    return (
        <div className="mx-3">
            <TopicItem 
                id={topic._id}
                topic={topic.title}
                hideButton={true}
            />
            <CreatePost 
                onPostCreate={handlePostPOST}
            />
            
            <h4>Posts:</h4>
            { <PostList 
                posts={topic.posts}
            /> }

        </div>
    )

}