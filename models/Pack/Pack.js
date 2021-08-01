const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  info: {
    type: Object, required: true, properties: {
      author: { type: String },
      date: { type: String },
      difficulty: { type: Number },
      logo: { type: String },
      name: { type: String }
    }
  },
  rounds: {
    type: Array, properties: {      
    }, maxProperties: 8
  },
  links: [{type: Types.ObjectId, ref: 'Link'}]
})

module.exports = model('Pack', schema)
