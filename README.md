# aws_dynamodb_rest_api
AWS DynamoDB based back end REST API. Docker container also used.

# Run locally DynamoDB in Docker
docker run -p 8000:8000 amazon/dynamodb-local -jar DynamoDBLocal.jar -inMemory -sharedDb

# Local DynamoDB GUI Admin Interface
npm install -g dynamodb-admin

# Running DynamoDB Admin GUI Interface
# For Windows:
set DYNAMO_ENDPOINT=http://localhost:8000
dynamodb-admin

# For Mac/Linux:
DYNAMO_ENDPOINT=http://localhost:8000 dynamodb-admin