import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

const floatSchema = {
  type: Number,
  set: function (v?: string) {
    if (v) {
      return parseFloat(v);
    }
    return v;
  }
};

@Schema()
export class ExampleSchema {
  @Prop()
  clientId: string;

  @Prop()
  cfsId: string;

  @Prop()
  manifestId: string;

  @Prop()
  paymentLookup: string;

  @Prop()
  chargeCategory: string;

  @Prop({ default: "import" })
  service: string;

  @Prop({ default: "manual" })
  chargeType: string;

  @Prop({ default: 1 })
  quantity: number;

  @Prop()
  comments: string;

  @Prop()
  customer: string;

  @Prop()
  pol: string;

  @Prop()
  origin: string;

  @Prop()
  destination: string;

  @Prop()
  applyTo: string;

  @Prop()
  chargeCode: string;

  @Prop()
  chargeDescription: string;

  @Prop()
  ruleType: string;

  @Prop()
  containerType: string;

  @Prop()
  terminal: string;

  @Prop()
  warehouse: string;

  @Prop(floatSchema)
  item: number;

  @Prop(floatSchema)
  secondaryItem: number;

  @Prop(floatSchema)
  minimum: number;

  @Prop(floatSchema)
  maximum: number;

  @Prop()
  baseChargeFlag: boolean;

  @Prop()
  ipiFlag: boolean;

  @Prop()
  headload: boolean;

  @Prop()
  hazmat: boolean;

  @Prop()
  billingRule: string;

  @Prop()
  chassisRentalDays: number;

  @Prop({ default: 2 })
  isActive: number;

  @Prop({ default: "pending" })
  status: string;

  @Prop({ default: "USD" })
  currency: string;

  @Prop()
  billTo: string;

  @Prop({ type: {} })
  billToName: Record<string, any>;

  @Prop()
  invoice: string;

  @Prop()
  date: Date;

  @Prop()
  reference: string;

  @Prop({ type: {} })
  vendor: Record<string, any>;

  @Prop()
  vendorNumber: string;

  @Prop()
  windowNumber: string;

  @Prop()
  effectiveDate: Date;

  @Prop()
  expiryDate: Date;

  @Prop()
  filename: string;

  @Prop()
  fileType: string;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop(floatSchema)
  weightMinimum: number;

  @Prop(floatSchema)
  weightMaximum: number;

  @Prop()
  dayMinimum: number;

  @Prop()
  dayMaximum: number;

  @Prop()
  palletMinimum: number;

  @Prop()
  palletMaximum: number;

  @Prop()
  packageType: string;

  @Prop()
  packageIn: string;

  @Prop()
  packageOut: string;

  @Prop()
  pcsMinimum: number;

  @Prop()
  pcsMaximum: number;

  @Prop({ default: "STANDARD" })
  billingType: string;

  @Prop()
  legacyIncome: number;

  @Prop()
  legacySqlId: number;

  @Prop()
  groupId: string[];

  @Prop({ default: "cfs" })
  fileSource: string;

  @Prop({ default: false })
  isForceZero: boolean;
}

export type ExampleDocument = HydratedDocument<ExampleSchema>;

export const ExampleModel = SchemaFactory.createForClass(ExampleSchema);
