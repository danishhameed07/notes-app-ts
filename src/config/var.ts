import * as dotenv from "dotenv";

dotenv.config();

interface Config {
  env: string | undefined;
  port: string | undefined;
  mongo: {
    uri: string;
  };
  baseUrl: string | undefined;
  bypassedRoutes: string[];
  passwordEncryptionKey: string | undefined;
  jwtExpirationInterval: string | undefined;
}

export const config: Config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: {
    uri: process.env.MONGO_URI || "",
  },
  baseUrl: process.env.BASE_URL,
  bypassedRoutes: ["register", "login"],
  passwordEncryptionKey: process.env.PASSWORD_ENCRYPTION_KEY,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
};
