import { ConfigModule, ConfigService } from "@nestjs/config";

export const databaseProvider = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const MONGO_DB_SCHEME = configService.get<string>("MONGO_DB_SCHEME");
    const MONGO_DB_HOST = configService.get<string>("MONGO_DB_HOST");
    const MONGO_DB_NAME = configService.get<string>("MONGO_DB_NAME");
    const MONGO_DB_USER = configService.get<string>("MONGO_DB_USER");
    const MONGO_DB_PASSWORD = configService.get<string>("MONGO_DB_PASSWORD");
    const MONGO_DB_OPTIONS = configService.get<string>("MONGO_DB_OPTIONS");

    return {
      uri: `${MONGO_DB_SCHEME}://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/${MONGO_DB_NAME}?${MONGO_DB_OPTIONS}`
    };
  },
  inject: [ConfigService]
};
