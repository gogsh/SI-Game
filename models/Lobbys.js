const {Schema, model, Types} = require('mongoose')


// TODO: Расширить на никнейм и ссылка на аватар
const schema = new Schema({
  from: {type: string, required: true},
  
})

module.exports = model('Lobbys', schema)