interface N8NWebhookParams {
  webhookUrl: string;
  data: Record<string, any>;
}

interface N8NWorkflowParams {
  workflowId: string;
  data?: Record<string, any>;
}

export async function triggerWebhook(params: N8NWebhookParams) {
  try {
    const response = await fetch(params.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-N8N-API-KEY': process.env.N8N_API_KEY || ''
      },
      body: JSON.stringify(params.data)
    });
    
    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function executeWorkflow(params: N8NWorkflowParams) {
  try {
    const response = await fetch(`${process.env.N8N_BASE_URL}/api/v1/workflows/${params.workflowId}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-N8N-API-KEY': process.env.N8N_API_KEY || ''
      },
      body: JSON.stringify(params.data || {})
    });
    
    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}