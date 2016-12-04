const path = require('path')
const { Base } = require('yeoman-generator')
const _ = require('lodash')
const prompts = require('./prompts')

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
    console.log(model, answers) // yay!!!, we have everything paired :)
  }

  writing() {
    console.log('ca');
  }
}

module.exports = Generator