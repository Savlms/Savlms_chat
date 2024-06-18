import { Request, Response } from 'express'
import UserService from '../service/user.service';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const {
    create,
    update,
    findAll,
    findById,
    findByUsername,
    erase
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

    //Login a user
    async login (req: Request, res: Response) {
        const name = req.body.username
        const user = await findByUsername(name)
        if (!user) {
            return res.status(404).send({
                messgae: 'Invalid Details',
                success:  false
                })
        }
        const isValid = await bcrypt.compare(req.body.oassword, user.password)
        if (!isValid) {
            return res.status(404).send({
                message:  'Invalid Details',
                success: false
                })
        } else {
            const token = jwt.sign({_id:user._id, username:user.username, role:user.role}, SECRET!, {
                expiresIn: (7 * 24 * 60 * 60)})
                res.cookie("token", token, {httpOnly: true, maxAge: (7 * 24 * 60 * 60 * 1000)})
                return res.status(200).send({
                    message: 'Login Successfully',
                    success: true,
                    data: user
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

    //find a single user by id
    async findOne(req: Request, res: Response) {
        const id =  req.params.id
        const user = await findById(id)
        if (!user) {
            return res.status(404).send({
                messgae: 'User not found',
                success: false
                })
        }
        return res.status(200).send({
            message: 'user found',
            success:  true,
            data: user
                })
    }
    
    //find all users
    async findAll(req: Request, res: Response) {
        const getAll = await findAll()
            return res.status(200).send({
                messgae: 'Users found Successfully',
                success: true,
                data: getAll
                })
    }

    // delete a user
    async deleteUser(req: Request, res: Response) {
        const id =  req.params.id
        const user1 = await findById(id)
        if (!user1) {
            return res.status(404).send({
                message: 'User not found',
                success: false
                })
        }
        const user = erase(id)
        return res.status(200).send({
            message: 'user deleted successfully',
            success:  true,
            data: user
                })
    }
}