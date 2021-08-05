const mongoose = require('mongoose')
const playSchema = new mongoose.Schema({ id: mongoose.ObjectId });
const UserSchema = new mongoose.Schema({
    user: String,
    permissions: { type: Number, default: 0 },
    favPlays: [playSchema], 
    passwordHash: String,
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)