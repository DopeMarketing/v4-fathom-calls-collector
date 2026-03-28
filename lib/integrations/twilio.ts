import { Twilio } from 'twilio';

const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

interface SendMessageParams {
  to: string;
  from: string;
  body: string;
}

interface CallParams {
  to: string;
  from: string;
  url: string;
}

export async function sendMessage(params: SendMessageParams) {
  try {
    const message = await client.messages.create({
      to: params.to,
      from: params.from,
      body: params.body
    });
    return { success: true, data: message };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function makeCall(params: CallParams) {
  try {
    const call = await client.calls.create({
      to: params.to,
      from: params.from,
      url: params.url
    });
    return { success: true, data: call };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}