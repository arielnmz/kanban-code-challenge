from functools import cache

import boto3


@cache
def get_dynamodb_resource():
    return boto3.resource(
        "dynamodb",
        endpoint_url="http://localhost:8000/",
        region_name="us-east-1",
        aws_access_key_id="DUMMY",
        aws_secret_access_key="DUMMY",
    )
