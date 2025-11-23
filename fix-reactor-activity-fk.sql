-- Fix reactor_activity foreign key to reference users.id instead of users.code

-- Drop the foreign key constraint
ALTER TABLE reactor_activity DROP FOREIGN KEY reactor_activity_ibfk_1;

-- Change user_id column type from varchar(32) to int
ALTER TABLE reactor_activity MODIFY COLUMN user_id INT NOT NULL;

-- Re-add the foreign key constraint to reference users.id
ALTER TABLE reactor_activity ADD CONSTRAINT reactor_activity_ibfk_1 
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
