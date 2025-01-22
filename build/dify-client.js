import axios from 'axios';
export class DifyClient {
    client;
    constructor(baseUrl, appSk) {
        this.client = axios.create({
            baseURL: baseUrl,
            headers: {
                Authorization: `Bearer ${appSk}`,
                'Content-Type': 'application/json'
            }
        });
    }
    async getAppInfo() {
        const response = await this.client.get('/info');
        return response.data;
    }
    async getParameters() {
        const response = await this.client.get('/parameters');
        return response.data;
    }
    async runWorkflow(inputs) {
        const response = await this.client.post('/workflows/run', {
            inputs,
            response_mode: 'streaming',
            user: `dify-mcp-server-ts-${Math.random().toString(16).slice(0, 12)}`
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data.answer || 'No response from workflow';
    }
    async stopExecution(taskId) {
        await this.client.post(`/chat-messages/${taskId}/stop`);
    }
}
