import {
  IsString,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsDateString
} from "class-validator";

export class UpdateOneDto {
  @IsString()
  clientId: string;

  @IsString()
  cfsId: string;

  @IsString()
  _id: string;

  @IsString()
  @IsOptional()
  paymentLookup: string;

  @IsString()
  @IsOptional()
  chargeCategory: string;

  @IsString()
  @IsOptional()
  service: string;

  @IsString()
  @IsOptional()
  customer: string;

  @IsString()
  @IsOptional()
  windowNumber: string;

  @IsString()
  @IsOptional()
  vendorNumber: string;

  @IsString()
  @IsOptional()
  origin: string;

  @IsString()
  @IsOptional()
  destination: string;

  @IsString()
  @IsOptional()
  pol: string;

  @IsString()
  @IsOptional()
  applyTo: string;

  @IsString()
  @IsOptional()
  chargeCode: string;

  @IsString()
  @IsOptional()
  chargeDescription: string;

  @IsString()
  @IsOptional()
  ruleType: string;

  @IsString()
  @IsOptional()
  billingType: string;

  @IsString()
  @IsOptional()
  containerType: string;

  @IsString()
  @IsOptional()
  terminal: string;

  @IsString()
  @IsOptional()
  warehouse: string;

  @IsNumber()
  @IsOptional()
  item: number;

  @IsNumber()
  @IsOptional()
  secondaryItem: number;

  @IsNumber()
  @IsOptional()
  minimum: number;

  @IsNumber()
  @IsOptional()
  maximum: number;

  @IsNumber()
  @IsOptional()
  weightMinimum: number;

  @IsNumber()
  @IsOptional()
  weightMaximum: number;

  @IsString()
  @IsOptional()
  packageIn: string;

  @IsString()
  @IsOptional()
  packageOut: string;

  @IsNumber()
  @IsOptional()
  pcsMinimum: number;

  @IsNumber()
  @IsOptional()
  pcsMaximum: number;

  @IsNumber()
  @IsOptional()
  dayMinimum: number;

  @IsNumber()
  @IsOptional()
  dayMaximum: number;

  @IsNumber()
  @IsOptional()
  palletMinimum: number;

  @IsNumber()
  @IsOptional()
  palletMaximum: number;

  @IsBoolean()
  @IsOptional()
  baseChargeFlag: boolean;

  @IsBoolean()
  @IsOptional()
  ipiFlag: boolean;

  @IsBoolean()
  @IsOptional()
  headload: boolean;

  @IsBoolean()
  @IsOptional()
  hazmat: boolean;

  @IsString()
  @IsOptional()
  packageType: string;

  @IsString()
  @IsOptional()
  billingRule: string;

  @IsDateString()
  @IsOptional()
  effectiveDate: string;

  @IsDateString()
  @IsOptional()
  expiryDate: string;
}
