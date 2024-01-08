import { CopyExampleController } from "@/features/example/endpoints/copy/copy.controller";
import { DeleteExampleController } from "@/features/example/endpoints/delete/delete.controller";
import { GetAllExamplesController } from "@/features/example/endpoints/getAll/getAll.controller";
import { UpdateManyExamplesController } from "@/features/example/endpoints/updateMany/updateMany.controller";
import { UpdateOneExampleController } from "@/features/example/endpoints/updateOne/updateOne.controller";
import { ExampleService } from "@/features/example/example.service";
import { ExampleSchema, ExampleModel } from "@/schemas/example.schema";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExampleSchema.name, schema: ExampleModel }
    ])
  ],
  controllers: [
    GetAllExamplesController,
    CopyExampleController,
    UpdateOneExampleController,
    UpdateManyExamplesController,
    DeleteExampleController
  ],
  providers: [ExampleService]
})
export class ExampleModule {}
