import { Received } from '../../models'
import { HttpService } from '../../services/http-service'

export class ReceivedsRepository {

  private token: string

  constructor(token: string) {
    this.token = token
  }

  async getAll(): Promise<Received[]> {
    const { data } = await HttpService({ domain: 'receiveds', headers: { Authorization: this.token }})
                          .get<Received[]>('/')
    return data
  }

  async create(received: Received): Promise<Received> {
    const { data } = await HttpService({ domain: 'receiveds', headers: { Authorization: this.token }})
                          .post<Received>('/', received)
    return data
  }

  async update(received: Received): Promise<Received> {
    const { data } = await HttpService({ domain: 'receiveds', headers: { Authorization: this.token }})
                          .put<Received>(`/${received.receivedId}`, received)
    return data
  }

  async delete(receivedId: number): Promise<void> {
    await HttpService({ domain: 'receiveds', headers: { Authorization: this.token }})
          .delete(`/${receivedId}`)
  }
}
