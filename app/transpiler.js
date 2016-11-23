const templates = (answers) => [{
  template: '../../templates/server/api/user/index',
  destination: 'server/api/user/index',
}, {
  template: '../../templates/server/api/user/user.handler',
  destination: 'server/api/user/user.handler',
}, {
  template: '../../templates/server/api/user/user.model',
  destination: 'server/api/user/user.model',
}, {
  template: '../../templates/server/api/utils',
  destination: 'server/api/utils',
}, {
  template: '../../templates/server/auth/local/index',
  destination: 'server/auth/local/index',
}, {
  template: '../../templates/server/auth/local/passport',
  destination: 'server/auth/local/passport',
}, {
  template: '../../templates/server/auth/auth.service',
  destination: 'server/auth/auth.service',
}, {
  template: '../../templates/server/auth/index',
  destination: 'server/auth/index',
}, {
  template: '../../templates/server/components/errors/index',
  destination: 'server/components/errors/index',
}, {
  template: '../../templates/server/config/environment/development',
  destination: 'server/config/environment/development',
  data: { appName: answers.appName },
}, {
  template: '../../templates/server/config/environment/index',
  destination: 'server/config/environment/index'
}, {
  template: '../../templates/server/config/environment/production',
  destination: 'server/config/environment/production',
  data: { appName: answers.appName },
}, {
  template: '../../templates/server/config/express',
  destination: 'server/config/express',
}, {
  template: '../../templates/server/config/seed',
  destination: 'server/config/seed',
}, {
  template: '../../templates/server/config/seeddb',
  destination: 'server/config/seeddb',
}, {
  template: '../../templates/server/app',
  destination: 'server/app',
}, {
  template: '../../templates/server/index',
  destination: 'server/index',
}, {
  template: '../../templates/server/routes',
  destination: 'server/routes',
}, {
  template: '../../templates/package.json',
  destination: 'package.json',
  data: { appName: answers.appName },
}, {
  template: '../../templates/tsconfig.json',
  destination: 'tsconfig.json',
}]
module.exports = (answers) => {
  const tpls = templates(answers).map(t => {
    
    if (t.destination.split('.')[1] !== 'json') {
      t.template = `${t.template}.${answers.transpiler}`
      t.destination = `${t.destination}.${answers.transpiler}`
    }
    
    return t
  })
  console.log(tpls);
  return tpls
}