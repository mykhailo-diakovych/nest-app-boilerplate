import { ExampleSchema, ExampleDocument } from "@/schemas/example.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ExampleService {
  constructor(@InjectModel(ExampleSchema.name) private ExampleModel: Model<ExampleSchema>) {}

  async findCharges(
    query: Record<string, any>,
    projection: Record<string, any> = {},
    options: Record<string, any> = {}
  ): Promise<ExampleDocument[]> {
    return this.ExampleModel.find(query, projection, options).lean();
  }

  async findOne(query: Record<string, any>): Promise<ExampleDocument | null> {
    return this.ExampleModel.findOne(query).lean();
  }

  async findOneAndUpdate(
    query: Record<string, any>,
    payload: Record<string, any>
  ): Promise<ExampleDocument | null> {
    return this.ExampleModel.findOneAndUpdate(query, payload, {
      new: true
    }).lean();
  }

  async findByIdAndUpdate(
    query: Record<string, any>,
    payload: Record<string, any>
  ): Promise<ExampleDocument | null> {
    return this.ExampleModel.findByIdAndUpdate(query, payload, {
      new: true
    }).lean();
  }

  async createCharges(payload: Record<string, any>): Promise<ExampleDocument[]> {
    return this.ExampleModel.create(payload) as any;
  }

  async updateManyCharges(
    query: Record<string, any>,
    updateDocument: Record<string, any>
  ) {
    return this.ExampleModel.updateMany(query, updateDocument);
  }
}
