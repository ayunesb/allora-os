import axios from 'axios';

const webhookService = {
  async sendWebhook(url: string, payload: any) {
    try {
      const response = await axios.post(url, payload);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
};

export default webhookService;