const generators = require('yeoman-generator')
const prompts = require('./prompts')
const glob = require('glob')
const path = require('path')

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
    copyTemplates(this)
    this.npmInstall()
  }
})

const copyTemplates = (generator) => {
  generator.destinationRoot(`${generator.destinationPath(generator.answers.appName)}`)
  const root = generator.templatePath('../../templates')
  const files = glob.sync('**', { dot: true, nodir: true, cwd: root })
  for (let i in files) {
    generator.fs.copyTpl(
      generator.templatePath(`../../templates/${files[i]}`),
      generator.destinationPath(files[i]),
      generator.answers
    )
  }
}