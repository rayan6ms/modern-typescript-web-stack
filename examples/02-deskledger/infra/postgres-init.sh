#!/bin/sh
set -eu

# Passwords are generated as hex by the local setup script. Never enable shell tracing.
case "$APP_DB_PASSWORD$MIGRATION_DB_PASSWORD" in
  *[!0-9a-f]*) exit 1 ;;
esac
psql --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" --set ON_ERROR_STOP=1 <<SQL
CREATE ROLE deskledger_app LOGIN PASSWORD '$APP_DB_PASSWORD' NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION;
CREATE ROLE deskledger_migrator LOGIN PASSWORD '$MIGRATION_DB_PASSWORD' NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION;
REVOKE ALL ON DATABASE deskledger FROM PUBLIC;
GRANT CONNECT ON DATABASE deskledger TO deskledger_app, deskledger_migrator;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
ALTER SCHEMA public OWNER TO deskledger_migrator;
GRANT USAGE ON SCHEMA public TO deskledger_app;
ALTER DEFAULT PRIVILEGES FOR ROLE deskledger_migrator IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO deskledger_app;
ALTER DEFAULT PRIVILEGES FOR ROLE deskledger_migrator IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO deskledger_app;
ALTER ROLE deskledger_app SET statement_timeout = '5s';
ALTER ROLE deskledger_app SET lock_timeout = '2s';
ALTER ROLE deskledger_app SET idle_in_transaction_session_timeout = '10s';
ALTER ROLE deskledger_migrator SET statement_timeout = '30s';
ALTER ROLE deskledger_migrator SET lock_timeout = '2s';
SQL
