import { HttpStatusCode } from "../util/http-status-codes.enum";

export interface WrapperResponse {
    statusCode: HttpStatusCode;
    entity?: any;
    entities?: any[];
}