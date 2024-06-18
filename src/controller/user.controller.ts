import { NextFunction, Request, Response } from 'express'
import UserService from '../service/user.service';
import { string } from 'joi';
const {
    create,
    update,
    findAll,
    findById,
    findByUsername,
    delete
} = new UserService();

export default class UserController {
    //create a user
    async createUser (req: Request, res: Response,) {
        try {
            //get user data from req.body
            const data = req.body
            //check to see if name has been used before
            const existingUser = await findByUsername(data.Username)
            console.log(existingUser)

            //if user found, send an error that they exist already 
            if (existingUser) {
                return res.status(409).send({
                    message: 'Name already exists',
                    success: false
                })
            }

            //else go ahead and create user
            const createdUser = await create (data)
            const token = jwt.sign({_id:createdUser._id, username:createdUser.username, role:createdUser.role}, SECRET!, {
                expiresIn: (7 * 24 * 60 * 60)})
                res.cookie("token", token, {httpOnly: true, maxAge: (7 * 24 * 60 * 60 * 1000)})
                return res.header("token", token).status(200).send({
                    message: 'User Created',
                    success: true,
                    data: createdUser
                })
        } catch(err: any) {
            res.status(500).send({
                message: 'Failed to create User',
                success: true,
                error: err.message
            })
        }
    }

    //update a user
    async updateUser (req: Request, res: Response) {
        const data = req.body
        const id = req.params.id

        //check if user exist
        const user = findById(id)
        if (!user) {
            return res.status(404).send({
                message: 'User not found',
                success: false
            })
        }
        const updatedUser = update(id, data)
        return res.status(200).send({
            messgae: 'Update Successful',
            success:  true,
            data: updatedUser
        })
    }
}