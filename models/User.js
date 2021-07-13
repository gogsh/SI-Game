const {Schema, model, Types} = require('mongoose')


// TODO: Расширить на никнейм и ссылка на аватар
const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  // test: {type: Number, required: false},
  links: [{type: Types.ObjectId, ref: 'Link'}]
})

module.exports = model('User', schema)