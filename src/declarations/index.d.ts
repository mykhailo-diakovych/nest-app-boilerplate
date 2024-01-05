import { Party } from "@/interfaces/response.interface";

export {};

export type _Foo = Foo;

declare global {
  namespace Express {
    interface Request {
      // define custom request properties here
      userCompany: Party | null;
      user: Record<string, any>;
    }
  }
}
