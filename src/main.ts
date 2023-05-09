import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformResponseInterceptor } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //INTERCEPTORS
  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(new TransformResponseInterceptor<unknown>(reflector))

  await app.listen(3000);
}
bootstrap();

//TODO configrar barrelsby
