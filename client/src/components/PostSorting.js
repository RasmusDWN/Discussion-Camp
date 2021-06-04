import { Component } from "react";
import PostList from "../components/PostList";

export default function PostSorting() {

    const toggleSortDate = (event) => {
        const {postList} = state;
        let newPostList = postList.reverse();
        setState({
            postlist: newPostList
        });
    }
    
    const toggleListReverse (event) {

    }
}