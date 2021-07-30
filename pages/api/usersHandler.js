import switchQuery from '../../utils/userQuery'

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
    }
}


export default async function handler(req, res){
    const { method } = req
    await switchMethod[method](req, res)
    
}