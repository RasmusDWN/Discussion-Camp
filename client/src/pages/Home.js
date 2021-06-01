import { useEffect, useState } from "react";
import PostList from "../components/PostList";

const API_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "";

export default function Home() {
    
}