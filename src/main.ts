import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  //app.setGlobalPrefix('v1')
  app.enableCors({
    origin: ['florian.fr', 'nidhal.fr'],
  });
  //app.useGlobalInterceptors(new DurationInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Books API')
    .setDescription('A training API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
