module.exports = [{
  type: 'options',
  name: 'appName',
  message: 'Type the name of your application',
  default: 'MyApp',
}, {
  type: 'list',
  name: 'transpiler',
  message: 'Select your scripting language',
  choices: ['Typescript', 'Javascript'],
  filter: x => x == 'Typescript' ? 'ts' : 'js'
}, {
  type: 'list',
  name: 'frontend',
  message: 'Select your Frontend tools',
  choices: ['ReactJS + Redux + React Router', 'Plain Javascript'],
  filter: (val) =>
    val == 'Plain Javascript' ? 'js' : 'react'
}, {
  type: 'confirm',
  name: 'bootstrap',
  message: 'Would you like to use bootstrap?',
}, {
  type: 'list',
  name: 'database',
  message: 'What database would you use?',
  choices: ['MongoDB + mongoosejs', 'None'],
  filter: x => x == 'None' ? 'none' : 'mongo'
}, {
  type: 'list',
  name: 'api',
  message: 'Which API would you build?',
  choices: ['GraphQL', 'RESTful'],
  filter: x => x.toLowerCase(),
}, {
  type: 'confirm',
  name: 'auth',
  message: 'Would you use authentication?',
}, {
  type: 'checkbox',
  name: 'oauth',
  message: 'Would you use any of this oauth strategies?',
  when: answers => answers.auth,
  choices: [{
    name: 'Facebook', value: 'facebook'
  }, {
    name: 'Google', value: 'google'
  }, {
    name: 'Twitter', value: 'twitter'
  }],
}]