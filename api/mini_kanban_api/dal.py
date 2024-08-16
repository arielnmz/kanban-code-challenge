from collections.abc import Iterable
from botocore.exceptions import ClientError

from mini_kanban_api.db import get_dynamodb_resource

TMP_CARDS = [
    {"id": "1", "column": "column-1", "content": "test"},
    {"id": "2", "column": "column-1", "content": "test"},
    {"id": "3", "column": "column-2", "content": "test"},
    {"id": "4", "column": "column-2", "content": "test"},
    {"id": "5", "column": "column-3", "content": "test"},
]


def get_cards(columns: Iterable[str]):
    """Get cards by column name"""
    dynamodb = get_dynamodb_resource()
    table = dynamodb.Table('cards')
    try:
        response = table.scan()
    except ClientError as err:
        print(
            "Couldn't query for movies released in %s. Here's why: %s: %s",
            err.response["Error"]["Code"],
            err.response["Error"]["Message"],
        )
        raise
    else:
        print(response)
        all_cards = response['Items']
        for card in all_cards:
            if card["card"]["column"] in columns:
                yield card["card"]


def create_card(column: str, content: str):
    """Update a single card"""

    print("Creating card", column, content)


def update_card(_id: str, column: str, content: str):
    """Update a single card"""

    print("Updating card", _id, column, content)


def delete_card(_id: str):
    """Deleting a single card"""

    print("Deleting card", _id)
