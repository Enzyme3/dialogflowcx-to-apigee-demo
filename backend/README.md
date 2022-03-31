# Backend
Mock backend written with Express JS and deployed on Cloud Run

Exposes the following APIs:
* GET /movies 
    * returns list of movies playing at a specified location/date
* GET /showtimes
    * returns list of showtimes for a movie playing at a specified location/date
* POST /ticket
    * purchase a ticket for a movie showing
* GET /ticket/{ticket-id}
    * get a ticket by id

![architecture-backend](../../assets/architecture-backend.png)

## Deployment
### Pre-requisites
* Access to a GCP project with a configured billing account

### Deployment Steps
1. Define variables
```
# define vars
PROJECT_ID=<project-id>
REGION=<region>
APP_NAME=the-golden-ticket
REPO_NAME=$APP_NAME

# validate vars are set
echo $PROJECT_ID
echo $REGION
echo $APP_NAME
echo $REPO_NAME
```

2. Setup `gcloud` and enable APIs
```
# login with gcloud
gcloud auth login

# set project
gcloud config set project ${PROJECT_ID}

# enable services
gcloud services enable \
  artifactregistry.googleapis.com \
  run.googleapis.com \
  --project ${PROJECT_ID}
```

3. Create Artifact Registry repository and push image to repo
```
# create Artifact Registry repo
gcloud artifacts repositories create ${REPO_NAME} \
  --repository-format=docker \
  --project=${PROJECT_ID} \
  --location=${REGION} \
  --description="Docker repo for ${APP_NAME}"

# cd into app folder
cd ./the-golden-ticket

# build image
docker build -t ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${APP_NAME}:$(git rev-parse --short HEAD) .

# [Optional] test container locally 
CONTAINER_ID=$(docker run -d -p 8080:8080 ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${APP_NAME}:$(git rev-parse --short HEAD))

# [Optional] test container locally by hitting the healthcheck
curl http://localhost:8080/

# [Optional] kill container
docker kill $CONTAINER_ID

# configure docker to authN to Artifact Registry
gcloud auth configure-docker ${REGION}-docker.pkg.dev

# push image to registry
docker push ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${APP_NAME}:$(git rev-parse --short HEAD)
```
4. Deploy to Cloud Run
```
gcloud run deploy ${APP_NAME} \
  --image=${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${APP_NAME}:$(git rev-parse --short HEAD) \
  --allow-unauthenticated \
  --region=${REGION} \
  --max-instances=1 \
  --project ${PROJECT_ID}
```
5. Grab the URL that was created for the CloudRun service
```
# grab URL
CLOUDRUN_URL=$(gcloud run services describe $APP_NAME \
  --region=${REGION} \
  --format="value(status.address.url)")

# validate URL was retrieved
echo $CLOUDRUN_URL
```

## Test Locally
1. `cd` into `the-golden-ticket` folder
```
cd ./the-golden-ticket
```
2. Build docker image
```
docker build . -t the-golden-ticket:latest
```
3. Run container
```
CONTAINER_ID=$(docker run -d -p  8080:8080 the-golden-ticket:latest)
```
4. Test healthcheck
```
curl http://localhost:8080
```
5. Kill container
```
docker kill $CONTAINER_ID
```