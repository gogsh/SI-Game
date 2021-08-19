const { Router, response } = require('express')
const router = Router()
const config = require('config')
const Pack = require('../models/Pack/Pack')

const lobby = new Map()

router.post(
  '/createLobby',
  async (req, res) => {
    try {
      // Проверка на название
      console.log()
      res.status(200).json({message: 'лобби успешно создано'})
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'возникла ошибка'})
    }
  }
)

module.exports = router