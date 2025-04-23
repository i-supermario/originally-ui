import { ENDPOINTS } from "./endpoints";
import { ERROR_MESSAGES } from "./errors";
import { GetRequest, PostRequest } from "./methods";

export const API = {
  ENDPOINTS: ENDPOINTS,
  METHODS: {
    Get: GetRequest,
    Post: PostRequest
  },
  ERRORS: ERROR_MESSAGES
}