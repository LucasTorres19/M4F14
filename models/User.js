const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    user: String,
    permissions: { type: Number, default: 0 },
    passwordHash: String,
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)