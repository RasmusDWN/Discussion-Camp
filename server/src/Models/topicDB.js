module.exports = (mongoose) => {
    const commentSchema = new mongoose.Schema({
        comment: String,
        username: String,
    }); 
    const postSchema = new mongoose.Schema({
        title: String,
        username: String,
        description: String,
        createdAt: {
            type: Date,
            default: new Date() 
        },
        comments: [commentSchema]
    });
    const topicSchema = new mongoose.Schema({
        title: String,
        posts: [postSchema]
    })

    const Topic = mongoose.model('Topic', topicSchema);

    async function getTopics() {
        try {
            return await Topic.find();
        } catch (error) {
            console.error("getTopics:", error.message);
            return {};
        }
    }

    async function getTopic(id) {
        try {
            return await Topic.findById(id);
        } catch (error) {
            console.error("getTopic:", error.message);
            return {};
        }
    }

    async function createPost(topicId, title, description, username) {
        
        // Add a new Post
        const newPost = {
            title: title,
            description: description,
            username: username,
            comments: []
        };

        // Save the new post to the database
        try {
            await Topic.findByIdAndUpdate(
                { _id: topicId },
                { $push: { posts: newPost } }
            );
            return newPost;

        } catch(error) {
            console.error("savedPosts:", error.message);
        }       
    }

    async function getPost(id) {
        try {
            const topic = await Topic.findOne({ "posts._id": id });
            return topic.posts.id(id);
        } catch (error) {
            console.error("getPost:", error.message);
            return {};
        }
    }

    async function bootstrap(count = 4) {
        let l = (await getTopics()).length;
        console.log("Topic collection size:", l);
        
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
    }

    async function createComment(postId, comment) {

        const newComment = {
            upvotes: 0,
            comment: comment
        };

        try {
            await Post.findByIdAndUpdate(
                { _id: postId },
                { $push: { comments: newComment} }
            );
            return newComment;
        } catch (error) {
            console.error("createComment:", error.message);
            return {};
        }
    }

    async function vote(commentId, vote) {
        let votes = -1;
        if(vote == "up") {
            votes = 1;
        };

        await Topic.updateOne(
            {'comments._id': commentId},
            {'$inc': { 'comments.$.upvotes' : votes}}
        );
    }

    return {
        getTopics,
        getTopic,
        createPost,
        getPost,
        bootstrap,
        createComment,
        vote
    }
}