import { Request } from 'express'
import IUser from './user.interface'

export default interface Auth extends Request {
    user: IUser;
}