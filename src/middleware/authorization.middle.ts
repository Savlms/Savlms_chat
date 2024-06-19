import { Request, Response, NextFunction }  from 'express'
import IAuth from '../interface/auth.interface'
import Auth from '../interface/auth.interface'


async function isAdmin (req: Request, res: Response, next: NextFunction) {
    const user = (req as Auth).user
    if (user.role === 'admin') {
        next()
    } else {
        return res.status(404).send({
            message: 'Restricted to Admins Only',
            success: false
        })
    }
}

export default isAdmin