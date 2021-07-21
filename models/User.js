const {Schema, model, Types} = require('mongoose')


// TODO: Расширить на никнейм и ссылка на аватар
const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  nickname:{type: String, required: true},
  avatarLink: {type: String, required: true},
  links: [{type: Types.ObjectId, ref: 'Link'}]
})

module.exports = model('User', schema)