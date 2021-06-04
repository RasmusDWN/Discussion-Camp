import { useEffect, useState } from "react";
import { useParams } from "@reach/router";

import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";
import TopicItem from "../components/TopicItem";

const API_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "";

export default function Home() {
    const [topics, setTopics] = useState([]);
    const [topic, setTopic] = useState();
    const [isLoading, setIsLoading] = useState([true]);

    const params = useParams();

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

    useEffect(() => {
        if (isLoading) {
            fetch(API_URL + "/api" + params.id)
            .then(res => res.json())
            .then(data => {
                setTopics(data);
                console.log(data);
                setTopic(data);
                setIsLoading(false);
            });
        }
    }, [isLoading]);

    if(!topic) {
        return <div>Loading Topic...</div>
    }

    return (
        <div className="App mx-3">
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