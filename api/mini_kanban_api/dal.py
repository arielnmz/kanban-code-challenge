from collections.abc import Iterable


TMP_CARDS = [
    {"id": "1", "column": "column-1", "content": "test"},
    {"id": "2", "column": "column-1", "content": "test"},
    {"id": "3", "column": "column-2", "content": "test"},
    {"id": "4", "column": "column-2", "content": "test"},
    {"id": "5", "column": "column-3", "content": "test"},
]


def get_cards(columns: Iterable[str]):
    """Get cards by column name"""

    for card in TMP_CARDS:
        if card["column"] in columns:
            yield card


def create_card(column: str, content: str):
    """Update a single card"""

    print("Creating card", column, content)


def update_card(_id: str, column: str, content: str):
    """Update a single card"""

    print("Updating card", _id, column, content)


def delete_card(_id: str):
    """Deleting a single card"""

    print("Deleting card", _id)
