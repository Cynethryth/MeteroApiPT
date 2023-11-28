import jwt from 'jwt-simple'
const isAuth = (req,res,next)=>{
    if (!req.headers.authorization){
        return res.status(403).send({message:"No estas autenticado"})
    }
    const token = req.headers.authorization
    const payload = jwt.decode(token, "PalabraSecreta")
    next()
}

export default isAuth