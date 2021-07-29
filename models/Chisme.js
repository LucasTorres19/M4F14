const mongoose = require('mongoose')

const ChismeSchema = new mongoose.Schema({
    title: String,
    votes: Number,
    desc: String,
    publishedAt: Date,
    userId: String,
})

module.exports = mongoose.models.Chisme || mongoose.model('Chisme', VideoSchema)