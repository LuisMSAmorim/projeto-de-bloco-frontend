import axios, { AxiosInstance } from "axios"
import { HttpRequest } from "../http-request"

export const api = ({ baseURL, headers }: HttpRequest): AxiosInstance => {
  axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'
  return axios.create({ baseURL, headers: { ...headers, "Content-Type": "application/json" } })
}
