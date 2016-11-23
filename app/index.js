const generators = require('yeoman-generator')
const prompts = require('./prompts')

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments)
  },
  prompting: function() {
    return this.prompt(prompts).then(answers => {
      this.answers = answers
    })
  },
  writing: function() {
    console.log(this.answers)
    this.destinationRoot(`${this.destinationPath(this.answers.appName)}`)
    const transpilerTemplates = require('./transpiler')(this.answers)
    transpilerTemplates.map(x => {
      this.fs.copyTpl(
        this.templatePath(x.template),
        this.destinationPath(x.destination),
        x.data
      )
    })
    this.npmInstall()
  }
});