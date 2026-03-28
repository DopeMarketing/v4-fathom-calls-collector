import { drive_v3, google } from 'googleapis';

const drive = google.drive({ version: 'v3', auth: process.env.GOOGLE_DRIVE_API_KEY });

interface UploadFileParams {
  name: string;
  parents?: string[];
  mimeType: string;
  body: Buffer | string;
}

interface SearchFilesParams {
  query: string;
  pageSize?: number;
}

export async function uploadFile(params: UploadFileParams) {
  try {
    const result = await drive.files.create({
      requestBody: {
        name: params.name,
        parents: params.parents
      },
      media: {
        mimeType: params.mimeType,
        body: params.body
      }
    });
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function searchFiles(params: SearchFilesParams) {
  try {
    const result = await drive.files.list({
      q: params.query,
      pageSize: params.pageSize || 10,
      fields: 'files(id, name, mimeType, createdTime)'
    });
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}