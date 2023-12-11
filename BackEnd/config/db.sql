CREATE DATABASE transactions_db;
USE transactions_db;
CREATE TABLE transactions (
  id MEDIUMINT NOT NULL AUTO_INCREMENT,
  type VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  created_at DATETIME NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO transactions (type, amount) VALUES ('income', 100.00);
