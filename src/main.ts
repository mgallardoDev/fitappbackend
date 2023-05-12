import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformResponseInterceptor } from './common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  //INTERCEPTORS
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(
    new TransformResponseInterceptor<unknown>(reflector),
  );

  await app.listen(3000);
}
bootstrap();

//TODO configrar barrelsby
