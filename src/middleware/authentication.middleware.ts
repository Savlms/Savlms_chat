import jwt from 'jsonwebtoken'
import UserService from '../service/user.service'
const {
    findById
} = new UserService()
import { Request, Response, NextFunction } from 'express'
import Auth from '../interface/auth.interface'

async function authenticate (req: Request, res: Response, next: NextFunction) {
    const SECRET = process.env.SECRET
    const token = await req.cookies.token
    if (!token) {
        return res.status(401).send({
            message: 'Token not provided',
            success: false
        })
    }

    const decodedToken = jwt.verify(token, SECRET!)
    const id = (decodedToken as any)._id
    const user = await findById(id)
    if (!user) 
        {
            return res.status(401).send({
                message: 'User does not exist',
                success: false
            })
        }

        (req as Auth).user = user
        next()
}

export default authenticate
