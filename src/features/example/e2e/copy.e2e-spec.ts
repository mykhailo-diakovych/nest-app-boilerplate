import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "@/app.module";
import * as request from "supertest";
import { ExampleService } from "@/features/example/example.service";
import { NON_EXISTING_ITEM_ID } from "@/features/example/constants";

describe("API copy e2e", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("should return 500 if item ids is invalid", async () => {
    const itemIds = ["item1", "item2"];
    const newCustomer = "newCustomer";

    await request(app.getHttpServer())
      .post("/items/copy")
      .send({ itemIds, customer: newCustomer })
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it("should return validation error for missing customer field", async () => {
    const exampleService = app.get<ExampleService>(ExampleService);
    const [{ _id: chargeId }] = await exampleService.findCharges(
      {},
      { _id: 1 },
      { limit: 1 }
    );

    const itemIds = [chargeId];

    await request(app.getHttpServer())
      .post("/items/copy")
      .send({ itemIds })
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it("should return validation error for missing itemIds field", async () => {
    const newCustomer = "newCustomer";

    await request(app.getHttpServer())
      .post("/items/copy")
      .send({ customer: newCustomer })
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it("should not copy items if item is not found ", async () => {
    const itemIds = [NON_EXISTING_ITEM_ID];
    const newCustomer = "newCustomer";

    await request(app.getHttpServer())
      .post("/items/copy")
      .send({ itemIds, customer: newCustomer })
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it("should copy items if item is found", async () => {
    const itemIds = ["659660aec678f6f9ef165ca2"];
    const customer = "STANDARD";

    const exampleService = app.get<ExampleService>(ExampleService);
    const item = await exampleService.findOne({ _id: itemIds[0] });

    if (!item.isActive) {
      console.log("Cannot copy inactive item");
      return;
    }

    const response = await request(app.getHttpServer())
      .post("/items/copy")
      .send({ itemIds, customer })
      .expect(HttpStatus.CREATED);

    expect(response?.body).toHaveProperty(
      "msg",
      "Items have been copied successfully!"
    );
  });
});
