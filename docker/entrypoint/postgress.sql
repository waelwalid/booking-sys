SELECT 'CREATE DATABASE booking_service'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'booking_service');