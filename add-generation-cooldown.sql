-- Add last_generation_time column for 5-minute cooldown
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_generation_time BIGINT NULL;

-- Add item_code column for unique item identifiers
ALTER TABLE items ADD COLUMN IF NOT EXISTS item_code VARCHAR(16) NULL UNIQUE;
