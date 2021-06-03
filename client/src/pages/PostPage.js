import PostItem from "../components/PostItem";
import CommentList from "../components/CommentList";
import { useParams } from "@reach/router";
import CommentForm from "../components/CommentForm";
import { useState, useEffect } from "react";


const API_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "";


export default function PostPage() {
    
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState([true]); 

    const handleCommentPOST = (comment) => {
        const url = `${API_URL}/api/${post._id}/comments`;
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
            body: JSON.stringify({comment}) // body data type must match "Content-Type" header
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
            body: "" // body data type must match "Content-Type" header
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
                setIsLoading(false);
            });
        }
    }, [isLoading]);

    if (!post) {
        return <div>Loading post...</div>
    }

    return (
        <div className="mx-3">
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