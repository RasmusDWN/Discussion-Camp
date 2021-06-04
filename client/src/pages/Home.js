import { useEffect, useState } from "react";
import TopicList from "../components/TopicList";

const API_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "";

export default function Home() {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState([true]);

    useEffect(() => {
        if (isLoading) {
            fetch(API_URL + "/api")
            .then(res => res.json())
            .then(data => {
                setTopics(data);
                console.log(data);
                setIsLoading(false);
            });
        }
    }, [isLoading]);

    return (
        <div className="App mx-3">
            <h1>Discussion Camp</h1>
            <TopicList topics={topics}/>
        </div>
    )
}