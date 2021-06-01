module.exports = (mongoose) => {
    const commentSchema = new mongoose.Schema({
        comment: String,
        username: String,
        upvotes: Number
    }); 
    const postSchema = new mongoose.Schema({
        title: String,
        username: String,
        description: String,
        date: Date,
        comments: [commentSchema]
    });

    const Post = mongoose.model('Post', postSchema);

    async function createPost(title, description) {
        
        // Add a new Post
        const newPost = new Post({
            title: title,
            description: description,
            username: "",
            comments: []
        });

        // Save the new post to the database
        try {
            let savedPost = await newPost.save();
            console.log("The posts are now saved", savedPost);
            return savedPost;
        } catch(error) {
            console.error("savedPosts:", error.message);
        }       
    }

    // Searching for documents
    async function getPosts() {
        try {
            return await Post.find();
        } catch (error) {
            console.error("getPost:", error.message);
            return {};
        }
    }

    async function getPost(id) {
        try {
            return await Post.findById(id);
        } catch (error) {
            console.error("getPost:", error.message);
            return {};
        }
    }

    async function bootstrap(count = 10) {
        let l = (await getPosts()).length;
        console.log("Post collection size:", l);
        
        if (l === 0) {
            let promises = [];
            for (let i = 0; i < count; i++) {
                let newPost = new Post({
                    title: `Post number ${i}`, 
                    escription: `desc test`, 
                    Comments: [{
                        comment: `This is a Comment`,
                        username: `Username`,
                        upvotes: 0
                    }] 
                });
                promises.push(newPost.save());
            }
            return Promise.all(promises);
        }
    }

    async function createComment(id, comment) {

        const newComment = {
            upvotes: 0,
            comment: comment
        };

        // Update Comment from id
        await Post.findByIdAndUpdate(
            { _id: id },
            { $push: { comments: newComment} }
        );
        return newComment;
    }

    async function vote(commentId, vote) {
        let votes = -1;
        if(vote == "up") {
            votes = 1;
        };

        await Post.updateOne(
            {'comments._id': commentId},
            {'$inc': { 'comments.$.upvotes' : votes}}
        );
    }

    

    return {
        createPost,
        getPosts,
        getPost,
        bootstrap,
        createComment,
        vote
    }

}