const { Router, response } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const router = Router()
const User = require('../models/User')



// /api/auth/register
router.post(
  '/register', 
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля символов')
      .isLength({min: 6})
  ],
  async (req, res) => {
  try {


    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некоректные данные при регистрации'
      })
    }

    const { email, password, nickname, avatarLink } = req.body
    const candidate = await User.findOne({ email })
    if(candidate) {
      return res.status(400).json({message: 'Такой пользователь уже существует'})
    }
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new User({
      email, password : hashedPassword, nickname, avatarLink
    })
    await user.save()
    res.status(201).json({message: 'Пользователь создан'})

  } catch (e) {
    res.status(500).json({ message: 'Something goes wrong, try again' })
  }
})

// /api/auth/login
router.post(
  '/login', 
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
    try {

      const errors = validationResult(req)

      if(!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некоректные данные при входе в систему'
        })
      }
      const {email, password} = req.body
      const user = await User.findOne({ email })
      if(!user) {
        return res.status(400).json({message: 'пользователь не найден '})
      }
      
      const isMatch = await bcrypt.compare(password, user.password)

      if(!isMatch) {
        return res.status(400).json({message: 'неверный пароль, попробуйте снова'})
      }
      
      const token = jwt.sign(
        { user: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )
      res.json({ token, userId: user.id, nickname: user.nickname, avatarLink: user.avatarLink })


  
    } catch (e) {
      res.status(500).json({ message: 'Something goes wrong, try again' })
    }
})

module.exports = router