import User from '../models/User'
import bcrypt from 'bcrypt'
import dbConnect from "../utils/mongodb";
import jwt from "jsonwebtoken"
import cookie from 'cookie'
dbConnect()
const switchQuery = {
    async verifyUser(req, res){
        try{
            const {username} = req.body
            const userFound = await User.findOne({user:username})
            if(userFound) return res.json({issetUser: true})
            res.json({issetUser: false})
        }catch(e){
            res.json({issetUser: false})
        } 
    },
    async register(req, res){
        const {username, password} = req.body
        if(!username || !password) res.json({userCreated: false}) 
        try{
            const userFound = await User.findOne({ user: username})
            if (userFound) res.json({userCreated: false})
            const passwordHash = await bcrypt.hash(password, 10)
            if(passwordHash){
                User.create({
                    "user": username,
                    "passwordHash": passwordHash
                })
                res.json({userCreated: true})
            }

        }catch(e){
            console.error(e)
        }
    },
    async login(req, res){
        const {username, password} = req.body
        if(!username || !password) return res.json({logged: false})

        const userFound = await User.findOne({ user: username})
        
        if(!userFound) return res.json({logged: false})
        const isPassEqual = await bcrypt.compare(password, userFound.passwordHash)
        if(isPassEqual){
            const session = {id: userFound._id, username: userFound.user}
            const token = jwt.sign(session, process.env.TOKEN_SECRET, {expiresIn: '8h'})
            res.setHeader('Set-Cookie', cookie.serialize('token', token,{
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: 60*60*8,
                path: '/'
            }))
            return res.json({logged: true})
        }
        res.json({logged: false})
    }
}
export default switchQuery