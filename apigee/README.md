# Apigee
Sample Apigee proxies for Dialogflow integration

Consists of 4 Apigee proxies:
1. TheGoldenTicket
2. Movies
3. Showtimes
4. Tickets

Of the four proxies, the critical one is `TheGoldenTicket`. This proxy serves as a reference implementation built with Dialogflow-specific best practices in mind. The remaining three proxies are simple pass-thru proxies that `TheGoldenTicket` will invoke via [proxy chaining](https://cloud.google.com/apigee/docs/api-platform/fundamentals/connecting-proxies-other-proxies#connectingproxiesbypath).

**Note**: for the sake of simplicity, these proxies do not enforce authentication

 ![architecture-apigee](../../assets/architecture-apigee.png)

## Deployment
The following steps rely on a [maven plugin for Apigee](https://github.com/apigee/apigee-deploy-maven-plugin/tree/hybrid). If you do not wish to use maven or the plugin, you can deploy it [manually](https://cloud.google.com/apigee/docs/api-platform/fundamentals/download-api-proxies#upload).

### Pre-requisites
* Access to an [Apigee X](htwtps://cloud.google.com/apigee/docs/api-platform/get-started/what-apigee) instance
* All the pre-requisites required for the [apigee maven plugin](https://github.com/apigee/apigee-deploy-maven-plugin/tree/hybrid)
* The URL of the Cloud Run app that serves as the backend
  * this URL should have been created as part of the [backend deployment](../backend)

### Deployment Steps
1. Define variables
```
# define vars
PROJECT_ID=<project-id>
CLOUDRUN_URL=<https://cloud-run-url>
export APIGEE_ORG=<apigee-org>
export APIGEE_ENV=<apigee-env>

# validate vars are set
echo $PROJECT_ID
echo $APIGEE_ORG
echo $APIGEE_ENV

```

2. Update configuration with dynamic values
```
sed -i s,{CLOUDRUN_URL},$CLOUDRUN_URL,g ./Movies/apiproxy/targets/default.xml
sed -i s,{CLOUDRUN_URL},$CLOUDRUN_URL,g ./Showtimes/apiproxy/targets/default.xml
sed -i s,{CLOUDRUN_URL},$CLOUDRUN_URL,g ./Tickets/apiproxy/targets/default.xml
```

3. Setup `gcloud`
```
# login with gcloud
gcloud auth login

# set project
gcloud config set project ${PROJECT_ID}
```

4. `cd` into each API proxy folder and deploy via mvn command
```
cd Movies
mvn clean install -Peval -Dbearer=$(gcloud auth print-access-token)

cd ../Showtimes
mvn clean install -Peval -Dbearer=$(gcloud auth print-access-token)

cd ../Tickets
mvn clean install -Peval -Dbearer=$(gcloud auth print-access-token)

cd ../TheGoldenTicket
mvn clean install -Peval -Dbearer=$(gcloud auth print-access-token)
```
