const { Router, response } = require('express')
const router = Router()
const config = require('config')
const Pack = require('../models/Pack/Pack')
const ObjectId = require('mongodb').ObjectID

router.post(
  '/allPacks',
  async (req, res) => {
    try {
      const packs = await Pack.find({})
      res.status(200).json(packs)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'возникла ошибка' })
    }
  }
)

router.post(
  '/singlePack',
  async (req, res) => {
    try {
      const {id} = req.body
      const packs = await Pack.findOne({"_id": new ObjectId(id)})
      res.status(200).json(packs)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'возникла ошибка' })
    }
  }
)

module.exports = router