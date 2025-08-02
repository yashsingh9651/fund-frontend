/**
 * Service for handling file uploads to the backend
 */

/**
 * Uploads a file to the server and returns the filename stored in S3
 * @param file The file to upload
 * @returns Object containing the filename stored in S3
 * @throws Error if upload fails
 */
export async function uploadFile(file: File): Promise<{ filename: string }> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Upload failed: ${errorData}`);
    }
    
    const data = await response.json();
    console.log('File uploaded successfully:', data);
    return data;
  } catch (error: any) {
    console.error('Error uploading file:', error);
    throw new Error(`Upload failed: ${error.message}`);
  }
}

export async function getFileUrl(filename: string): Promise<string> {
  try {
    const response = await fetch( process.env.NEXT_PUBLIC_BACKEND_URL + `/download/${filename}`, {
      method: 'GET',
    });
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`File not found: ${errorData}`);
    }
    
    const data = await response.json();
    console.log('File URL:', data.url);
    return data.url;
  } catch (error: any) {
    console.error('Error getting file URL:', error);
    throw new Error(`File not found: ${error.message}`);
  }
}