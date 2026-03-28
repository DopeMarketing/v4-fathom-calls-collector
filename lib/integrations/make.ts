interface MakeWebhookParams {
  webhookUrl: string;
  data: Record<string, any>;
}

interface MakeScenarioParams {
  scenarioId: string;
  data?: Record<string, any>;
}

export async function triggerWebhook(params: MakeWebhookParams) {
  try {
    const response = await fetch(params.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${process.env.MAKE_API_KEY}`
      },
      body: JSON.stringify(params.data)
    });
    
    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function runScenario(params: MakeScenarioParams) {
  try {
    const response = await fetch(`https://www.make.com/api/v2/scenarios/${params.scenarioId}/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${process.env.MAKE_API_KEY}`
      },
      body: JSON.stringify(params.data || {})
    });
    
    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}