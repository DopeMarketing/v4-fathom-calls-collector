import { supabase } from '@/lib/supabase';
import type { User, FathomCall, CallTranscript, ActionItem, EmailNotification, ApiIntegration, SearchQuery, ProcessingJob } from '@/types';

// Users
export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch users: ${error.message}`);
  return data;
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw new Error(`Failed to fetch user: ${error.message}`);
  return data;
}

export async function createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select()
    .single();
  if (error) throw new Error(`Failed to create user: ${error.message}`);
  return data;
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update({ ...updates, updated_at: new Date() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(`Failed to update user: ${error.message}`);
  return data;
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete user: ${error.message}`);
}

// Fathom Calls
export async function getAllFathomCalls(): Promise<FathomCall[]> {
  const { data, error } = await supabase
    .from('fathom_calls')
    .select('*')
    .order('call_date', { ascending: false });
  if (error) throw new Error(`Failed to fetch fathom calls: ${error.message}`);
  return data;
}

export async function getFathomCallById(id: string): Promise<FathomCall | null> {
  const { data, error } = await supabase
    .from('fathom_calls')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw new Error(`Failed to fetch fathom call: ${error.message}`);
  return data;
}

export async function createFathomCall(call: Omit<FathomCall, 'id' | 'created_at' | 'updated_at'>): Promise<FathomCall> {
  const { data, error } = await supabase
    .from('fathom_calls')
    .insert(call)
    .select()
    .single();
  if (error) throw new Error(`Failed to create fathom call: ${error.message}`);
  return data;
}

export async function updateFathomCall(id: string, updates: Partial<FathomCall>): Promise<FathomCall> {
  const { data, error } = await supabase
    .from('fathom_calls')
    .update({ ...updates, updated_at: new Date() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(`Failed to update fathom call: ${error.message}`);
  return data;
}

export async function deleteFathomCall(id: string): Promise<void> {
  const { error } = await supabase
    .from('fathom_calls')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete fathom call: ${error.message}`);
}

// Call Transcripts
export async function getAllCallTranscripts(): Promise<CallTranscript[]> {
  const { data, error } = await supabase
    .from('call_transcripts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch call transcripts: ${error.message}`);
  return data;
}

export async function getCallTranscriptById(id: string): Promise<CallTranscript | null> {
  const { data, error } = await supabase
    .from('call_transcripts')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw new Error(`Failed to fetch call transcript: ${error.message}`);
  return data;
}

export async function createCallTranscript(transcript: Omit<CallTranscript, 'id' | 'created_at' | 'updated_at'>): Promise<CallTranscript> {
  const { data, error } = await supabase
    .from('call_transcripts')
    .insert(transcript)
    .select()
    .single();
  if (error) throw new Error(`Failed to create call transcript: ${error.message}`);
  return data;
}

export async function updateCallTranscript(id: string, updates: Partial<CallTranscript>): Promise<CallTranscript> {
  const { data, error } = await supabase
    .from('call_transcripts')
    .update({ ...updates, updated_at: new Date() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(`Failed to update call transcript: ${error.message}`);
  return data;
}

export async function deleteCallTranscript(id: string): Promise<void> {
  const { error } = await supabase
    .from('call_transcripts')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete call transcript: ${error.message}`);
}

// Action Items
export async function getAllActionItems(): Promise<ActionItem[]> {
  const { data, error } = await supabase
    .from('action_items')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch action items: ${error.message}`);
  return data;
}

export async function getActionItemById(id: string): Promise<ActionItem | null> {
  const { data, error } = await supabase
    .from('action_items')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw new Error(`Failed to fetch action item: ${error.message}`);
  return data;
}

export async function createActionItem(item: Omit<ActionItem, 'id' | 'created_at' | 'updated_at'>): Promise<ActionItem> {
  const { data, error } = await supabase
    .from('action_items')
    .insert(item)
    .select()
    .single();
  if (error) throw new Error(`Failed to create action item: ${error.message}`);
  return data;
}

export async function updateActionItem(id: string, updates: Partial<ActionItem>): Promise<ActionItem> {
  const { data, error } = await supabase
    .from('action_items')
    .update({ ...updates, updated_at: new Date() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(`Failed to update action item: ${error.message}`);
  return data;
}

export async function deleteActionItem(id: string): Promise<void> {
  const { error } = await supabase
    .from('action_items')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete action item: ${error.message}`);
}

// Email Notifications
export async function getAllEmailNotifications(): Promise<EmailNotification[]> {
  const { data, error } = await supabase
    .from('email_notifications')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch email notifications: ${error.message}`);
  return data;
}

export async function getEmailNotificationById(id: string): Promise<EmailNotification | null> {
  const { data, error } = await supabase
    .from('email_notifications')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw new Error(`Failed to fetch email notification: ${error.message}`);
  return data;
}

export async function createEmailNotification(notification: Omit<EmailNotification, 'id' | 'created_at' | 'updated_at'>): Promise<EmailNotification> {
  const { data, error } = await supabase
    .from('email_notifications')
    .insert(notification)
    .select()
    .single();
  if (error) throw new Error(`Failed to create email notification: ${error.message}`);
  return data;
}

export async function updateEmailNotification(id: string, updates: Partial<EmailNotification>): Promise<EmailNotification> {
  const { data, error } = await supabase
    .from('email_notifications')
    .update({ ...updates, updated_at: new Date() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(`Failed to update email notification: ${error.message}`);
  return data;
}

export async function deleteEmailNotification(id: string): Promise<void> {
  const { error } = await supabase
    .from('email_notifications')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete email notification: ${error.message}`);
}

// API Integrations
export async function getAllApiIntegrations(): Promise<ApiIntegration[]> {
  const { data, error } = await supabase
    .from('api_integrations')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch API integrations: ${error.message}`);
  return data;
}

export async function getApiIntegrationById(id: string): Promise<ApiIntegration | null> {
  const { data, error } = await supabase
    .from('api_integrations')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw new Error(`Failed to fetch API integration: ${error.message}`);
  return data;
}

export async function createApiIntegration(integration: Omit<ApiIntegration, 'id' | 'created_at' | 'updated_at'>): Promise<ApiIntegration> {
  const { data, error } = await supabase
    .from('api_integrations')
    .insert(integration)
    .select()
    .single();
  if (error) throw new Error(`Failed to create API integration: ${error.message}`);
  return data;
}

export async function updateApiIntegration(id: string, updates: Partial<ApiIntegration>): Promise<ApiIntegration> {
  const { data, error } = await supabase
    .from('api_integrations')
    .update({ ...updates, updated_at: new Date() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(`Failed to update API integration: ${error.message}`);
  return data;
}

export async function deleteApiIntegration(id: string): Promise<void> {
  const { error } = await supabase
    .from('api_integrations')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete API integration: ${error.message}`);
}

// Processing Jobs
export async function getAllProcessingJobs(): Promise<ProcessingJob[]> {
  const { data, error } = await supabase
    .from('processing_jobs')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch processing jobs: ${error.message}`);
  return data;
}

export async function getProcessingJobById(id: string): Promise<ProcessingJob | null> {
  const { data, error } = await supabase
    .from('processing_jobs')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw new Error(`Failed to fetch processing job: ${error.message}`);
  return data;
}

export async function createProcessingJob(job: Omit<ProcessingJob, 'id' | 'created_at' | 'updated_at'>): Promise<ProcessingJob> {
  const { data, error } = await supabase
    .from('processing_jobs')
    .insert(job)
    .select()
    .single();
  if (error) throw new Error(`Failed to create processing job: ${error.message}`);
  return data;
}

export async function updateProcessingJob(id: string, updates: Partial<ProcessingJob>): Promise<ProcessingJob> {
  const { data, error } = await supabase
    .from('processing_jobs')
    .update({ ...updates, updated_at: new Date() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(`Failed to update processing job: ${error.message}`);
  return data;
}

export async function deleteProcessingJob(id: string): Promise<void> {
  const { error } = await supabase
    .from('processing_jobs')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete processing job: ${error.message}`);
}