import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';
import { UpdateRoleDto } from './dto/updateRole.dto';
import { AccessGuard } from '../common/guards/roles.guard';

@Controller('role')
@UseGuards(AccessGuard)
@ApiBearerAuth()
@ApiTags('用户角色模块')
export class RoleController {
    constructor(
        private readonly roleService: RoleService
    ){}

    @Post()
    @UsePipes(new ValidationPipe({transform: true}))
    @ApiOperation({summary: '创建新用户角色'})
    createRole(@Body() roleDto: RoleDto){
        return this.roleService.create(roleDto);
    }

    @Get()
    @ApiOperation({summary: '显示所有用户角色'})
    getRole(){
        return this.roleService.findAll();
    }

    @Get(':roleId')
    @ApiParam({
        name: 'roleId',
        description: '请传入用户角色Id'
    })
    @ApiOperation({summary: '根据用户角色ID查找用户角色'})
    getRoleById(@Param('roleId') id){
        return this.roleService.getRoleById(id);
    }

    @Put(':roleId')
    @ApiParam({
        name: 'roleId',
        description: '请传入用户角色Id' 
    })
    @ApiOperation({summary: '传入用户角色ID修改用户角色'})
    updateRoleById(@Param('roleId') id: number, @Body() updateRoleDto: UpdateRoleDto){
        return this.roleService.updateRoleById(id, updateRoleDto)
    }

    @Delete(':roleId')
    @ApiParam({
        name: 'roleId',
        description: '请传入用户角色Id' 
    })
    @ApiOperation({summary: '传入用户角色ID删除用户角色'})
    deleteRoleById(@Param('roleId') id){
        return this.roleService.deleteRoleById(id)
    }
}
