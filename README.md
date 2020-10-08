# Hello World Template - Node.js

# Welcome to Altostra
We have created this Hello World project for you to get the feel for our platform and to get you started with the next-gen of cloud development.

Follow the instructions below to get started.

Visit us at [www.altostra.com](https://www.altostra.com)

Happy Clouding!

# Before you begin
Before you dive into creating cool applications with Altostra, we need to set you up first. Follow these steps:

## 1. Create a free Altostra account
To create an account, simply login to the [Altostra Web Console](https://app.altostra.com).

## 2. Install the Altostra CLI
You will use the [Altostra CLI](https://docs.altostra.com/reference/CLI/altostra-cli.html) for many of the management operations, install it from NPM (make sure you have [Node.js](https://nodejs.org/en/) installed):

```sh
npm i -g @altostra/cli
```

## 3. Install the Altostra Tools extension for Visual Studio Code
The Altostra Tools extension integrates Altostra's visual designer and utilities into Visual Studio Code, which enables you to work on your application infrastructure side-by-side with your code.

The Altostra Tools extension for Visual Studio Code is available on the Visual Studio marketplace, you can install it in any of these three ways:

* Directly from the marketplace, just follow [this link](https://marketplace.visualstudio.com/items?itemName=Altostra.altostra).

* Search for `Altostra Tools` in the Visual Studio Code extensions view.

* Install it from the terminal:
```sh
code --install-extension Altostra.altostra
```

## 4. Login from the CLI
Many of the Altostra CLI commands require authentication, run the following command to login:

```sh
alto login
```

# Open and explore the project
Open the project directory in Visual Studio Code, the Altostra Designer will load automatically.

# Test locally
You can run the project locally to try it out and play around with the code. It's a good way to debug, test and quickly iterate during development—make sure to also properly test your projects in the cloud.

## Prerequisites
To run the project locally, you will need few tools installed:

1. [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

## Start the API
To start a local instance of the API, run:
```sh
# builds the project and saves the resulting SAM template to a file
alto build

# start an instance of API Gateway on the localhost
sam local start-api -t sam-template.json
```

> If you change the project design, re-run these commands.

## Get the message
Run the following command to get the welcome message:
```sh
curl http://localhost:3000/welcome-message 
```

## Set your name
Run the following command to set your name:
```sh
curl --data "Your Name Here" http://localhost:3000/my-name
```

Now run the previous command to get the message again, it should now be personalized 👋🏻

# Deploy to the Playground environment
The [Playground](https://docs.altostra.com/reference/concepts/playground-environment.html) environment simulates a real cloud environment for you to deploy projects without actually creating cloud resources.

The [deployment](https://docs.altostra.com/reference/concepts/deployments.html) output will be the infrastructure configuration files and function code files. You can then download and review these files, and also execute them manually on your cloud account if you wish.

## Deploy
Let's [deploy](https://docs.altostra.com/howto/projects/deploy-project.html) the `hello-world` project to the Playground, run:

```sh
# create a new image of the project called "world"
alto push world

# deploy the image "world" to a new deployment in the "Playground" environment
alto deploy hello:world --new Playground
```

> For more information about project images, [read the docs](https://docs.altostra.com/reference/concepts/project-image.html).

## Explore the deployment details
From the terminal, run:
```sh
# list the deployments for the current project
alto deployments

# display the details of the "hello" deployment
alto deployments hello
```

Alternatively, you can open the project in the Altostra Web Console to see its details and to download the files generated by the deployment:

```sh
# open the current project in the Altostra Web Console 
alto console
```

Click on the deployment name `hello` in the list to open the deplyment profile page.  

Under "Deployments History" you should see a single entry with the details of your deployment and the current status.

Click on the action link on the right side of the history entry to download the infrastructure configuration files and function code files.

# Deploy to the cloud

## Connect a cloud account
For the this part, you must first [connect a cloud account](https://docs.altostra.com/getting-started/connect-your-accounts.html#connect-your-cloud-service-accounts) in the [Web Console](https://app.altostra.com/settings). 

After you do that, Altostra creates a new _Production_ environment for you – when you deploy to this environment resources are created on your connected account.

## Deploy
```sh
# create a new image of the project called "v1.0"
alto push v1.0

# deploy the image "v1.0" to a new deployment in the "Production" environment
alto deploy prod:v1.0 --new Production
```

## Update
If you decide to change the design or the code of the project, you will need to upload a new version.

To do that, push a new image and [update the deployment](https://docs.altostra.com/howto/projects/deploy-project.html#update-an-existing-deployment):
```sh
# create a new image of the project called "v1.1"
alto push v1.1

# update the existing "prod" deployment with the new "v1.1" image
alto deploy prod:v1.1
```

> You don't need to specify the `--new` option and the environment name when you update deployments.

## Explore the deployment details
You can now open the Altostra Web Console to browse your project and its deployments:

```sh
# open the current project in the Altostra Web Console 
alto console
```

Click on the deployment name `prod` in the list to open the deplyment profile page.  

Under "Deployments History" you should see a single entry with the details of your deployment and the current status. The deployment might take a while to complete.

Click on the action link on the right side of the history entry to open the cloud provider's console where you can see the deployed resources and their details.