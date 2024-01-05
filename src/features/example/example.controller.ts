import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Patch,
  Post,
  Query,
  Req
} from "@nestjs/common";
import { ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { ExampleService } from "@/features/example/example.service";
import { CopyDto } from "@/features/example/dto/Copy.dto";
import { Request } from "express";
import { SWAGGER_COPY_SCHEMA_EXAMPLE } from "@/swagger/examples/copy";
import { DeleteDto } from "@/features/example/dto/Delete.dto";
import { SWAGGER_DELETE_SCHEMA_EXAMPLE } from "@/swagger/examples/delete";
import { SWAGGER_UPDATE_ONE_SCHEMA_EXAMPLE } from "@/swagger/examples/updateOne";
import { SWAGGER_UPDATE_MANY_SCHEMA_EXAMPLE } from "@/swagger/examples/updateMany";
import { User } from "@/decorators/params/user.decorator";
import { UpdateOneDto } from "@/features/example/dto/UpdateOne.dto";
import { UpdateManyDto } from "@/features/example/dto/UpdateMany.dto";

@Controller("example")
export class ExampleController {
  constructor(private exampleService: ExampleService) {}

  @Get("getAll")
  @ApiTags("example")
  getAll() {
    // implementation

    return { msg: "All data", data: [] };
  }

  @Post("copy")
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
    }

    // using service to get data from db
    const newCharges = await this.exampleService.createCharges(payload);

    return { msg: "Items have been copied successfully!" };
  }

  @Delete("delete")
  @ApiTags("example")
  @ApiQuery(SWAGGER_DELETE_SCHEMA_EXAMPLE)
  async delete(
    @Query() queryParams: DeleteDto,
    @Req() req: Request,
    @User() user: any
  ) {
    const query = {
      any: true,
    }

    const someItem = await this.exampleService.findCharges(query);

    // custom error throwing for 404
    if (!someItem?.length) {
      throw new NotFoundException("No item found!");
    }

    return { msg: "Items have been deleted successfully!" };
  }

  @Patch("updateOne")
  @ApiTags("example")
  @ApiBody(SWAGGER_UPDATE_ONE_SCHEMA_EXAMPLE)
  async updateOne(
    @Body() body: UpdateOneDto,
    @Req() req: Request,
    @User() user: any
  ) {
    // implementation
    const query = {}, payload = {};


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

  @Patch("updateMany")
  @ApiTags("example")
  @ApiBody(SWAGGER_UPDATE_MANY_SCHEMA_EXAMPLE)
  async updateMany(@Body() body: UpdateManyDto, @Req() req: Request) {
    // implementation
    
    return { msg: "Items have been updated successfully!" };
  }
}
