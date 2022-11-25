const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const randomUrl = require('../../randomUrl')
const localhost = 'http://localhost:3000'

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const longUrl = req.body.url

  Url.findOne({ longUrl })
    .lean()
    .then(urls => {
      // 如果有一樣的 longUrl，請回傳相對應的短網址
      if (urls) {
        const shortUrl = `${urls.shortUrl}`
        res.render('index', { longUrl, shortUrl })
      } else {
        // 如果沒有，創造新的短網址
        const shortUrl = `${localhost}/` + randomUrl()
        // 如果有重複的短網址，再重新製造短網址比對
        if (shortUrl === Url.find({ shortUrl })) {
          return
        } else {
          // 如果沒有重複，建立資料
          Url.create({ longUrl, shortUrl })
            .lean()
            .then(() => res.render('index', { longUrl, shortUrl }))
            .catch(error => console.log(error))
        }
      }
    })
    .catch(error => console.log(error))
})

router.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl
  Url.findOne({ shortUrl })
    .lean()
    .then((urls) => {
      if (!urls) {
        res.redirect('/')
      } else {
        res.redirect(urls.longUrl)
      }
    })

    .catch(error => console.log(error))
})

module.exports = router