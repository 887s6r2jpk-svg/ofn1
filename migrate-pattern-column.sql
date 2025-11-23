-- Migrate pattern column from ENUM to VARCHAR to support procedural patterns
ALTER TABLE items MODIFY COLUMN pattern VARCHAR(32) NOT NULL;
