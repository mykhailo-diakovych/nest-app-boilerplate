import { User } from "@/decorators/params/user.decorator";
import { DeleteDto } from "@/features/example/dto/Delete.dto";
import { ExampleService } from "@/features/example/example.service";
import { SWAGGER_DELETE_SCHEMA_EXAMPLE } from "@/swagger/examples/delete";
import {
  Controller,
  Delete,
  NotFoundException,
  Query,
  Req
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { Request } from "express";

@Controller("example/delete")
export class DeleteExampleController {
  constructor(private exampleService: ExampleService) {}

  @Delete("")
  @ApiTags("example")
  @ApiQuery(SWAGGER_DELETE_SCHEMA_EXAMPLE)
  async delete(
    @Query() _queryParams: DeleteDto,
    @Req() _req: Request,
    @User() _user: any
  ) {
    const query = {
      any: true
    };

    const someItem = await this.exampleService.findCharges(query);

    // custom error throwing for 404
    if (!someItem?.length) {
      throw new NotFoundException("No item found!");
    }

    return { msg: "Items have been deleted successfully!" };
  }
}
