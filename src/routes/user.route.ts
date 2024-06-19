import express from 'express'
import UserController from '../controller/user.controller'
import {createUserSchema, editUserSchema} from '../schema/user.schema'
import validate from '../middleware/validate.middlware';
const router = express.Router();
const {
    createUser,
    login,
    updateUser,
    findAll,
    findOne,
    deleteUser
} = new UserController();

router.post('/api/1/users', validate(createUserSchema),createUser),
router.post('/api/1/users/login', login),
router.get('/api/1/users', findAll),
router.get('/api/1/users/:id', findOne),
router.patch('/api/1/users/:id', validate(editUserSchema),updateUser),
router.delete('/api/1/users/:id', deleteUser)


export default router