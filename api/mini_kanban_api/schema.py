import graphene

from mini_kanban_api import seed
from mini_kanban_api.dal import get_cards, create_card, update_card, delete_card


class CardType(graphene.ObjectType):
    id = graphene.ID()
    column = graphene.String()
    content = graphene.String()


class BoardType(graphene.ObjectType):
    cards = graphene.List(
        CardType, columns=graphene.List(graphene.String, required=True)
    )

    @staticmethod
    def resolve_cards(*_, columns):
        # Resolve only the cards of a column, in batches
        return get_cards(columns)


class Query(graphene.ObjectType):
    board = graphene.Field(BoardType)

    @staticmethod
    def resolve_board(*_):
        # Board is just a holder for the cards
        return {}


class CreateCard(graphene.Mutation):
    class Arguments:
        column = graphene.String()
        content = graphene.String()

    ok = graphene.Boolean()

    @staticmethod
    def mutate(*_, column, content):
        create_card(column, content)
        return CreateCard(ok=True)  # noqa


class UpdateCard(graphene.Mutation):
    class Arguments:
        _id = graphene.ID()
        column = graphene.String()
        content = graphene.String()

    ok = graphene.Boolean()

    @staticmethod
    def mutate(*_, _id, column, content):
        update_card(_id, column, content)
        return UpdateCard(ok=True)  # noqa


class DeleteCard(graphene.Mutation):
    class Arguments:
        _id = graphene.ID()

    ok = graphene.Boolean()

    @staticmethod
    def mutate(*_, _id):
        delete_card(_id)
        return DeleteCard(ok=True)  # noqa


class SeedDB(graphene.Mutation):
    class Arguments:
        ...

    ok = graphene.Boolean()

    @staticmethod
    def mutate(*_):
        seed.create_table()
        return SeedDB(ok=True)  # noqa


class Mutations(graphene.ObjectType):
    create_card = CreateCard.Field()
    update_card = UpdateCard.Field()
    delete_card = DeleteCard.Field()
    # Some DB actions
    seed_db = SeedDB.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
