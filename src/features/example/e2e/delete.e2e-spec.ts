import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../../../app.module";
import mongoose from "mongoose";

describe("API Delete item e2e", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should delete a item and return 200", async () => {
    const itemId = "659660aec678f6f9ef165ca2";
    const response = await request(app.getHttpServer())
      .delete(`/items/delete?itemId=${itemId}`)
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty(
      "msg",
      "Items have been deleted successfully!"
    );
  });

  it("should return 404 Not Found if item does not exist", async () => {
    const fakeChargeId = new mongoose.Types.ObjectId().toString();

    const response = await request(app.getHttpServer())
      .delete(`/items/delete?itemId=${fakeChargeId}`)
      .expect(HttpStatus.NOT_FOUND);

    expect(response.body).toHaveProperty("error", "Not Found");
  });

  it("should return 500 if item id is invalid", async () => {
    await request(app.getHttpServer())
      .delete("/items/delete?itemId=invalid-item-id")
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
