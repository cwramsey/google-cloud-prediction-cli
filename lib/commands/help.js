const usage = require('command-line-usage')

module.exports = (optionList) => {
  const sections = [
    {
      header: 'Google Cloud Prediction API',
      content: 'A simple tool to insert and check on the status of training models.'
    },
    {
      header: 'Options',
      optionList
    },
    {
      header: 'Setup',
      content: 'You must have an environment variable named GOOGLE_APPLICATION_CREDENTIALS set to the location of an credentials JSON file.'
    }
  ]

  console.log(usage(sections))
}
