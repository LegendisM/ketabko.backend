import path from "path";
import helmet from "helmet";
import compression from "compression";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // * config
  const configService = app.get(ConfigService);

  // * settings
  app.enableCors();
  app.setGlobalPrefix('/api');
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // * middlewares
  app.use(compression());
  app.use(helmet({ crossOriginResourcePolicy: false }));

  // * static assets
  app.useStaticAssets(path.join(__dirname, '..', 'public'), { index: false, prefix: '/public' });

  // * swagger
  const documentConfig = new DocumentBuilder()
    .setTitle('Ketabko API')
    .setDescription('Swagger API Documention')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('/document', app, document, { jsonDocumentUrl: '/document.json' });

  await app.listen(configService.get<number>('MAIN_PORT'));
}
bootstrap();
