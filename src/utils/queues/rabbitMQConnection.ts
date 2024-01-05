import { closeConnection } from "@/utils/queues";
import { Logger } from "@nestjs/common";
import * as amqp from "amqplib";

let rmq_connection = null;
let rmq_channel = null;

process.on("close", () => {
  try {
    closeConnection(
      rmq_channel,
      rmq_connection,
      "AUDIT-LOGS",
      connectToRabbitMQ
    );

    Logger.debug(
      "Queue connection is closed.",
      "EMAIL QUEUE CONNECTION CLOSED"
    );
  } catch (error) {
    Logger.error("Error on close event " + error, "EMAIL QUEUE CONNECTION");
  }
});

const connectToRabbitMQ = async () => {
  Logger.debug(
    "Start connection..." + process.env.RMQ_HOST,
    "RABBIT MQ AUDIT LOG"
  );

  try {
    rmq_connection = await amqp.connect(process.env.RMQ_HOST);
    rmq_channel = await rmq_connection.createChannel();
    rmq_channel.on("error", (error) => {
      Logger.error(
        "Error " + error?.message,
        "RABBIT MQ AUDIT LOG QUEUE ERROR"
      );
    });
    await rmq_channel.assertExchange(
      process.env.RMQ_EXCHANGE_NAME,
      process.env.RMQ_EXCHANGE_TYPE,
      {
        durable: true
      }
    );
    Logger.debug("Successfully connected.", "RABBIT MQ AUDIT LOG");
  } catch (error) {
    closeConnection(
      rmq_channel,
      rmq_connection,
      "AUDIT-LOGS",
      connectToRabbitMQ
    );
    Logger.error("Error " + error?.message, "RABBIT MQ AUDIT LOG QUEUE ERROR");
  }
};

export const publishToExchange = async (key, data) => {
  await connectToRabbitMQ();

  try {
    if (!rmq_channel) {
      return Logger.error(
        "rmq_channel is null",
        "RABBIT MQ AUDIT LOG QUEUE ERROR"
      );
    }

    Logger.debug(
      `Sending Data to RMQ:
        - Key: ${key}
      `,
      "RABBIT MQ AUDIT LOG"
    );

    return rmq_channel.publish(
      process.env.RMQ_EXCHANGE_NAME,
      key,
      Buffer.from(JSON.stringify(data))
    );
  } catch (error) {
    closeConnection(
      rmq_channel,
      rmq_connection,
      "AUDIT-LOGS",
      connectToRabbitMQ
    );

    Logger.error("Error " + error?.message, "RABBIT MQ AUDIT LOG QUEUE ERROR");
  }
};
