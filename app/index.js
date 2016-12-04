const generators = require('yeoman-generator')
const prompts = require('./prompts')
const glob = require('glob')
const path = require('path')


/**
 * copyTemplates
 * Helper function to copy and render templates in destination app folder.
 * @param {generator} generator
 */
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

class Generator extends generators.Base {
  constructor(...args) {
    super(...args)
  }

  prompting() {
    return this.prompt(prompts).then(answers => {
      this.answers = answers
    })
  }

  writing() {
    copyTemplates(this)
    this.npmInstall()
  }
}

module.exports = Generator