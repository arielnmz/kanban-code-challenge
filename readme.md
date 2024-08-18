# Mini Kanban Code Challenge

Develop "Mini Trello/Kanban" interface - With Drag & Drop of cards between columns, Basic Add / Remove / Update Card

- Frontend: React / Hooks + Tailwind css (or equivalent) / Apollo Client GraphQL (no redux preferably)
- Backend: Python / Graphene
- DB: DynamoDB Local

Notes:
- The Trello/Kanban like interface must be implemented from scratch not re-using a fully featured Kanban board package. However the drag and drop functionality can leverage a react library
- The stack is pretty much what our production stack is - so that gives an idea of our production stack

Bonus: Package / Run App in Docker container and/or AWS

Step 1:
- Delivery of Code on Github
- Record and send short 10m Loom video to demo the UI/functionality, code overview (show browser network tab with graphql queries/mutations)

# Quickstart

## Requirements

Docker and Compose available, i.e.:

    docker compose -v

## Run the stack

The application should be available in the following URL: http://localhost:3000/

There are some convenience scripts in the `scripts/` dir, run them using `sh`.

Start by building the images:

    sh scripts/build-compose.sh

Then run the stack using:

    sh scripts/run-compose.sh

Once it's up, initialize the DynamoDB data store with:

    sh scripts/reset-db.sh

This last script can be run anytime to reset any changes to the DB.

## DynamoDB local findings

> The Access Key ID or security token is invalid.

Answer from: https://stackoverflow.com/a/76592596/2625090

> Since the latest release there has been an enforcement on access keys which can be used:
> DynamoDB local version 2.0.0 and greater AWS_ACCESS_KEY_ID can contain the only letters (A–Z, a–z) and numbers (0–9).

That means even dummy credentials will fail if the key/token have weird characters.

> WARNING: [sqlite] cannot open DB[2]: com.almworks.sqlite4java.SQLiteException: [14] unable to open database file

Just use a named volume to guarantee it has permissions.

