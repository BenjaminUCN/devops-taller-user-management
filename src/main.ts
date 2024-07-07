import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/exception.filter';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
  console.log('ola planeta')

  await app.listen(configService.getAppPort() || 3001);
}
bootstrap();
