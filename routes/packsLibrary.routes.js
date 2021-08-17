const { Router, response } = require('express')
const router = Router()
const config = require('config')
const Pack = require('../models/Pack/Pack')

router.post(
  '/allPacks',
  async (req, res) => {
    try {
      const packs = await Pack.find({})
      res.status(200).json(packs)
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'возникла ошибка'})
    }
  }
)

module.exports = router