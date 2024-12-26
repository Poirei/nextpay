-- Create hypertable for balances
SELECT create_hypertable('balances', 'timestamp', migrate_data => true);