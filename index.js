const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

const middleware = (req, res, next) => {
  const age = req.query.age
  if (typeof age === 'undefined') {
    return res.redirect('/')
  } else {
    return next()
  }
}

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('form')
})

app.post('/check', (req, res) => {
  const age = req.body.age
  if (age > 18) {
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})

app.get('/major', middleware, (req, res) => {
  const message = `Você é maior de idade e possui ${req.query.age} anos`
  return res.render('result', { message })
})

app.get('/minor', middleware, (req, res) => {
  const message = `Você é menor de idade e possui ${req.query.age} anos`
  return res.render('result', { message })
})

app.listen(3000)
