import { UpdateManyDto } from "@/features/example/endpoints/updateMany/updateMany.dto";
import { ExampleService } from "@/features/example/example.service";
import { SWAGGER_UPDATE_MANY_SCHEMA_EXAMPLE } from "@/swagger/examples/updateMany";
import { Body, Controller, Patch, Req } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Request } from "express";

@Controller("example/updateMany")
export class UpdateManyExamplesController {
  constructor(private _exampleService: ExampleService) {}

  @Patch("updateMany")
  @ApiTags("example")
  @ApiBody(SWAGGER_UPDATE_MANY_SCHEMA_EXAMPLE)
  async updateMany(@Body() _body: UpdateManyDto, @Req() _req: Request) {
    // implementation

    return { msg: "Items have been updated successfully!" };
  }
}
