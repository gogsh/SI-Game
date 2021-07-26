const { Router, response } = require('express')
const router = Router()


router.post(
  '/uploading',
  async(req, res) => {
    try {
      console.log('data:', req.file )
      res.status(201).json({message: 'Файл получен сервером'})
    } catch (e) {
      res.status(500).json({ message: 'Something goes wrong, try again' })
    }
  }
)

module.exports = router