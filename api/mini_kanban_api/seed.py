
from botocore.exceptions import ClientError

from mini_kanban_api.db import get_dynamodb_resource


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

        TMP_CARDS = [
            {"id": "1", "column": "column-1", "content": "test"},
            {"id": "2", "column": "column-1", "content": "test"},
            {"id": "3", "column": "column-2", "content": "test"},
            {"id": "4", "column": "column-2", "content": "test"},
            {"id": "5", "column": "column-3", "content": "test"},
        ]

        for card in TMP_CARDS:
            try:
                table.put_item(
                    Item={
                        "id": card["id"],
                        "card": card,
                    }
                )
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
