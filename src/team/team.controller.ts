import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth, ApiQuery, ApiBody } from '@nestjs/swagger';
import { TeamService } from './team.service';
import { TeamDto } from './dto/team.dto';

@Controller('team')
@ApiTags('用户团队模块')
export class TeamController {
    constructor(
        private readonly teamService: TeamService
    ){}

    @Post()
    @ApiOperation({summary: '创建新团队'})
    createTeam(@Body() teamDto: TeamDto){
        return this.teamService.create(teamDto)
    }

    @Get(':teamId')
    @ApiParam({
        name: 'teamId',
        description: '请传入用户团队Id'
    })
    @ApiOperation({summary: '根据用户团队ID查找'})
    getRoleById(@Param('teamId') id){
        return this.teamService.getTeamById(id);
    }

    @Put('updateTeamName')
    @ApiQuery({
        name: 'teamId',
        description: '请传入待修改团队id'
    })
    @ApiBody({

    })
    @ApiOperation({summary: '修改团队名称'})
    modifyLayer(@Query('teamId') query, @Body() updateContent: TeamDto){
        return this.teamService.updateTeamName(query, updateContent);
    }
}
