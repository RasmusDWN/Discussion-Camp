import "./PostList.css";
import PostItem from "./PostItem";

export default function PostList({posts}) {
    
    if (!posts) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="post-list">
            {posts.map((post) => (
            <PostItem 
                id={post._id}
                key={post._id}
                post={post.title}
                desc={post.description}
                />
            ))}
        </div>
    );
}