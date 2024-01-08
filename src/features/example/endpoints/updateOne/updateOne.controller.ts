import { User } from "@/decorators/params/user.decorator";
import { UpdateOneDto } from "@/features/example/endpoints/updateOne/updateOne.dto";
import { ExampleService } from "@/features/example/example.service";
import { SWAGGER_UPDATE_ONE_SCHEMA_EXAMPLE } from "@/swagger/examples/updateOne";
import {
  Body,
  Controller,
  Logger,
  NotFoundException,
  Patch,
  Req
} from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Request } from "express";

@Controller("example/updateOne")
export class UpdateOneExampleController {
  constructor(private exampleService: ExampleService) {}

  @Patch("")
  @ApiTags("example")
  @ApiBody(SWAGGER_UPDATE_ONE_SCHEMA_EXAMPLE)
  async updateOne(
    @Body() _body: UpdateOneDto,
    @Req() _req: Request,
    @User() _user: any
  ) {
    // implementation
    const query = {},
      payload = {};

    // we can use debug logger
    Logger.debug(
      `Query -> ${JSON.stringify(query)} and payload -> ${JSON.stringify(
        payload
      )}`,
      "ITEMS UPDATE"
    );
    const existCharge = await this.exampleService.findOne(query);

    if (!existCharge) {
      throw new NotFoundException("Item not found!");
    }

    const updatedItem = await this.exampleService.findOneAndUpdate(
      query,
      payload
    );

    return {
      msg: "Item has been updated successfully!",
      data: updatedItem
    };
  }
}
