import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { TeamuserService } from './teamuser.service';
import { TeamuserDto, TeamPowerDto, IDListDto } from './dto/teamuser.dto';
import { get } from 'http';

@Controller('teamuser')
@ApiTags('钉图用户模块')
export class TeamuserController {
    constructor(
        private readonly teamuserService: TeamuserService
    ){}

    @Post()
    @ApiOperation({summary: '创建新用户'})
    createTeamUser(@Body() teamuserDto: TeamuserDto){
        return this.teamuserService.create(teamuserDto)
    }

    @Post('joinTeam')
    @ApiQuery({
        name: 'userName',
    })
    @ApiQuery({
        name: 'teamId',
    })
    @ApiOperation({summary: '用户加入团队'})
    joinTeam(@Query('userName') userName,@Query('teamId')  teamId){
        return this.teamuserService.joinTeam(userName,teamId)
    }

    @Post('manageTeam')
    @ApiQuery({
        name: 'userName',
    })
    @ApiQuery({
        name: 'teamId',
    })
    @ApiOperation({summary: '用户加入管理团队'})
    manageTeam(@Query('userName') userName,@Query('teamId')  teamId){
        return this.teamuserService.manageTeam(userName,teamId)
    }

    @Post('createTeam')
    @ApiQuery({
        name: 'userId',
    })
    @ApiQuery({
        name: 'teamName',
    })
    @ApiOperation({summary: '创建新团队'})
    createTeam(@Query('userId') userId, @Query('teamName') teamName){
        return this.teamuserService.createTeam(userId,teamName)
    }

    @Get('getJoinTeamList/:userId')
    @ApiParam({
        name: 'userId',
        description: '请传入用户Id'
    })
    @ApiOperation({summary: '获取用户加入的团队'})
    getJoinTeamList(@Param('userId') userId){
        console.log(userId)
        return this.teamuserService.getJoinTeamList(userId)
    }

    @Get('getManageTeamList/:userId')
    @ApiParam({
        name: 'userId',
        description: '请传入用户Id'
    })
    @ApiOperation({summary: '获取用户管理的团队'})
    getManageTeamList(@Param('userId') userId){
        return this.teamuserService.getManageTeamList(userId)
    }

    @Get('getJoinTeamMapList/:userId')
    @ApiParam({
        name: 'userId',
        description: '请传入用户Id'
    })
    @ApiOperation({summary: '获取用户加入的团队以及地图列表'})
    getJoinTeamMapList(@Param('userId') userId){
        console.log(userId)
        return this.teamuserService.getJoinTeamList(userId)
    }

    @Get('getManageTeamMapList/:userId')
    @ApiParam({
        name: 'userId',
        description: '请传入用户Id'
    })
    @ApiOperation({summary: '获取用户管理的团队以及地图列表'})
    getManageTeamMapList(@Param('userId') userId){
        return this.teamuserService.getManageTeamMapList(userId)
    }

    @Get('getJoinTeamUsersList/:teamId')
    @ApiParam({
        name: 'teamId',
        description: '请传入teamId'
    })
    @ApiOperation({summary: '获取加入团队的用户列表'})
    getJoinTeamUsersList(@Param('teamId') teamId){
        return this.teamuserService.getJoinTeamUsersList(teamId)
    }

    @Get('getManageTeamUsersList/:teamId')
    @ApiParam({
        name: 'teamId',
        description: '请传入teamId'
    })
    @ApiOperation({summary: '获取管理团队的用户列表'})
    getManageTeamUsersList(@Param('teamId') teamId){
        return this.teamuserService.getManageTeamUsersList(teamId)
    }

    @Put('updateUsersTeamPower/:userId')
    @ApiParam({
        name: 'userId',
        description: '请传入userId'
    })
    @ApiOperation({summary: '修改用户对团队的操作权限'})
    updateUsersTeamPower(@Param('userId') userId, @Body() updateContent:TeamPowerDto){
        return this.teamuserService.updateUsersTeamPower(userId,updateContent.teamId,updateContent.power)
    }

    @Put('updateDefaultTeam')
    @ApiQuery({
        name: 'userId',
    })
    @ApiQuery({
        name: 'teamId',
    })
    @ApiOperation({summary: '修改用户默认团队ID'})
    updateDefaultTeam(@Query('userId') userId, @Query('teamId') teamId){
        return this.teamuserService.updateDefaultTeam(userId,teamId)
    }

    @Put('updateTeamDefaultMap')
    @ApiOperation({summary: '修改用户团队的默认地图ID'})
    updateTeamDefaultMap(@Body() IDList: IDListDto){
        return this.teamuserService.updateTeamDefaultMap(IDList.userId,IDList.teamId,IDList.mapId)
    }

    @Delete('removeUserFromTeam')
    @ApiQuery({
        name: 'userId',
    })
    @ApiQuery({
        name: 'teamId',
    })
    @ApiOperation({summary: '把用户移除出团队'})
    removeUserFromTeam(@Query('userId') userId, @Query('teamId') teamId){
        return this.teamuserService.removeUserFromTeam(userId,teamId)
    }

    @Delete('removeUserFromManageTeam')
    @ApiQuery({
        name: 'userId',
    })
    @ApiQuery({
        name: 'teamId',
    })
    @ApiOperation({summary: '把用户移除出团队管理员列表'})
    removeUserFromManageTeam(@Query('userId') userId, @Query('teamId') teamId){
        return this.teamuserService.removeUserFromManageTeam(userId,teamId)
    }

    // 根据用户Id返回用户信息
    @Get('getUserInfoById/:userId')
    @ApiParam({
        name: 'userId'
    })
    @ApiOperation({summary: '根据用户ID返回用户信息'})
    getUserInfoById(@Param('userId') userId){
        return this.teamuserService.getUserInfoById(userId)
    }

}
