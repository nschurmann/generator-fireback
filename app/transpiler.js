const templates = (answers) => [{
  template: '../../templates/server/api/user/index.ts',
  destination: 'server/api/user/index.ts',
}, {
  template: '../../templates/server/api/user/user.handler.ts',
  destination: 'server/api/user/user.handler.ts',
}, {
  template: '../../templates/server/api/user/user.model.ts',
  destination: 'server/api/user/user.model.ts',
}, {
  template: '../../templates/server/api/utils.ts',
  destination: 'server/api/utils.ts',
}, {
  template: '../../templates/server/auth/local/index.ts',
  destination: 'server/auth/local/index.ts',
}, {
  template: '../../templates/server/auth/local/passport.ts',
  destination: 'server/auth/local/passport.ts',
}, {
  template: '../../templates/server/auth/auth.service.ts',
  destination: 'server/auth/auth.service.ts',
}, {
  template: '../../templates/server/auth/index.ts',
  destination: 'server/auth/index.ts',
}, {
  template: '../../templates/server/components/errors/index.ts',
  destination: 'server/components/errors/index.ts',
}, {
  template: '../../templates/server/config/environment/development.ts',
  destination: 'server/config/environment/development.ts',
  data: { appName: answers.appName },
}, {
  template: '../../templates/server/config/environment/index.ts',
  destination: 'server/config/environment/index.ts'
}, {
  template: '../../templates/server/config/environment/production.ts',
  destination: 'server/config/environment/production.ts',
  data: { appName: answers.appName },
}, {
  template: '../../templates/server/config/express.ts',
  destination: 'server/config/express.ts',
}, {
  template: '../../templates/server/config/seed.ts',
  destination: 'server/config/seed.ts',
}, {
  template: '../../templates/server/config/seeddb.ts',
  destination: 'server/config/seeddb.ts',
}, {
  template: '../../templates/server/app.ts',
  destination: 'server/app.ts',
}, {
  template: '../../templates/server/index.ts',
  destination: 'server/index.ts',
}, {
  template: '../../templates/server/routes.ts',
  destination: 'server/routes.ts',
}, {
  template: '../../templates/client/index.ts',
  destination: 'client/index.ts',
}, {
  template: '../../templates/package.json',
  destination: 'package.json',
  data: { appName: answers.appName },
}, {
  template: '../../templates/tsconfig.json',
  destination: 'tsconfig.json',
}, {
  template: '../../templates/tslint.json',
  destination: 'tslint.json',
}]
module.exports = (answers) => {
  const tpls = templates(answers)

  return tpls
}