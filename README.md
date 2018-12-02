<h1 align="center" style="border-bottom: none;">Affective Mirroring Chatbot</h1>
<h3 align="center">Application developed to IA369Y - Computação Afetiva</h3>
<h4 align="center">2018 2nd Semester</h4>

## Prerequisites

1. Sign up for an [IBM Cloud account](https://console.bluemix.net/registration/).
1. Download the [IBM Cloud CLI](https://console.bluemix.net/docs/cli/index.html#overview).
1. Create an instance of the Watson Assistant service and get your credentials:
    - Go to the [Watson Assistant](https://console.bluemix.net/catalog/services/conversation) page in the IBM Cloud Catalog.
    - Log in to your IBM Cloud account.
    - Click **Create**.
    - Click **Show** to view the service credentials.
    - Copy the `apikey` value, or copy the `username` and `password` values if your service instance doesn't provide an `apikey`.
    - Copy the `url` value.

## Configuring the application

1. In your IBM Cloud console, open the Watson Assistant service instance

2. Click the **Import workspace** icon in the Watson Assistant service tool. Specify the location of the workspace JSON file in your local copy of the app project:


    `<project_root>/assistant_workspaces/skill-Affective-Mirroring---Emotions.json` (for the affective chatbot)

    `<project_root>/assistant_workspaces/skill-Affective-Mirroring---Neutral.json`  (for the neutral chatbot)                 


3. Select **Everything (Intents, Entities, and Dialog)** and then click **Import**. The affective chatbot workspace is created.

4. Click the menu icon in the upper-right corner of the workspace tile, and then select **View details**.

5. Click the Copy icon to copy the workspace ID to the clipboard.

6. In the application folder, open *credentials.json* file

7. Add the service credentials that you obtained in the previous step.

    Example *credentials.json* file that configures the application for a Watson Assistant service instance hosted in the US East region:

    ```
    {
      "service_username": "apikey",
      "service_password": "PUKlh62UxqE33GrW9kzntX4aX-IYO911gQUwfrQE_UU1",
      "workspace_id": "2b17f22e-ch87-4d43-a215-6ceb30d65433"
    }

    ```

    Example *credentials.json* file that configures the application for a Watson Assistant service instance hosted in the US South region:

    ```
    {
      "service_username": "522be-7b41-ab44-dec3-g1eab2ha98ct",
      "service_password": "A4Z5BdGENrwu8",
      "workspace_id": "2b17f22e-ch87-4d43-a215-6ceb30d65433"
    }

    ```

## Running locally

1. Install the dependencies

    ```
    npm install
    ```

1. Run the application

    ```
    npm start
    ```

1. View the application in a browser at `localhost:3000`

## Deploying to IBM Cloud as a Cloud Foundry Application

1. Login to IBM Cloud with the [IBM Cloud CLI](https://console.bluemix.net/docs/cli/index.html#overview)

    ```
    ibmcloud login
    ```

1. Target a Cloud Foundry organization and space.

    ```
    ibmcloud target --cf
    ```

1. Edit the *manifest.yml* file. Change the **name** field to something unique.  
  For example, `- name: my-app-name`.
1. Deploy the application

    ```
    ibmcloud app push
    ```

1. View the application online at the app URL.  
For example: https://my-app-name.mybluemix.net

## Dataset

1. The Lexical Dictionary used in this classifier can be found in *training/NRC-Portugues.csv* file


[docs]: https://console.bluemix.net/docs/services/conversation/index.html
[docs_landing]: (https://console.bluemix.net/docs/services/conversation/index.html)
[node_link]: (http://nodejs.org/)
[npm_link]: (https://www.npmjs.com/)
[sign_up]: bluemix.net/registration
