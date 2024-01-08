import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../../../app.module";
import { NON_EXISTING_ITEM_ID } from "@/features/example/constants";

// work the same as the update one but for multiple items
describe("API bulk update items (e2e)", () => {
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

  it("should return 404 if item does not exist", async () => {
    const response = await request(app.getHttpServer())
      .patch(`/items/bulk-update/`)
      .send({ itemIds: [NON_EXISTING_ITEM_ID], item: 11 })
      .expect(HttpStatus.NOT_FOUND);

    expect(response.body).toHaveProperty("message", "No items found!");
  });

  it("should return 200 if payload is not provided", async () => {
    const itemId = "659660748d4ca88569239860";

    await request(app.getHttpServer())
      .patch(`/items/bulk-update/`)
      .send({ itemIds: [itemId] })
      .expect(HttpStatus.OK);
  });

  it("should update the item if it exists", async () => {
    const itemId = "659660748d4ca88569239860";
    const updatedItem = 15;

    const response = await request(app.getHttpServer())
      .patch(`/items/bulk-update/`)
      .send({ itemIds: [itemId], item: updatedItem })
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty(
      "msg",
      "Items have been updated successfully!"
    );
  });

  it("should return validation error if item is not a number", async () => {
    const itemId = "659660748d4ca88569239860";
    const updatedItem = "not a number";

    await request(app.getHttpServer())
      .patch(`/items/bulk-update/`)
      .send({ itemIds: [itemId], item: updatedItem })
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
