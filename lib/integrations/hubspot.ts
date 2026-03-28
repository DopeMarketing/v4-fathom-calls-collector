import { Client } from '@hubspot/api-client';

const client = new Client({ accessToken: process.env.HUBSPOT_API_KEY });

interface ContactParams {
  email: string;
  firstname?: string;
  lastname?: string;
  company?: string;
}

interface DealParams {
  dealname: string;
  amount: string;
  dealstage: string;
  pipeline: string;
}

export async function createContact(params: ContactParams) {
  try {
    const contact = await client.crm.contacts.basicApi.create({
      properties: params
    });
    return { success: true, data: contact };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function createDeal(params: DealParams) {
  try {
    const deal = await client.crm.deals.basicApi.create({
      properties: params
    });
    return { success: true, data: deal };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}