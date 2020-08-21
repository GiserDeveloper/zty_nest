import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsNumber } from 'class-validator';

export class NoticeZhaoBiaoDto{

    @IsString()
    @ApiProperty()
    公告标题: string;

    @IsString()
    @ApiProperty()
    发布时间: string;

    @IsString()
    @ApiProperty()
    公告链接: string;

    @IsString()
    @ApiProperty()
    招标人: string;

    @IsString()
    @ApiProperty()
    项目概况: string;

    @IsString()
    @ApiProperty()
    项目详细地址: string;

    @IsString()
    @ApiProperty()
    标书下发时间: string;

    @IsString()
    @ApiProperty()
    开标时间: string;

    @IsString()
    @ApiProperty()
    省份: string;

    @IsString()
    @ApiProperty()
    类型: string;
}

export class NoticeBianGengDto{
    @IsString()
    @ApiProperty()
    公告标题: string;

    @IsString()
    @ApiProperty()
    发布时间: string;

    @IsString()
    @ApiProperty()
    公告链接: string;

    @IsString()
    @ApiProperty()
    省份: string;

    @IsString()
    @ApiProperty()
    类型: string;
}

export class NoticeHouXuanDto{
    @IsString()
    @ApiProperty()
    公告标题: string;

    @IsString()
    @ApiProperty()
    发布时间: string;

    @IsString()
    @ApiProperty()
    公告链接: string;
    
    @IsString()
    @ApiProperty()
    招标人: string;

    @IsString()
    @ApiProperty()
    开标时间: string;

    @IsString()
    @ApiProperty()
    工程名称: string;

    @IsString()
    @ApiProperty()
    工程地址: string;

    @IsString()
    @ApiProperty()
    候选人1: string;

    @IsString()
    @ApiProperty()
    候选人2: string;

    @IsString()
    @ApiProperty()
    候选人3: string;

    @IsString()
    @ApiProperty()
    省份: string;

    @IsString()
    @ApiProperty()
    类型: string;
}

export class NoticeJieGuoDto{
    @IsString()
    @ApiProperty()
    公告标题: string;

    @IsString()
    @ApiProperty()
    发布时间: string;

    @IsString()
    @ApiProperty()
    公告链接: string;
    
    @IsString()
    @ApiProperty()
    招标人: string;

    @IsString()
    @ApiProperty()
    工程名称: string;

    @IsString()
    @ApiProperty()
    工程地址: string;

    @IsString()
    @ApiProperty()
    开标时间: string;

    @IsString()
    @ApiProperty()
    中标单位: string;

    @IsString()
    @ApiProperty()
    省份: string;

    @IsString()
    @ApiProperty()
    类型: string;
}

export class NoticeQueryDto{
    @IsString()
    @ApiProperty({
        required: false
    })
    proviceName: string;

    @IsString()
    @ApiProperty({
        required: false
    })
    typeName: string;
}

export class NoticeDto{
    @IsString()
    @ApiProperty()
    公告标题: string;

    @IsString()
    @ApiProperty()
    发布时间: string;

    @IsString()
    @ApiProperty()
    公告链接: string;

    @IsString()
    @ApiProperty()
    招标人: string;

    @IsString()
    @ApiProperty()
    项目概况: string;

    @IsString()
    @ApiProperty()
    项目详细地址: string;

    @IsString()
    @ApiProperty()
    标书下发时间: string;

    @IsString()
    @ApiProperty()
    开标时间: string;

    @IsString()
    @ApiProperty()
    省份: string;

    @IsString()
    @ApiProperty()
    类型: string;

    @IsString()
    @ApiProperty()
    工程名称: string;

    @IsString()
    @ApiProperty()
    工程地址: string;

    @IsString()
    @ApiProperty()
    候选人1: string;

    @IsString()
    @ApiProperty()
    候选人2: string;

    @IsString()
    @ApiProperty()
    候选人3: string;

    @IsString()
    @ApiProperty()
    中标单位: string;

}