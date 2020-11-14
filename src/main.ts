import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { logger } from './common/middleware/logger.middleware';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import * as serveStatic from 'serve-static';
import { join } from 'path';
const path = require("path");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //设置全局前缀
  app.setGlobalPrefix('api/private/v1')

  //全局使用中间件
  app.use(logger)

  //全局使用异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter())

  app.enableCors()

  // 静态资源配置
  app.use('/public',serveStatic(path.join(__dirname,'../public'),{
    extensions: ['jpg', 'jpeg', 'png', 'gif', 'xlxs', 'xls']
  }))

  //全局使用拦截器
  app.useGlobalInterceptors(new TransformInterceptor())

  const options = new DocumentBuilder()
  .setTitle('NestJS-麻雀接口')
  .setDescription('使用NestJS构建的服务端API')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);

  console.log('http://localhost:3000/api-docs')
}
bootstrap();
