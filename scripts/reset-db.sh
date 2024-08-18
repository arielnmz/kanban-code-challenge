#!/bin/sh

echo "Resetting DynamoDB instance and re-seeding"

docker compose down -v

docker compose up -d

echo "Waiting for DynamoDB to come up..."

sleep 5s

echo "Seeding DynamoDB..."

pushd "api"
  . .venv/bin/activate &&
  python -c 'from mini_kanban_api import seed; seed.create_table()';
popd

echo "Done"