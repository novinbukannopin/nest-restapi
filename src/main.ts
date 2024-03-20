import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { LoggerService } from "./logger/logger.service";
import { AllExceptionsFilter } from "./all-exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.enableCors({
    origin: ["http://localhost:3000", "http://localhost:3001"]
  });
  app.setGlobalPrefix("api/v1");
  await app.listen(3000);
}

bootstrap();
