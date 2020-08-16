import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './schema/role.schema';
import { RoleDto } from './dto/role.dto';
import { UpdateRoleDto } from './dto/updateRole.dto';

@Injectable()
export class RoleService {
    constructor(@InjectModel('Role') private roleModel: Model<Role>) {}

    async create(roleDto: RoleDto): Promise<Role> {
        const createdRole = new this.roleModel(roleDto);
        return await createdRole.save();
    }

    async findAll(): Promise<Role[]> {
        return await this.roleModel.find().exec();
    }

    async getRoleById(id): Promise<Role> {
        return await this.roleModel.findOne({roleId:id})
    }

    async updateRoleById(id, updateRoleDto: UpdateRoleDto): Promise<Role> {
        const key = "roleId";
        const value = id;
        Reflect.set(updateRoleDto, key, value);
        return await this.roleModel.findOneAndUpdate({roleId: id}, updateRoleDto, {new: true});
    }

    async deleteRoleById(id) {
        return await this.roleModel.deleteOne({roleId: id});
    }
}
