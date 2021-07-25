const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
    title: String,
    publishedAt: Date,
    videoId: String,
    width: Number,
    height: Number,
    url: String,
    like: Number,
    dislike: Number,
    views: Number,
})

module.exports = mongoose.models.Video || mongoose.model('Video', VideoSchema)