import { useEffect, useState } from "react";
import QuestionList from "../components/PostList";

export default function TopicPage() { 
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useEffect([true]);
    
    useEffect(() => { 
        if (isLoading) {
            fetch(API_URL + "/api")
            .then(res => res.json())
            .then(data => { 
                setQuestions(data);
                setIsLoading(false);
            });
        }
    }, [isLoading]);

    async function handlePostNew(post) {
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
        setPosts([...posts, data]);
    }
}