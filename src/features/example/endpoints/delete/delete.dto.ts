import { IsDefined, IsNotEmpty } from "class-validator";

export class DeleteDto {
  @IsNotEmpty()
  clientId: string;

  @IsNotEmpty()
  cfsId: string;

  @IsDefined()
  itemId: string | string[];
}
