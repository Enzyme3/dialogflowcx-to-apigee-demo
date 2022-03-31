# dialogflow-apigee-demo
This demo serves as a deployable reference implementation of a chatbot developed using [Dialogflow CX](https://cloud.google.com/dialogflow/cx/docs/basics) and [Apigee](https://cloud.google.com/apigee/docs/api-platform/get-started/what-apigee)

.gif of sample interaction with demo found below:
![Demo](../assets/demo.gif)

## Architecture
![Demo Architecture](../assets/architecture.png)
The demo consists of the following components:
* A [Cloud Run](https://cloud.google.com/run) service that hosts the backend APIs
* An [Apigee X](https://cloud.google.com/apigee/docs/api-platform/get-started/what-apigee) instance that acts as the API Gateway to the Cloud Run service
* A [Dialogflow CX](https://cloud.google.com/dialogflow/cx/docs/basics) virtual agent that sends webhook calls to Apigee
* A GCS bucket that [hosts a static website](https://cloud.google.com/storage/docs/hosting-static-website) which contains an embedded [Dialogflow Messenger](https://cloud.google.com/dialogflow/cx/docs/concept/integration/dialogflow-messenger) that points to the Dialogflow CX virtual agent

## Deployment
### Pre-requisites
* Access to a GCP project with a configured billing account
* An Apigee X or Apigee hybrid instance with a publicly accessible endpoint
  * Can provision an Apigee X evaluation instance following these [steps](https://cloud.google.com/apigee/docs/api-platform/get-started/eval-orgs)
  * Technically, the Apigee endpoint does not need to be publicly accessible by using [service directoy for private network access](https://cloud.google.com/dialogflow/cx/docs/concept/webhook#sd), but that is beyond the scope of this demo

### Deployment Steps
To deploy the solution yourself, navigate into each of the following directories to deploy the individual components. It is recommended to deploy in the following order:
1. [backend](./backend)
2. [apigee](./apigee)
3. [dialogflow](./dialogflow)
4. [frontend](./frontend)
