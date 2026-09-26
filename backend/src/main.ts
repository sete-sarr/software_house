import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  // Behind a reverse proxy (Render, Nginx…), trust N hops so req.ip is the real client IP
  // and rate limiting is applied per visitor instead of per proxy.
  const trustProxyHops = configService.get<number>('trustProxy') ?? 0;
  if (trustProxyHops > 0) {
    app.set('trust proxy', trustProxyHops);
  }

  app.use(helmet());
  app.enableCors({
    origin: configService.get<string[]>('cors.origins'),
    credentials: true,
  });

  app.setGlobalPrefix(configService.get<string>('apiPrefix') ?? 'api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  if (configService.get<string>('nodeEnv') !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('API — Agence Technologique')
      .setDescription("Documentation de l'API")
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document);
  }

  const port = configService.get<number>('port') ?? 3001;
  await app.listen(port);
}
bootstrap();
