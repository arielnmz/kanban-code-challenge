#!/bin/sh

echo "Resetting DynamoDB instance and re-seeding"

docker compose down -v db

docker compose up -d db

echo "Waiting for DynamoDB to come up..."

sleep 5s

echo "Seeding DynamoDB..."

if [ -z "$DYNAMODB_ENDPOINT" ]; then
  echo "WARN: The env var \$DYNAMODB_ENDPOINT is not set, this script will use the DEFAULT endpoint: http://localhost:8000"
  export DYNAMODB_ENDPOINT="http://localhost:8000"
fi

pushd "api"
  . .venv/bin/activate &&
    python -c 'from mini_kanban_api import seed; seed.create_table()';
popd

echo "Done"