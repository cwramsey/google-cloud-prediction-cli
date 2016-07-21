#!/usr/bin/env node

const cli = require('command-line-args')
const json = require('prettyjson')

const argumentsDefinition = [
  {
    name: 'insert',
    alias: 'i',
    type: Boolean,
    description: 'Command to insert a new training model.'
  },
  {
    name: 'status',
    alias: 's',
    type: Boolean,
    description: 'Command to check the training status of an existing model.'
  },
  {
    name: 'project',
    alias: 'p',
    type: String,
    description: 'Project ID to use'
  },
  {
    name: 'model',
    alias: 'm',
    type: String,
    description: 'Location of the model in Google Cloud Storage. Example: some_bucket/my_file.txt'
  },
  {
    name: 'model-id',
    alias: 'o',
    type: String,
    description: "ID to associate with the model to create (can be any unique string that's easy to remember)"
  },
  {
    name: 'help',
    alias: 'h',
    type: Boolean
  }
]

const options = cli(argumentsDefinition)

if (options.help || (!options.status && !options.insert)) {
  require('./lib/commands/help')(argumentsDefinition)
  process.exit()
}

if (options.status && options.insert) {
  console.log(json.render({
    error: 'Can not insert and check status at the same time.'
  }))
} else if (options.status) {
  require('./lib/commands/status')(options.project, options['model-id'])
} else if (options.insert) {
  require('./lib/commands/insert')(options.project, options['model-id'], options.model)
}
