# Dialogflow
The Dialogflow virtual agent calling Apigee fulfillment APIs

 ![architecture-dialogflow](../../assets/architecture-dialogflow.png)

## Deployment
### Pre-requisites
* Access to a GCP project with a configured billing account
* The publically accessible Apigee URL of the Apigee org/env that the [proxies](../apigee/)

### Deployment Steps
1. Create a Dialogflow CX following the [quickstart](https://cloud.google.com/dialogflow/cx/docs/quick/build-agent#create-agent) with the following parameters:
  * Name: `The Golden Ticket`
  * Location: `<your-region-of-choice>`
  * Time Zone: `<your-timezone-of-choice>`
  * Default language: `en - English`
2. Once the agent has been created, will be in the agent editing pane. Click on the `Agent` drop down on the top nav bar and click on `View all agents`
3. Find the agent you just created, click on the corresponding kebab menu (3 vertical dots), and then select `Restore`
4. Select the `Upload` option, drag the `TheGoldenTicket.blob` into the window, and select `Restore`
5. Update the `apigee` webhook in the agent to point to your Apigee URL
  * Click on the `Manage` tab on the upper left corner
  * Click on `Webhooks`
  * Click on the `apigee` webhook
  * Update the `<APIGEE_URL>` section with your publically accessible Apigee hostname
    * change just the hostname, leave the path as-is
  * Click `Save`
8. Enable integration with Dialogflow messenger
  * Click on the `Manage` tab on the upper left corner
  * Click on `Integrations`
  * Click on the `Connect` button for Dialogflow Messenger
  * If prompted, select `Enable`
  * A window with a `<script>` will appear. Copy the contents of the `agent-id` value
