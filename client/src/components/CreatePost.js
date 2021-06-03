import { useState } from "react";

export default function CreatePost({onPostCreate}) {
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handlePostCreate = (event) => {
        event.preventDefault();

        if (typeof onPostCreate === "function") {
            onPostCreate({
                title,
                description
            });
            setTitle("");
            setDescription("");
        }
    }

    return (
        <form>
            <div className="form-group mb-2">
                <label htmlFor="postTitle" className="form-label">Enter the post subject:</label>
                <input className="form-control" onChange={(event) => setTitle(event.target.value)} type="text" placeholder="Title" value={title} />
            </div>
            <div className="form-group mb-2">
                <label htmlFor="postDescription" className="form-label">Describe what your post is about:</label>
                <textarea className="form-control" id="postDescription" onChange={(event) => setDescription(event.target.value)} value={description}></textarea>
            </div>
            <button type="button" className="btn btn-primary" onClick={handlePostCreate}>Submit post</button>
        </form>
    );
}