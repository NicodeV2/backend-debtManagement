import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Debt Management API')
    .setDescription(
      'API for managing debts and payment reminders. This API allows users to create, read, update, and delete debts, as well as set reminders for payments. Authentication is handled using JWT tokens to ensure secure access.',
    )
    .setVersion('1.0')
    .addTag('debt')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
