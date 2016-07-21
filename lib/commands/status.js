const cloud = require('./../cloud')
const json = require('prettyjson')

module.exports = (project, modelId, modelLocation) => {

  if (!project) {
    console.log(json.render({
      error: 'Project name must be set with --project'
    }))
    process.exit(1)
  }

  if (!modelId) {
    console.log(json.render({
      error: 'Model ID name must be set with --model-id'
    }))
    process.exit(1)
  }

  cloud.getAuth()
    .then(auth => cloud.status(auth, project, modelId))
    .then(res => console.log(json.render(res)))
    .catch(err => {
      console.log(json.render(err.errors))
      process.exit(1)
    })
}
