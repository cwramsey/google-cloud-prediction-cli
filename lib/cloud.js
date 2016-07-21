const google = require('googleapis')
const json = require('prettyjson')

const REQUIRED_SCOPES = [
  'https://www.googleapis.com/auth/devstorage.read_write',
  'https://www.googleapis.com/auth/prediction'
]

module.exports = {
  getAuth() {
    return new Promise((resolve, reject) => {
      google.auth.getApplicationDefault((err, authClient) => {
        if (err) {
          console.log(json.render({
            error: 'You must have an environment variable named GOOGLE_APPLICATION_CREDENTIALS set to the location of a valid Google Cloud API credentials JSON file.'
          }))
          process.exit(1)
        }

        resolve(authClient)
      })
    })
  },

  insert(auth, project, modelId, modelLocation) {
    return new Promise((resolve, reject) => {
      if (auth.createScopedRequired && auth.createScopedRequired()) {
        auth = auth.createScoped(REQUIRED_SCOPES)
      }

      google.prediction('v1.6').trainedmodels.insert({
        auth,
        project: project,
        resource: {
          id: modelId,
          storageDataLocation: modelLocation
        }

      }, function (err, res) {
        if (err) {
          reject(err)
          return
        }

        resolve(res)
      })
    })
  },

  status(auth, project, modelId) {
    return new Promise((resolve, reject) => {
      if (auth.createScopedRequired && auth.createScopedRequired()) {
        auth = auth.createScoped(REQUIRED_SCOPES)
      }

      google.prediction('v1.6').trainedmodels.get({
        auth,
        project: project,
        id: modelId,

      }, function (err, res) {
        if (err) {
          reject(err)
          return
        }

        resolve(res)
      })
    })
  }
}
