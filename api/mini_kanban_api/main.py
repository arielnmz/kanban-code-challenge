from fastapi import FastAPI
from starlette_graphene3 import GraphQLApp, make_graphiql_handler

from mini_kanban_api.schema import schema

app = FastAPI()

app.mount(
    "/api/gql", GraphQLApp(schema, on_get=make_graphiql_handler())
)  # Graphiql IDE
