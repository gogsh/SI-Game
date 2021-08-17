const { Router, response } = require('express')
const router = Router()
const Pack = require('../models/Pack/Pack')
const config = require('config')


const JSZip = require("jszip"),
  zip = new JSZip(),
  fs = require('fs'),
  path = require('path'),
  convert = require('xml-js')


function generateNormalData(json) {
  const normalData = {
    info: null,
    rounds: []
  }
  const data = JSON.parse(json).package
  normalData.info = {
    author: data.info.authors.author._text,
    date: data._attributes.date,
    difficulty: data._attributes.difficulty,
    logo: data._attributes.logo,
    name: data._attributes.name,
    finalRound: null
  }
  data.rounds.round.forEach((round, index, arr) => {

    if (round._attributes.type === 'final') {
      const final = round.themes.theme
      let fixedFinal = {}
      if (Array.isArray(final)) {

        const themesArr = final.map(theme => {
          return {
            themeName: theme._attributes.name || 'NoName',
            question: {
              questionContent: Array.isArray(theme.questions.question.scenario.atom) ? theme.questions.question.scenario.atom : theme.questions.question.scenario.atom._text,
              answer: theme.questions.question.right.answer,
              price: theme.questions.question._attributes.price
            },
          }
        })
        fixedFinal = {
          FinalName: final?._attributes?.name || 'FINAL',
          themes: themesArr
        }
      } else {
        fixedFinal = {
          FinalName: final._attributes.name,
          question: {
            questionContent: Array.isArray(final.questions.question.scenario.atom) ? final.questions.question.scenario.atom : final.questions.question.scenario.atom._text,
            answer: final.questions.question.right.answer,
            price: final.questions.question._attributes.price,
          },
        }
      }
      normalData.finalRound = { ...fixedFinal }
      return
    }

    const themesArr = round.themes.theme.map(theme => {
      const questions = theme.questions.question.map(question => {
        return {
          questionContent: Array.isArray(question.scenario.atom)
            ? question.scenario.atom.map(item => { if (item._text) return item._text }).filter(item => item !== undefined)
            : question.scenario.atom._text,
          answer: question.right.answer,
          price: question._attributes.price
        }
      })
      return {
        themeName: theme._attributes.name,
        questions: questions,

      }
    })
    const fixedRound = {
      RoundName: round._attributes.name,
      themes: themesArr
    }
    normalData.rounds.push(fixedRound)
  })

  console.log(normalData)
  return JSON.stringify(normalData)
}


router.post(
  '/uploading',
  async (req, res) => {
    try {
      // Вытаскиваем название файла
      let fileName
      let jsonData
      let xmlData = null
      // Сохраняем
      fs.readdir('./uploads', (err, files) => {
        if (err) throw err;
        fileName = files[0]
        console.log(fileName)
        // Читаем
        fs.readFile(`./uploads/${fileName}`, async (err, data) => {
          if (err) throw err
          xmlData = await JSZip.loadAsync(data).then(function (zip) {
            try {
              // Вытаскиваем content.xml
              return zip.file('content.xml').async("string").then(function (data) {
                try {
                  return data
                } catch (error) {
                  console.log(error)
                }
              })
            } catch (error) {
              console.log('Ошибка на этапе чтения')
            }
          })
          // Конвертируем в JSON
          jsonData = convert.xml2json(xmlData, { compact: true })

          // TODO: Если есть картинки - загрузить на хостинг

          // Отправляем на сервер
          let normalData = generateNormalData(jsonData)
          res.status(201).json(normalData)

          // Удаляем
          fs.unlink(`./uploads/${fileName}`, err => {
            if (err) throw err
            console.log(`Файл ${fileName} успешно удалён`)
          })
        })
      })
    } catch (e) {
      res.status(500).json({ message: 'Something goes wrong, try again' })
    }
  }
)

router.post(
  '/save',
  async (req, res) => {
    try {
      const name = req.body.name
      const pack = new Pack({
        author: req.body.author,
        date: req.body.date,
        difficulty: req.body.difficulty,
        logo: req.body.logo,
        name: req.body.name,
        discription: req.body.discription,
        rounds: req.body.rounds,
        finalRound: req.body.finalRound,
        numberOfRounds: req.body.numberOfRounds,
        numberOfThemes: req.body.numberOfThemes,
        numberOfQuestions: req.body.numberOfQuestions,
        numberOfFinalThemes: req.body.numberOfFinalThemes
      })
      const isCreated = await Pack.findOne({ name })
      if (isCreated) {
        return res.status(400).json({ message: 'Пак с таким именем уже загружен' })
      } else {
        await pack.save()
        res.status(201).json({ message: 'Файл успешно сохранён' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Сохранить файл не удалось' })
    }
  }
)

module.exports = router