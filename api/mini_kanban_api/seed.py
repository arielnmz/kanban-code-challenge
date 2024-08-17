from itertools import count

from botocore.exceptions import ClientError

from mini_kanban_api.db import get_dynamodb_resource


# Cheat a bit for demo purposes
next_card_id = count(start=1)


def gen_card_id() -> str:
    return str(next(next_card_id))


def create_table():
    dyn_resource = get_dynamodb_resource()
    try:
        table = dyn_resource.create_table(
            TableName="cards",
            KeySchema=[
                {"AttributeName": "id", "KeyType": "HASH"},
            ],
            AttributeDefinitions=[
                {"AttributeName": "id", "AttributeType": "S"},
            ],
            ProvisionedThroughput={
                "ReadCapacityUnits": 10,
                "WriteCapacityUnits": 10,
            },
        )
        table.wait_until_exists()

        seed_board = [
            {
                "id": gen_card_id(),
                "column": "TODO",
                "content": "Track columns independently from cards",
            },
            {
                "id": gen_card_id(),
                "column": "TODO",
                "content": "Create columns independently",
            },
            {"id": gen_card_id(), "column": "TODO", "content": "Fix ordering issue"},
            {
                "id": gen_card_id(),
                "column": "IN PROGRESS",
                "content": "Loom video explaining functionality",
            },
            {"id": gen_card_id(), "column": "BLOCKED", "content": "Nothing 😁"},
            {"id": gen_card_id(), "column": "DONE", "content": "Frontend structure"},
            {"id": gen_card_id(), "column": "DONE", "content": "Frontend components"},
            {"id": gen_card_id(), "column": "DONE", "content": "Frontend store"},
            {"id": gen_card_id(), "column": "DONE", "content": "Backend Server"},
            {"id": gen_card_id(), "column": "DONE", "content": "DynamoDB server"},
            {"id": gen_card_id(), "column": "DONE", "content": "GraphQL API"},
        ]

        for card in seed_board:
            try:
                table.put_item(Item={"id": card["id"], "card": card})
            except ClientError as err:
                print(
                    "Couldn't add movie %s to table %s. Here's why: %s: %s",
                    err.response["Error"]["Code"],
                    err.response["Error"]["Message"],
                )
                raise

    except ClientError as err:
        print(
            "Couldn't create cards table. Here's why",
            err.response["Error"]["Code"],
            err.response["Error"]["Message"],
        )
        raise err
