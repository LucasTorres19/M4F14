import switchQuery from '../../utils/userQuery'
import User from '../../models/User'
const switchMethod={
    async POST(req, res){
        try{
            const {query} = req.body
            if (query) await switchQuery[query](req, res)
        }catch(e){
            res.json({error: true})
        }
    },
    async GET(req, res){
        const data = await User.deleteMany({})
        res.json({data: data})
    }
}


export default async function handler(req, res){
    const { method } = req
    await switchMethod[method](req, res)
    
}