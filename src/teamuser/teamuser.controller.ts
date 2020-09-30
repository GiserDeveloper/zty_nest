import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { TeamuserService } from './teamuser.service';
import { TeamuserDto } from './dto/teamuser.dto';
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
        name: 'userId',
    })
    @ApiQuery({
        name: 'teamId',
    })
    @ApiOperation({summary: '用户加入团队'})
    joinTeam(@Query('userId') userId,@Query('teamId')  teamId){
        return this.teamuserService.joinTeam(userId,teamId)
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

}
