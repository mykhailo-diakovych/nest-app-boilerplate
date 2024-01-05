import { Logger } from "@nestjs/common";

export const checkExistingConsumer = async ({
  channel,
  queueName,
  serviceName
}) => {
  try {
    const queueInfo = await channel.checkQueue(queueName);
    const existingConsumerCount = queueInfo?.consumerCount;

    Logger.debug(
      `existing consumer count:  ${existingConsumerCount}`,
      `${serviceName} QUEUE CONSUMER`
    );

    if (existingConsumerCount && existingConsumerCount >= 3) {
      return true;
    }
    return false;
  } catch (error) {
    Logger.error(
      `Error checking for existing consumer:  ${error}`,
      `${serviceName} QUEUE CONSUMER`
    );
    return false;
  }
};

export const closeConnection = (channel, conn, serviceName, callback) => {
  try {
    if (channel && channel?.isOpen) {
      channel.close();
    }
    if (conn && conn?.isOpen) {
      conn.close();
    }
    setTimeout(() => {
      callback();
    }, 1000);
  } catch (error) {
    Logger.error(
      `Error while closing queue connection:  ${error}`,
      `${serviceName} QUEUE CLOSE CONNECTION`
    );
  }
};
