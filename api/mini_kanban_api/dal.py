from itertools import count

from mini_kanban_api.db import get_dynamodb_resource

DEFAULT_COLUMN_ORDER_MAP = {
    "TODO": 1,
    "IN PROGRESS": 2,
    "BLOCKED": 3,
    "DONE": 4,
}

next_card_id = count(start=1000)


def gen_card_id() -> str:
    return str(next(next_card_id))


def get_cards():
    """Get cards by column name"""
    dynamodb = get_dynamodb_resource()
    table = dynamodb.Table("cards")
    response = table.scan()
    cards = [v["card"] for v in response["Items"]]

    return sorted(
        cards,
        key=lambda card: (
            DEFAULT_COLUMN_ORDER_MAP.get(card["column"], 99),
            int(card["id"]),
        ),
    )


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
