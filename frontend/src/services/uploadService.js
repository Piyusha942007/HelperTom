import { aiApi } from './api';

export const uploadService = {
  /**
   * Uploads a document to the FastAPI server for RAG ingestion.
   * @param {File} file - The file object to upload.
   * @param {Function} [onUploadProgress] - Callback to track upload progress (0-100).
   * @returns {Promise<{filename: string, message: string}>}
   */
  uploadFile: async (file, onUploadProgress) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await aiApi.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onUploadProgress && progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onUploadProgress(percentCompleted);
          }
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error in uploadService.uploadFile:', error);
      throw error;
    }
  },

  /**
   * Deletes a document from the RAG backend by filename.
   * @param {string} filename The name of the file to delete.
   * @returns {Promise<{filename: string, message: string, status: string}>}
   */
  deleteFile: async (filename) => {
    try {
      const response = await aiApi.delete(`/documents/${encodeURIComponent(filename)}`);
      return response.data;
    } catch (error) {
      console.error('Error in uploadService.deleteFile:', error);
      throw error;
    }
  },

  /**
   * Fetches the dynamic list of physically ingested training documents.
   * @returns {Promise<{documents: Array, status: string}>}
   */
  getDocuments: async () => {
    try {
      const response = await aiApi.get('/documents');
      return response.data;
    } catch (error) {
      console.error('Error in uploadService.getDocuments:', error);
      throw error;
    }
  },
};

