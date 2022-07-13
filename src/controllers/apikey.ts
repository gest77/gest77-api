import { ResultWithStatusCode } from "../toolsServices/ErrorService";
import * as TokenService from "../toolsServices/TokenService";

export const create = async (): Promise<ResultWithStatusCode<{ apikey: string }>> => {
    return { statusCode: 200, result: { apikey: TokenService.createApiKeyToken() } };
};
