import axios, { AxiosInstance } from 'axios'
import { DifyAppInfo, DifyParameters } from './types.js'

export class DifyClient {
  private client: AxiosInstance

  constructor(baseUrl: string, appSk: string) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${appSk}`,
        'Content-Type': 'application/json'
      }
    })
  }

  async getAppInfo(): Promise<DifyAppInfo> {
    const response = await this.client.get('/info')
    return response.data
  }

  async getParameters(): Promise<DifyParameters> {
    const response = await this.client.get('/parameters')
    return response.data
  }

  async runWorkflow(inputs: Record<string, any>): Promise<string> {
    const response = await this.client.post(
      '/workflows/run',
      {
        inputs,
        response_mode: 'streaming',
        user: `dify-mcp-server-ts-${Math.random().toString(16).slice(0, 12)}`
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data.answer || 'No response from workflow'
  }

  async stopExecution(taskId: string): Promise<void> {
    await this.client.post(`/chat-messages/${taskId}/stop`)
  }
}
