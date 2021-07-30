const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    user: String,
    passwordHash: String,
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)