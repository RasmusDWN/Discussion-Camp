// const bcrypt = require('bcrypt');

module.exports = (mongoose) => {
    const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            min: 6,
            max: 16
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['user', 'admin1'],
            required: true
        }
    });

    const User = mongoose.model('User', userSchema);

    // userSchema.pre('save', function(next) {
    //     if(!this.isModified('password')) {
    //         return next();
    //     }
    //     bcrypt.hash(this.password, 10, (err,passwordHash) => {
    //         if(err) {
    //             return next(err);
    //         }
    //         this.password = passwordHash;
    //         next();
    //     });
    // });

    // userSchema.methods.comparePassword = function(password, cb) {
    //     bcrypt.compare(password, this.password, (err, isMatch) => {
    //         if(err) {
    //             return cb(err);
    //         } else {
    //             if(!isMatch) {
    //                 return cb(null, isMatch);
    //             }
    //             return cb(null, this);
    //         }

    //     });
    // }

    // return {
    //     createUser,
    //     getUsers,
    //     getUser
    // }

}