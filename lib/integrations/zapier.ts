interface ZapierWebhookParams {
  url: string;
  data: Record<string, any>;
}

interface ZapierTriggerParams {
  hookUrl: string;
  payload: Record<string, any>;
}

export async function triggerWebhook(params: ZapierWebhookParams) {
  try {
    const response = await fetch(params.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.ZAPIER_API_KEY || ''
      },
      body: JSON.stringify(params.data)
    });
    
    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function triggerZap(params: ZapierTriggerParams) {
  try {
    const response = await fetch(params.hookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params.payload)
    });
    
    const result = await response.text();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}