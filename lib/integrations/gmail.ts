import { gmail_v1, google } from 'googleapis';

const gmail = google.gmail({ version: 'v1', auth: process.env.GMAIL_API_KEY });

interface SendEmailParams {
  to: string;
  subject: string;
  body: string;
  from?: string;
}

interface SearchEmailsParams {
  query: string;
  maxResults?: number;
}

export async function sendEmail(params: SendEmailParams) {
  try {
    const message = [
      `To: ${params.to}`,
      `Subject: ${params.subject}`,
      '',
      params.body
    ].join('\n');
    
    const encodedMessage = Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
    
    const result = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encodedMessage }
    });
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function searchEmails(params: SearchEmailsParams) {
  try {
    const result = await gmail.users.messages.list({
      userId: 'me',
      q: params.query,
      maxResults: params.maxResults || 10
    });
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}