import { ArrayNotEmpty, IsDefined } from "class-validator";
import { OmitType } from "@nestjs/mapped-types";
import { UpdateOneDto } from "@/features/example/dto/UpdateOne.dto";

// update many dto contains same fields as update one dto except _id field
export class UpdateManyDto extends OmitType(UpdateOneDto, ["_id"]) {
  // validation for itemIds if not present and is not empy array
  @IsDefined()
  @ArrayNotEmpty()
  itemIds: string[];
}
