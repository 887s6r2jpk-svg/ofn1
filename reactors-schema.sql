-- =====================================================================
-- REACTOR SYSTEM SCHEMA
-- =====================================================================

-- Master table: all reactor types with prices
CREATE TABLE IF NOT EXISTS reactors_master (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  price_ocu INT NOT NULL,
  base_feu_per_hour DECIMAL(10,2) NOT NULL,
  base_cycle_minutes INT NOT NULL,
  base_efficiency DECIMAL(5,4) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- User-owned reactors
CREATE TABLE IF NOT EXISTS user_reactors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(32) NOT NULL,
  reactor_id INT NOT NULL,
  level INT DEFAULT 1,
  efficiency DECIMAL(5,4) DEFAULT 0,
  last_claim_timestamp BIGINT DEFAULT 0,
  auto_mining BOOLEAN DEFAULT FALSE,
  purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(code) ON DELETE CASCADE,
  FOREIGN KEY (reactor_id) REFERENCES reactors_master(id) ON DELETE CASCADE,
  INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert reactor types
INSERT INTO reactors_master (name, price_ocu, base_feu_per_hour, base_cycle_minutes, base_efficiency) VALUES
('Alpha Reactor', 50, 100, 60, 0.05),
('Beta Reactor', 120, 250, 55, 0.08),
('Gamma Reactor', 200, 450, 50, 0.12),
('Delta Reactor', 380, 800, 45, 0.15),
('Epsilon Reactor', 600, 1400, 40, 0.20),
('Zeta Reactor', 900, 2500, 35, 0.25);

-- Activity feed table for reactor events
CREATE TABLE IF NOT EXISTS reactor_activity (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(32) NOT NULL,
  activity_type ENUM('purchase', 'upgrade', 'claim', 'efficiency_change') NOT NULL,
  reactor_name VARCHAR(50),
  details JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(code) ON DELETE CASCADE,
  INDEX idx_user_time (user_id, created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
