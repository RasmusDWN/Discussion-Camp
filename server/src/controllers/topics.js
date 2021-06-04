import TopicDB from "../Models/topicDB";
import express from "express";
import { Mongoose } from "mongoose";
import topicDB from "../Models/topicDB";

const router = express.Router();

export const getTopics = async (req, res) => {
    try {
        const topicDB = await TopicDB.find();
        console.log(topicDB);

        res.status(200).json(topicDB);
    } catch(error) {
        res.status(404).json({ message : error.message });
    }
}

export const getTopic = async (req, res) => {
    const { id } = req.params;

    try {
        const topic = await TopicDB.findById();

        res.status(200).json(topic)
    } catch(error) {
        res.status(404).json({ message: error.message})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new topicDB({...post, username: req.username, createdAt: new Date().toISOString() });

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch(error) {
        res.status(409).json({ message: error.message });
    }
}

export const createComment = async (req, res) => {
    const comment = req.body;
    const newComment = new topicDB({...comment, username: req.username, upvotes: 0});

    try {
        await newComment.save();

        res.status(201).json(newComment);
    } catch(error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params; 
    const { title, description, username } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { username, title, description, _id: id};

    await TopicDB.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const bootstrap = async (req, res) => {
    const { count = 4 } = req.params;

    if (l === 0) {
        let promises = [];
        for (let i = 0; i < count; i++) {
            let newTopic = new Topic({
                title: `Topic number ${i}`,
                posts: [{
                    title: `this is a title`,
                    username: `Username`,
                    description: `description`,
                    createdAt: new Date(),
                    comments: [{
                        comment: `this is a comment`,
                        username: `Username`,
                        upvotes: 0
                    }]                        
                }]
            });
            promises.push(newTopic.save());
        }
        return Promise.all(promises);
    }

    export const upvote = async (req, res) => {
        const { id } = req.params;

        if (!req.username) {
            return res.json({ message: "Unauthenticated! "});
        }

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        const comment = await TopicDB.findById(id);
        const index = comment.upvotes.findIndex((id) => id === String(req.username));

        if (index === -1) {
            comment.upvotes.push(req.username);
        } else {
            comment.upvotes = comment.upvotes.filter((id) => id !== String(req.username));
        }
        const updatedComment = await TopicDB.findByIdAndUpdate(id, comment, { new: true });
        res.status(200).json(updatedComment);
    }

    export default router;
    
}