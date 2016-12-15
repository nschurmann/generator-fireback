#Fireback
Fireback is a web framework to build fast and easy large node.js based applications.
It's designed to use REST or GraphQL API on the backend and offers React and plain JS on the frontend. It can be used
as an API to be consumed by a mobile app.
Fireback supports multiple oauth strategies and let's you generate boilerplate code easily.
Works with MongoDB. It let you add quickly new endpoints or new data models to your GraphQL API.

##Work in progress
Fireback is a work in progress and support:
- General:
  - [x] Create a project
  - [x] The server will watch for file changes
  - [x] Implements hotreload
  - [x] Serve files statically
  - [ ] Use bootstrap (recomendations are accepted)
  - [ ] Configure Templates (The main intention is to extend an existing template so when you generate a component or admin crud will render with the css classes and HTML structure)
- Backend:
  - [x] Typescript
  - [ ] Javascript (Babel)
  - [x] RESTful API
  - [ ] GraphQL API
  - [x] Add REST endpoint (Command)
  - [ ] Add GraphQL data-model (Command)
  - [x] Facebook oauth
  - [ ] Twitter oauth
  - [ ] Google oauth
- Frontend (ReactJS):
  - [ ] Create component
  - [ ] Create actions (will add a reducer)
  - [ ] Add routes
  - [ ] Generate feature (will add CRUD routes, create actions, reducers and components) 
- Admin:
  - [ ] Create CRUD (Generate REST endpoint with model or GraphQL data-model, routes, views, reducers, actions and components for CRUD actions)