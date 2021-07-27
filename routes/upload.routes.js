const { Router, response } = require('express')
const router = Router()

const JSZip = require("jszip"),
  zip = new JSZip(),
  fs = require('fs'),
  path = require('path'),
  convert = require('xml-js')



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
          jsonData = convert.xml2json(xmlData, {compact: true})

          // TODO: Если есть картинки - загрузить на хостинг

          // Отправляем на сервер
          res.status(201).json(jsonData)

          // Удаляем
          fs.unlink(`./uploads/${fileName}`, err => {
            if (err) throw err
            console.log(`Файл ${fileName} успешно удалён`)
          })
        })        
      })

      console.log('data:', req.file)

      

    } catch (e) {
      res.status(500).json({ message: 'Something goes wrong, try again' })
    }
  }
)

module.exports = router