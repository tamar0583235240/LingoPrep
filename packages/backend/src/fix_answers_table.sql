-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Add default UUID generation for id column
ALTER TABLE answers 
ALTER COLUMN id SET DEFAULT uuid_generate_v4();

-- Make sure all required columns exist
ALTER TABLE answers 
ADD COLUMN IF NOT EXISTS amount_feedbacks integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS answer_file_name text;
