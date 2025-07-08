#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Clear any cached configuration
# This is crucial for ensuring .env changes are applied
echo "Clearing configuration cache..."
php artisan config:clear

# Wait for the database to be ready
echo "Waiting for database to be ready..."
while ! nc -z db 3306; do
  sleep 1
done
echo "Database is ready."

# Generate app key if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example"
    cp .env.example .env
    php artisan key:generate
else
    echo ".env file already exists."
fi

# Run database migrations
# The --force flag is required to run migrations in production
echo "Running database migrations..."
php artisan migrate --force

# Execute the main container command (passed as arguments to this script)
exec "$@"
