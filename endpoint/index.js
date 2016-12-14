const { Base } = require('yeoman-generator')
const _ = require('lodash')
const prompts = require('./prompts')
const glob = require('glob')
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
const copyTemplates = (generator) => {
  const _path = `server/api/${generator.answers.model}`
  generator.destinationRoot(`${generator.destinationPath(_path)}`)
  const root = generator.templatePath()
  const files = glob.sync('**', { dot: true, nodir: true, cwd: root })
  console.log(Object.assign({}, generator.answers, {modelCapitalized: String(generator.answers.model).capitalizeFirstLetter()}))
  for (let i in files) {
    generator.fs.copyTpl(
      generator.templatePath(`./${files[i]}`),
      generator.destinationPath(`${generator.answers.model}.${files[i]}`),
      Object.assign({}, generator.answers, {modelCapitalized: String(generator.answers.model).capitalizeFirstLetter()})
    )
  }
}

class Generator extends Base {
  constructor(...args) {
    super(...args)
  }

  prompting() {
    this.answers = []
    const cb = this.async()
    const modelPrompts = prompts.slice()
    modelPrompts.shift()
    prompts.pop()
    prompts.pop()
    let i = true
    const keepPrompting = (prompts) => {
      return this.prompt(prompts).then(answers => {
        this.answers = this.answers.concat(answers)
        i = Number(!i)
        if (this.answers[this.answers.length-1].field != '') {
          keepPrompting(modelPrompts[i])
        }else {
          this.answers.pop()
          cb()
        }
      })
    }
    keepPrompting(prompts)
    
  }

  pairing() {
    const model = this.answers.shift()
    const fields = this.answers.filter(x => x.field)
    const types = this.answers.filter(x => x.type)
    const answers = _.zipWith(fields, types,
      (x, y) => ({ field: x.field, type: y.type }))
    this.answers = {
      model: model.model,
      answers
    }
  }

  writing() {
    copyTemplates(this, `server/api/${this.answers.model}`)
  }
}

module.exports = Generator