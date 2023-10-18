const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    displayName: String,     // Display Name
    nickname: String,        // Nickname
    email: String,           // Email
    title: String,           // Title
    userGroup: String,       // User Group
    avatar: String,          // Avatar URL
    website: String,         // Website URL
    socialNetworks: {
        facebook: String,    
        twitter: String,     
        linkedin: String,
        instagram: String,
    },
    location: String,        // Location
    timezone: String,        // Timezone
    occupation: String,      // Occupation
    signature: String,       // Signature
    aboutMe: String,         // About Me
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (error) {
            return next(error);
        }
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
