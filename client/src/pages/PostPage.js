import PostItem from "../components/PostItem";
import CommentList from "../components/CommentList";
import TopicItem from "../components/TopicItem";
import { useParams } from "@reach/router";
import CommentForm from "../components/CommentForm";
import { useState, useEffect } from "react";


const API_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "";


export default function PostPage() {
    
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState([true]); 
    const [topic, setTopic] = useState(null);

    const handleCommentPOST = (comment) => {
        const url = `${API_URL}/api/${post._id}/comments`;
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
            body: JSON.stringify({comment}) 
          })
        .then (response => {
            if (response.status === 200 || response.status === 201) {
                setIsLoading(true);
            }
        });
    }

    const handleVote = (commentId) => {
        const url = `${API_URL}/api/${post._id}/votes/${commentId}`;
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
            body: ""
          })
        .then (response => {
            console.log("Response ", response);
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
                setPost(data);
                setTopic(data);
                setIsLoading(false);
            });
        }
    }, [isLoading]);

    if (!post) {
        return <div>Loading post...</div>
    }

    return (
        <div className="mx-3">
            <TopicItem 
                id={topic._id}
                topic={topic.title}
                hideButton={true}
            />
            <PostItem 
                id={post._id}
                post={post.title}
                username=""
                desc={post.description}
                hideButton={true}
            />
            <CommentForm 
                onCommentPost={handleCommentPOST}
            />
            { <CommentList 
                comments={post.comments}
                onVote={handleVote}
            /> }
        </div>
    )
}