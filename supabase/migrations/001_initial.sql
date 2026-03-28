BEGIN;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'viewer')),
    full_name TEXT,
    google_drive_folder_id TEXT,
    preferences JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Fathom calls table
CREATE TABLE fathom_calls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    fathom_call_id TEXT NOT NULL,
    title TEXT NOT NULL,
    call_date TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER,
    call_type TEXT,
    participants JSONB NOT NULL DEFAULT '[]',
    recording_url TEXT,
    google_drive_file_id TEXT,
    folder_path TEXT,
    processing_status TEXT NOT NULL DEFAULT 'pending' CHECK (processing_status IN ('pending', 'processing', 'completed', 'failed')),
    metadata JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_fathom_calls_user_id ON fathom_calls(user_id);
CREATE INDEX idx_fathom_calls_fathom_call_id ON fathom_calls(fathom_call_id);
CREATE INDEX idx_fathom_calls_call_date ON fathom_calls(call_date);
CREATE INDEX idx_fathom_calls_processing_status ON fathom_calls(processing_status);
CREATE INDEX idx_fathom_calls_created_at ON fathom_calls(created_at);

-- Call transcripts table
CREATE TABLE call_transcripts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    call_id UUID NOT NULL REFERENCES fathom_calls(id) ON DELETE CASCADE,
    raw_transcript TEXT NOT NULL,
    processed_transcript TEXT,
    speaker_segments JSONB NOT NULL DEFAULT '[]',
    google_drive_file_id TEXT,
    confidence_score DECIMAL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_call_transcripts_user_id ON call_transcripts(user_id);
CREATE INDEX idx_call_transcripts_call_id ON call_transcripts(call_id);
CREATE INDEX idx_call_transcripts_created_at ON call_transcripts(created_at);
CREATE INDEX idx_call_transcripts_search ON call_transcripts USING gin(to_tsvector('english', raw_transcript || ' ' || COALESCE(processed_transcript, '')));

-- Action items table
CREATE TABLE action_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    call_id UUID NOT NULL REFERENCES fathom_calls(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    assignee TEXT,
    due_date DATE,
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
    external_task_id TEXT,
    external_tool TEXT,
    transcript_context TEXT,
    confidence_score DECIMAL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_action_items_user_id ON action_items(user_id);
CREATE INDEX idx_action_items_call_id ON action_items(call_id);
CREATE INDEX idx_action_items_assignee ON action_items(assignee);
CREATE INDEX idx_action_items_status ON action_items(status);
CREATE INDEX idx_action_items_due_date ON action_items(due_date);
CREATE INDEX idx_action_items_created_at ON action_items(created_at);

-- Email notifications table
CREATE TABLE email_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    call_id UUID NOT NULL REFERENCES fathom_calls(id) ON DELETE CASCADE,
    recipient_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    notification_type TEXT NOT NULL CHECK (notification_type IN ('call_processed', 'transcript_ready', 'action_items_created')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
    sent_at TIMESTAMPTZ,
    gmail_message_id TEXT,
    error_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_email_notifications_user_id ON email_notifications(user_id);
CREATE INDEX idx_email_notifications_call_id ON email_notifications(call_id);
CREATE INDEX idx_email_notifications_status ON email_notifications(status);
CREATE INDEX idx_email_notifications_notification_type ON email_notifications(notification_type);
CREATE INDEX idx_email_notifications_created_at ON email_notifications(created_at);

-- API integrations table
CREATE TABLE api_integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    service_name TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT false,
    credentials JSONB NOT NULL DEFAULT '{}',
    configuration JSONB NOT NULL DEFAULT '{}',
    last_sync_at TIMESTAMPTZ,
    sync_status TEXT NOT NULL DEFAULT 'inactive' CHECK (sync_status IN ('inactive', 'active', 'error')),
    error_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_api_integrations_user_id ON api_integrations(user_id);
CREATE UNIQUE INDEX idx_api_integrations_user_service ON api_integrations(user_id, service_name);
CREATE INDEX idx_api_integrations_is_active ON api_integrations(is_active);
CREATE INDEX idx_api_integrations_created_at ON api_integrations(created_at);

-- Search queries table
CREATE TABLE search_queries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    query_text TEXT NOT NULL,
    filters JSONB NOT NULL DEFAULT '{}',
    results_count INTEGER NOT NULL DEFAULT 0,
    execution_time_ms INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_search_queries_user_id ON search_queries(user_id);
CREATE INDEX idx_search_queries_query_text ON search_queries(query_text);
CREATE INDEX idx_search_queries_created_at ON search_queries(created_at);

-- Processing jobs table
CREATE TABLE processing_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    call_id UUID REFERENCES fathom_calls(id) ON DELETE CASCADE,
    job_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'running', 'completed', 'failed', 'cancelled')),
    progress_percentage INTEGER NOT NULL DEFAULT 0,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    error_message TEXT,
    job_data JSONB NOT NULL DEFAULT '{}',
    retry_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_processing_jobs_user_id ON processing_jobs(user_id);
CREATE INDEX idx_processing_jobs_call_id ON processing_jobs(call_id);
CREATE INDEX idx_processing_jobs_status ON processing_jobs(status);
CREATE INDEX idx_processing_jobs_job_type ON processing_jobs(job_type);
CREATE INDEX idx_processing_jobs_created_at ON processing_jobs(created_at);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE fathom_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE action_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE processing_jobs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "owner_all" ON users FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON fathom_calls FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON call_transcripts FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON action_items FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON email_notifications FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON api_integrations FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON search_queries FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON processing_jobs FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

COMMIT;