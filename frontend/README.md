# Frontend
The frontend component of this demo, which consists of a GCS bucket that [hosts a static website](https://cloud.google.com/storage/docs/hosting-static-website) which contains an embedded [Dialogflow Messenger](https://cloud.google.com/dialogflow/cx/docs/concept/integration/dialogflow-messenger).

![Frontend Architecture](../../assets/architecture-frontend.png)

## Deployment
### Pre-requisistes
* Access to a GCP project with a configured billing account
* The following information from a Dialogflow CX virtual agent deployed following the steps from the [dialogflow](../dialogflow) section
  * Agent ID
  * Agent region

### Deployment Steps
1. Define variables
```
# define vars
PROJECT_ID=<project-id>
REGION=<region>
GCS_BUCKET_NAME=<arbitrary-bucket-name>
AGENT_ID=<agent-id-for-created-agent>

# validate vars are set
echo $PROJECT_ID
echo $REGION
echo $GCS_BUCKET_NAME
echo $AGENT_ID
```

2. Make bucket
```
gsutil mb \
  -l $REGION \
  -p  $PROJECT_ID \
  -b on \
  gs://${GCS_BUCKET_NAME}
```

3. Update HTML file with agent id and region
```
sed -i -e "s/{AGENT_ID}/$AGENT_ID/g" -e "s/{REGION}/$REGION/g" ./index.html
```

4. Upload files
```
gsutil cp ./index.html gs://${GCS_BUCKET_NAME}/
gsutil cp ./golden-ticket.png gs://${GCS_BUCKET_NAME}/
```

5. Make files public
```
gsutil iam ch allUsers:objectViewer gs://${GCS_BUCKET_NAME}
```
6. Access webpage via browser
```
echo https://storage.googleapis.com/${GCS_BUCKET_NAME}/index.html
```

## Test
1. Update perms of folder
```
chmod 755 ../frontend
```
2. Run container locally
```
CONTAINER_ID=$(docker run -v ${PWD}:/usr/share/nginx/html/ -p 8080:80 nginx)
```
3. Access container via browser
http://localhost:8080

4. Kill container
```
docker kill $CONTAINER_ID
```