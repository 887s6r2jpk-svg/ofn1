-- Add password column and make email unique for authentication
ALTER TABLE users ADD COLUMN IF NOT EXISTS password VARCHAR(255) NULL;
ALTER TABLE users ADD UNIQUE INDEX idx_email_unique (email);
