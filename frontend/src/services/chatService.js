import { aiApi } from './api';

export const chatService = {
  /**
   * Sends a user query to the FastAPI RAG engine.
   * @param {string} message The customer's support message.
   * @returns {Promise<{response: string, sources: Array, status: string}>}
   */
  sendMessage: async (message) => {
    try {
      const response = await aiApi.post('/chat', { message });
      return response.data;
    } catch (error) {
      console.error('Error in chatService.sendMessage:', error);
      throw error;
    }
  },
};
