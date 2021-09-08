import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const port = process.env.PORT
  
  const config = new DocumentBuilder()
    .setTitle('Hollander')
    .setDescription('Hollander API description')
    .setVersion('1.0')
    .addTag('hollander')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
