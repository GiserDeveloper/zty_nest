import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { AccessGuard } from '../common/guards/roles.guard';

@Controller('user')
@UseGuards(AccessGuard)
@ApiBearerAuth()
@ApiTags('用户模块')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Post()
    @UsePipes(new ValidationPipe({transform: true}))
    @ApiOperation({summary: '创建新用户'})
    createUser(@Body() userDto: UserDto){
        return this.userService.create(userDto);
    }

    @Get()
    @ApiOperation({summary: '显示所有用户'})
    getUser(){
        //return this.userService.findAll();
        return this.userService.findAllUserRole();
    }

    @Get(':userId')
    @ApiParam({
        name: 'userId',
        description: '请传入用户Id'
    })
    @ApiOperation({summary: '根据用户ID查找用户'})
    getUserById(@Param('userId') id){
        return this.userService.getUserById(id);
    }

    @Put(':userId')
    @ApiParam({
        name: 'userId',
        description: '请传入用户Id' 
    })
    @ApiOperation({summary: '传入用户ID修改用户'})
    updateUserById(@Param('userId') id, @Body() userDto: UserDto){
        return this.userService.updateUserById(id, userDto)
    }

    @Delete(':userId')
    @ApiParam({
        name: 'userId',
        description: '请传入用户Id' 
    })
    @ApiOperation({summary: '传入用户ID删除用户'})
    deleteUserById(@Param('userId') id){
        return this.userService.deleteUserById(id)
    }
}
