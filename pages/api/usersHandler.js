import switchQuery from '../../utils/userQuery'


export default async function usersHandler(req, res){
    const { method } = req
    switch(method){
        case 'POST':        
         try{
            const {query} = req.body
            if (query) await switchQuery[query](req, res)
        }catch(e){
            res.json({error: true})
        }
        break;
        default:
            res.status(405).json({error: "We only support POST"})
    }
}