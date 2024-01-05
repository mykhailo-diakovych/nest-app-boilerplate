import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { ExampleModule } from "./features/example/example.module";
import { databaseProvider } from "@/providers/database.provider";
import { ValidateRequestMiddleware } from "@/middlewares/validateRequest.middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.development"],
      isGlobal: true
    }),
    MongooseModule.forRootAsync(databaseProvider), // define database connection provider
    ExampleModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateRequestMiddleware).forRoutes("example");
  }
}
