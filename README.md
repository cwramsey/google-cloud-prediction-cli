# Introduction

This is a small CLI tool that will allow you to easily insert and check the status of training models with the Google Cloud Prediction API.

## Installation

`$ npm install -g google-cloud-prediction-cli`

This will install the command `prediction` as a symlink to your bash profile.

## Usage

```
Google Cloud Prediction API

  A simple tool to insert and check on the status of training models.

Options

  -i, --insert            Command to insert a new training model.
  -s, --status            Command to check the training status of an existing model.
  -p, --project string    Project ID to use
  -m, --model string      Location of the model in Google Cloud Storage. Example:
                          some_bucket/my_file.txt
  -o, --model-id string   ID to associate with the model to create (can be any unique string that's
                          easy to remember)
  -h, --help

Setup

  You must have an environment variable named GOOGLE_APPLICATION_CREDENTIALS
  set to the location of an credentials JSON file.
```

## Example Commands

### Checking Training Status

`$ prediction --status --project=some-gapi-project --model-id=my-model-id`

```
kind:             prediction#training
id:               my-model-id
selfLink:         https://www.googleapis.com/prediction/v1.6/projects/some-gapi-project/trainedmodels/my-model-id
created:          2016-07-21T17:58:23.177Z
trainingComplete: 2016-07-21T18:29:32.084Z
modelInfo:
  numberInstances:        57983
  modelType:              classification
  numberLabels:           110
  classificationAccuracy: 0.84
trainingStatus:   DONE
```

### Inserting a new training model

`$ prediction --insert --project=some-project --model-id=my-model-id --model=my-bucket/some-file.txt`

```
kind:                prediction#training
id:                  my-model-id
selfLink:            https://www.googleapis.com/prediction/v1.6/projects/some-project/trainedmodels/my-model-id
storageDataLocation: my-bucket/some-file.txt
```

