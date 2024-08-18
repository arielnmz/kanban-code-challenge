import os
from functools import cache

import boto3

DYNAMODB_ENDPOINT = os.getenv("DYNAMODB_ENDPOINT", "http://localhost:8000")


@cache
def get_dynamodb_resource():
    return boto3.resource(
        "dynamodb",
        endpoint_url=DYNAMODB_ENDPOINT,
        region_name="us-east-1",
        aws_access_key_id="DUMMY",
        aws_secret_access_key="DUMMY",
    )
