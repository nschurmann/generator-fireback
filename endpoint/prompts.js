module.exports = [{
  type: 'options',
  name: 'model',
  message: 'Type the name of your model, the endpoint will be the plural form.',
  default: 'model',
}, {
  type: 'options',
  name: 'field',
  message: 'Type the name of the field (press enter when finished)',
}, {
  type: 'list',
  name: 'type',
  message: 'Select the type',
  choices: ['String', 'Number', 'Boolean'],
}]