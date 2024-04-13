# Media Fetcher

This project's responsibilities:

1. Read responses from candidates in CSV format. This is now a Google Sheets' published sheet.
2. Fetch given Google Drive files using [Google Drive API](https://developers.google.com/drive/api/guides/about-sdk).
3. Save it into `../../public/candidate-images` for further usage in the website.

## What needed to be set

| ENV                                      | Description                                                                                  |
| ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| `CANDIDATE_MEDIA_CSV_URL`                | URL of the CSV version of candidate media response                                           |
| `GOOGLE_API_SERVICE_ACCOUNT_CREDENTIALS` | Content of the `credentials.json` file generated from Google Cloud Console (read more below) |

## How to setup Google API Service Account

### Create and retrieve `GOOGLE_API_SERVICE_ACCOUNT_CREDENTIALS`

The Google API Service Account is needed for authentication and authorization of accesses to files.

1. [Create a new Google Cloud project](https://console.cloud.google.com/projectcreate) and [enable Google Drive API](https://console.cloud.google.com/apis/enableflow?apiid=drive.googleapis.com) in the project.
2. [Create new Service Account](https://console.cloud.google.com/iam-admin/serviceaccounts/create) for the project.
3. Go into the newly created account > Keys > Create new key > JSON.
4. Retrieve the `credentials.json` file and use as an environment variable.

### Grant Permission to the Targeted Folder

The Service Account will have its own email (e.g. `xxxx@--project-name--.iam.gserviceaccount.com`), add that email address to the targeted folder as an `Editor`.
