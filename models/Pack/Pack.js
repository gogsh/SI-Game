const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  author: { type: String, unique: false},
  date: { type: String },
  difficulty: { type: String },
  logo: { type: String },
  name: { type: String },
  discription: { type: String },
  rounds: { type: Array },
  finalRound: { type: Object },
  links: [{ type: Types.ObjectId, ref: 'Link' }]
})

module.exports = model('Pack', schema)
