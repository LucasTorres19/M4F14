import jwt from 'jsonwebtoken'


const authenticated = (func) => async (req, res) =>{
    if (!req.cookies.token) return res.status(401).json({message: 'no estas autenticado gil'})
    jwt.verify(req.cookies.token,process.env.TOKEN_SECRET, async function (err, decode){
        if(!err && decode) return await func(req, res)
        return res.status(401).json({message: 'no estas autenticado gil'})
    })

    
} 
export default authenticated