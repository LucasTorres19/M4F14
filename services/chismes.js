import dbConnect from '../utils/mongodb'
import Chisme from '../models/Chisme'
dbConnect()
const chismesService = {
    async getAll(query){
        if(!query) return await Chisme.find({})
        return await chisme.find(query)
    },
    async getOne(query){
        if(!query) return await Chisme.findOne({})
        return await chisme.findOne(query)
    },
    async removeOne(query){
        if(!query) return {message: "not query rec"}
    }
}