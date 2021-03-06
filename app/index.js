const generators = require('yeoman-generator')
const prompts = require('./prompts')
const glob = require('glob')

const copyTemplates = (generator) => {
  generator.destinationRoot(`${generator.destinationPath(generator.answers.appName)}`)
  const root = generator.templatePath() + `/${generator.answers.language}`
  const files = glob.sync('**', { dot: true, nodir: true, cwd: root })
  for (let i in files) {
    generator.fs.copyTpl(
      generator.templatePath(`./${generator.answers.language}/${files[i]}`),
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
    return
    this.npmInstall()
  }
}

module.exports = Generator