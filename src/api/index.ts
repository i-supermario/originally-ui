import { ENDPOINTS } from "./endpoints";
import { ERROR_MESSAGES } from "./errors";
import { DeleteRequest, GetRequest, PostRequest, PutRequest } from "./methods";

export const API = {
  ENDPOINTS: ENDPOINTS,
  METHODS: {
    GET: GetRequest,
    POST: PostRequest,
    DELETE: DeleteRequest,
    PUT: PutRequest
  },
  ERRORS: ERROR_MESSAGES
}