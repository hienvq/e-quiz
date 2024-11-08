import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionHandler } from './common/exceptions/custom-exception.handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.useGlobalFilters(new CustomExceptionHandler());
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
