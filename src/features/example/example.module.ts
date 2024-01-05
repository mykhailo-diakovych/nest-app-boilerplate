import { ExampleController } from "@/features/example/example.controller";
import { ExampleService } from "@/features/example/example.service";
import { ExampleSchema, ExampleModel } from "@/schemas/example.schema";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ExampleSchema.name, schema: ExampleModel }])
  ],
  controllers: [ExampleController],
  providers: [ExampleService]
})
export class ExampleModule {}
