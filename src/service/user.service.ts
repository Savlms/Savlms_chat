import IUser from "../interface/user.interface";
import userModel from "../model/user.model";

export default class UserService {

    //create a user
    async create (data: IUser) {
        return await userModel.create(data)
    }
    // update a user 
    async update (id: string, update: Partial<IUser>) {
        return await userModel.findByIdAndUpdate(id, update, {new: true})
    }

    //find a single user by Id
    async findById (id: string) {
        return await userModel.findById(id)
    }

    
    //find a single user by Username
    async findByUsername (username: string) {
        return await userModel.findOne({username: username})
    }

    //find all users
    async findAll () {
        return await userModel.find()
    }

    //delete a user
    async erase (id: string) {
        return await userModel.findByIdAndDelete(id)
    }
}