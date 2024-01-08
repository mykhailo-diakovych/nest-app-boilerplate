import { ExampleService } from "@/features/example/example.service";
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("example/getAll")
export class GetAllExamplesController {
  constructor(private exampleService: ExampleService) {}

  @Get("")
  @ApiTags("example")
  getAll() {
    // implementation

    return { msg: "All data", data: [] };
  }
}
