export type Headers = {
  Authorization?: string
}

export interface HttpRequest {
  baseURL: string
  headers?: Headers
}
