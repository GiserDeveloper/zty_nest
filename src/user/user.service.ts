import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Role } from '../role/schema/role.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        @InjectModel('Role') private roleModel: Model<Role>
    ) {}

    async create(userDto: UserDto): Promise<User> {
        const createdUser = new this.userModel(userDto);
        return await createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async getUserById(id): Promise<User> {
        return await this.userModel.findById({_id:id})
    }

    async updateUserById(id, userDto: UserDto): Promise<User> {
        return await this.userModel.findByIdAndUpdate({_id: id}, userDto, {new: true});
    }

    async deleteUserById(id) {
        return await this.userModel.deleteOne({_id: id});
    }

    async findUserByUsername(username): Promise<User>{
        return await this.userModel.findOne({username: username})
    }

    async findAllUserRole() {
        return this.userModel.aggregate([
            {
                $lookup: {
                    from: "roles",
                    localField: "roleId",
                    foreignField: "roleId",
                    as: "roleInfo"
                }
            }
        ],function(err, docs){
            if(err){
                console.log(err);
                return;
            }
        })
    }
}
