import { Headers } from "./http/http-request";
import { api } from "./http/axios/api";

export interface HttpService {
  domain: string
  headers?: Headers
}

export const HttpService = ({ domain, headers }: HttpService) => {
  return api({ baseURL: `http://localhost:5014/api/${domain}`, headers })
}
