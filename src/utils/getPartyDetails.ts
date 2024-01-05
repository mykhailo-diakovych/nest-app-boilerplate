import { Party } from "@/interfaces/response.interface";
import { Logger } from "@nestjs/common";
import axios from "axios";

export const getPartyDetails = async (id: string): Promise<Party> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { TP_HOST } = process.env;
      const url = `${TP_HOST}/parties/party/${id}`;
      const axiosOptions = {
        method: "get",
        url
      };

      Logger.debug(
        "Party request payload " + JSON.stringify(axiosOptions),
        "PARTY GET"
      );

      const axiosResponse = await axios(axiosOptions);
      const { data: responseData } = axiosResponse;
      resolve(responseData);
    } catch (error) {
      Logger.debug("Error while getting party " + error, "PARTY GET");
      reject(error);
    }
  });
};
