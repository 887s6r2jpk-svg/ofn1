-- Fix user_reactors foreign key to reference users.id instead of users.code

-- First, drop the foreign key constraint
ALTER TABLE user_reactors DROP FOREIGN KEY user_reactors_ibfk_1;

-- Change user_id column type from varchar(32) to int
ALTER TABLE user_reactors MODIFY COLUMN user_id INT NOT NULL;

-- Re-add the foreign key constraint to reference users.id
ALTER TABLE user_reactors ADD CONSTRAINT user_reactors_ibfk_1 
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
