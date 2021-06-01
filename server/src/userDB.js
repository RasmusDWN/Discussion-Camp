module.exports = (mongoose) => {
    const userSchema = new mongoose.Schema({
        username: String,
        password: String
    });

    const User = mongoose.model('User', userSchema);

    async function createUser(username, password) {

        // New user
        const newUser = new User({
            username: username,
            password: password
        });

        try {
            let savedUser = await newUser.save();
            console.log("New user has been created.", savedUser);
            return savedUser;
        } catch(error) {
            console.error("savedUser:", error.message);
        }
    }

    async function getUsers() {
        try{
            return await User.find();
        } catch(error) {
            console.error("getUsers:", error.message);
            return {};
        }
    }

    async function getUser(id) {
        try {
            return await User.findById(id);
        } catch(error) {
            console.error("getUser:", error.message);
            return {};
        }
    }

    return {
        createUser,
        getUsers,
        getUser
    }

}