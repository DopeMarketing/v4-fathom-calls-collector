export interface User {
  id: string;
  email: string;
  role: 'owner' | 'admin' | 'viewer';
  full_name: string | null;
  google_drive_folder_id: string | null;
  preferences: any;
  created_at: Date;
  updated_at: Date;
}

export interface FathomCall {
  id: string;
  user_id: string;
  fathom_call_id: string;
  title: string;
  call_date: Date;
  duration_minutes: number | null;
  call_type: string | null;
  participants: any;
  recording_url: string | null;
  google_drive_file_id: string | null;
  folder_path: string | null;
  processing_status: 'pending' | 'processing' | 'completed' | 'failed';
  metadata: any;
  created_at: Date;
  updated_at: Date;
}

export interface CallTranscript {
  id: string;
  user_id: string;
  call_id: string;
  raw_transcript: string;
  processed_transcript: string | null;
  speaker_segments: any;
  google_drive_file_id: string | null;
  confidence_score: number | null;
  created_at: Date;
  updated_at: Date;
}

export interface ActionItem {
  id: string;
  user_id: string;
  call_id: string;
  title: string;
  description: string | null;
  assignee: string | null;
  due_date: string | null;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  external_task_id: string | null;
  external_tool: string | null;
  transcript_context: string | null;
  confidence_score: number | null;
  created_at: Date;
  updated_at: Date;
}

export interface EmailNotification {
  id: string;
  user_id: string;
  call_id: string;
  recipient_email: string;
  subject: string;
  body: string;
  notification_type: 'call_processed' | 'transcript_ready' | 'action_items_created';
  status: 'pending' | 'sent' | 'failed';
  sent_at: Date | null;
  gmail_message_id: string | null;
  error_message: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface ApiIntegration {
  id: string;
  user_id: string;
  service_name: string;
  is_active: boolean;
  credentials: any;
  configuration: any;
  last_sync_at: Date | null;
  sync_status: 'inactive' | 'active' | 'error';
  error_message: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface SearchQuery {
  id: string;
  user_id: string;
  query_text: string;
  filters: any;
  results_count: number;
  execution_time_ms: number | null;
  created_at: Date;
  updated_at: Date;
}

export interface ProcessingJob {
  id: string;
  user_id: string;
  call_id: string | null;
  job_type: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress_percentage: number;
  started_at: Date | null;
  completed_at: Date | null;
  error_message: string | null;
  job_data: any;
  retry_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface Database {
  users: User;
  fathom_calls: FathomCall;
  call_transcripts: CallTranscript;
  action_items: ActionItem;
  email_notifications: EmailNotification;
  api_integrations: ApiIntegration;
  search_queries: SearchQuery;
  processing_jobs: ProcessingJob;
}