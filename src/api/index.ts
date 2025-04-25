import { ENDPOINTS } from "./endpoints";
import { ERROR_MESSAGES } from "./errors";
import { GetRequest, PostRequest } from "./methods";

export const API = {
  ENDPOINTS: ENDPOINTS,
  METHODS: {
    GET: GetRequest,
    POST: PostRequest
  },
  ERRORS: ERROR_MESSAGES
}