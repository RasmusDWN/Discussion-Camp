import TopicItem from "../components/TopicItem";
import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";
import { useState, useEffect } from "react";
import { useParams } from "@reach/router";

const API_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "";

export default function TopicPage() { 
    const [topic, setTopic] = useState(null);
    const [isLoading, setIsLoading] = useState([true]);

    const handlePostPOST = (post) => {
        const url = `${API_URL}/api/${topic._id}/posts`;
        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({post}) // body data type must match "Content-Type" header
          })
        .then (response => {
            if (response.status === 200 || response.status === 201) {
                setIsLoading(true);
            }
        });
    }

    const params = useParams();

    useEffect(() => { 
        if (isLoading && params.id) {
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

    async function handlePostCreate(post) {
        await addNewPost(post);
    }

    async function addNewPost({ title, description }) {
        console.log(title, description);

        const newPost = {
            title: title,
            description: description
        };

        const response = await fetch(API_URL + "/api", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(newPost)
        });

        const data = await response.json();
        console.log("Added post: ", data);
        setTopic({...topic, data});
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