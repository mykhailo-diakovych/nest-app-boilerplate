import { User } from "@/decorators/params/user.decorator";
import { CopyDto } from "@/features/example/dto/Copy.dto";
import { ExampleService } from "@/features/example/example.service";
import { SWAGGER_COPY_SCHEMA_EXAMPLE } from "@/swagger/examples/copy";
import { Body, Controller, Post, Req } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Request } from "express";

@Controller("example/copy")
export class CopyExampleController {
  constructor(private exampleService: ExampleService) {}

  @Post("")
  @ApiTags("example")
  @ApiBody(SWAGGER_COPY_SCHEMA_EXAMPLE)
  async copy(
    @Body() reqBody: CopyDto,
    @Req() req: Request,
    @User() user: any // custom validation dto for user properties can be used here
  ) {
    // implementation
    const payload = {
      any: true
    };

    // using service to get data from db
    const newCharges = await this.exampleService.createCharges(payload);

    return { msg: "Items have been copied successfully!" };
  }
}
