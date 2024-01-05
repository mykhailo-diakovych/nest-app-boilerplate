import { getPartyDetails } from "@/utils/getPartyDetails";
import { parseUserFromRequest } from "@/utils/parseUserFromRequest";
import {
  ForbiddenException,
  Injectable,
  Logger,
  NestMiddleware
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class ValidateRequestMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const cfsId = this.configService.get<string>("SUB_ORGANIZATION");
      const { tenant = "coda", "sub-organization": subOrganization } =
        req.headers;

      const tenantOptions = tenant ? { clientId: tenant } : {};
      const subOrgOptions = subOrganization
        ? { cfsId: subOrganization }
        : { cfsId };

      const options = {
        ...tenantOptions,
        ...subOrgOptions
      };

      const user = parseUserFromRequest(req);
      const userCompany = user?.parties?.length
        ? await getPartyDetails(user.parties[0])
        : null;

      req.userCompany = userCompany;
      req.user = user;

      const { method, query, body } = req;
      if (["GET", "DELETE"].includes(method)) {
        req.query = {
          ...query,
          ...options
        };
      }
      if (["POST", "PUT", "PATCH"].includes(method)) {
        req.body = {
          ...body,
          ...options
        };
      }
      next();
    } catch (error) {
      Logger.debug(
        "Error while validating request " + error,
        "VALIDATE REQUEST"
      );

      throw new ForbiddenException({
        errorMessage: `Error while validating request`,
        label: "error",
        httpStatusCode: 401
      });
    }
  }
}
