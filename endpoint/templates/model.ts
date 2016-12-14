import * as mongoose from 'mongoose'
const { Schema } = mongoose

export interface I<%= modelCapitalized %> extends mongoose.Document {
  _id: any
  <% answers.forEach(function(answer){ %><%= answer.field %>: <%= answer.type %>
  <% }); %>
}

const <%= modelCapitalized %>Schema = new Schema({
  <% answers.forEach(function(answer){ %><%= answer.field %>: <%= answer.type %>,
  <% }); %>
})

export default mongoose.model<I<%= modelCapitalized %>>('<%= modelCapitalized %>', <%= modelCapitalized %>Schema)
