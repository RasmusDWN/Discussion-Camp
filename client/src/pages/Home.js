import { useEffect, useState } from "react";
import { useParams } from "@reach/router";
import TopicList from "../components/TopicList";

const API_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "";

export default function Home() {
    const [topics, setTopics] = useState([]);
    const [topic, setTopic] = useState();
    const [isLoading, setIsLoading] = useState([true]);

    const params = useParams();

    // const handlePostPOST = (post) => {
    //     const url = `${API_URL}/api/${topic._id}`;
    //     fetch(url, {
    //         method: 'POST', 
    //         mode: 'cors',
    //         cache: 'no-cache', 
    //         credentials: 'same-origin', 
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         redirect: 'follow', 
    //         referrerPolicy: 'no-referrer',
    //         body: JSON.stringify({post})
    //       })
    //     .then (response => {
    //         if (response.status === 200 || response.status === 201) {
    //             setIsLoading(true);
    //         }
    //     });
    // }

    useEffect(() => {
        if (isLoading) {
            fetch(API_URL + "/api/")
            .then(res => res.json())
            .then(data => {
                setTopics(data);
                console.log(data);
                setIsLoading(false);
            });
        }
    }, [isLoading]);

    if(!topics) {
        return <div>Loading...</div>
    }

    return (
        <div className="App mx-3">
            <TopicList 
                topics={topics}
            />
        </div>
    )
}