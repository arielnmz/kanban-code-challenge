from uuid import uuid4

from botocore.exceptions import ClientError

from mini_kanban_api.db import get_dynamodb_resource

TMP_CARDS = [
    {"id": "1", "column": "column-1", "content": "test"},
    {"id": "2", "column": "column-1", "content": "test"},
    {"id": "3", "column": "column-2", "content": "test"},
    {"id": "4", "column": "column-2", "content": "test"},
    {"id": "5", "column": "column-3", "content": "test"},
]


def gen_card_id():
    return uuid4().hex


def get_cards():
    """Get cards by column name"""
    dynamodb = get_dynamodb_resource()
    table = dynamodb.Table("cards")
    response = table.scan()
    return [v["card"] for v in response["Items"]]


def create_card(column: str, content: str):
    """Update a single card"""
    dynamodb = get_dynamodb_resource()
    table = dynamodb.Table("cards")
    card_id = gen_card_id()
    card = {
        "id": card_id,
        "column": column,
        "content": content,
    }
    table.put_item(Item={"id": card_id, "card": card})


def update_card(_id: str, column: str, content: str):
    """Update a single card"""
    dynamodb = get_dynamodb_resource()
    table = dynamodb.Table("cards")
    table.update_item(
        Key={"id": _id},
        UpdateExpression="SET card.#column = :columnVal, card.#content = :contentVal",
        ExpressionAttributeNames={
            "#column": "column",
            "#content": "content",
        },
        ExpressionAttributeValues={":columnVal": column, ":contentVal": content},
    )


def delete_card(_id: str):
    """Deleting a single card"""
    dynamodb = get_dynamodb_resource()
    table = dynamodb.Table("cards")
    table.delete_item(Key={"id": _id})
