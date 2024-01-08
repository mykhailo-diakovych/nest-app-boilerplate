import {
  ArrayNotEmpty,
  IsDefined,
  IsNotEmpty,
  IsString
} from "class-validator";

export class CopyDto {
  @IsNotEmpty()
  clientId: string;

  @IsNotEmpty()
  cfsId: string;

  // validation for itemIds if not present and is not empty array
  @IsDefined()
  @ArrayNotEmpty()
  itemIds: string[];

  @IsNotEmpty({ message: "Customer is required" })
  @IsString()
  customer: string;
}
