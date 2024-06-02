import json
import boto3
import uuid
from datetime import datetime
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Todo')
def post_todo(task):
    try:
        todo = {
            'id': str(uuid.uuid4()),
            'Task': task,
            'Status': 'In Progress',
            'Timestamp': datetime.utcnow().isoformat()
        }
        response = table.put_item(Item=todo, ReturnValues='ALL_OLD')
        return response.get('Attributes', {})
    except ClientError as e:
        print(f"ClientError: {e.response['Error']['Message']}")
        return {'error': e.response['Error']['Message']}

def lambda_handler(event, context):
    try:
        body = json.loads(event.get('body', '{}'))
        task = body.get('Task')

        if not task:
            return {
                'statusCode': 400,
                'body': 'Missing required field: Task'
            }

        response = post_todo(task)
        return {
            'statusCode': 200,
            'body': json.dumps(response)
        }
    except Exception as e:
        print(f"Exception: {str(e)}")
        return {
            'statusCode': 500,
            'body': 'Internal Server Error: ' + str(e)
        }
