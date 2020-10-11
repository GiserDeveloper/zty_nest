import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsNumber } from 'class-validator';

export class WeiXinArticleDto{

    @IsString()
    @ApiProperty({
        description: '文章标题'
    })
    title: string;

    @IsString()
    @ApiProperty({
        description: '文章简介'
    })
    digest: string;

    @IsString()
    @ApiProperty({
        description: '文章链接'
    })
    link: string;

    @IsString()
    @ApiProperty({
        description: '文章来源'
    })
    type: string;

    @IsNumber()
    @ApiProperty({
        description: '发布时间'
    })
    time: number;
}

export class OfficialAccountsDto{
    @IsString()
    @ApiProperty({
        description: '公众号名称'
    })
    name: string;
}