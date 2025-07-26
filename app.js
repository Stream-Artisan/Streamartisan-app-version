const express = require('express')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000

// Set view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Use express-ejs-layouts
app.use(expressLayouts)
app.set('layout', 'layout')

// Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.get('/', (req, res) => {
  res.render('home', { title: 'StreamArtisan - Home', page: 'home' })
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us - StreamArtisan', page: 'about' })
})

app.get('/services', (req, res) => {
  res.render('services', { title: 'Our Services - StreamArtisan', page: 'services' })
})

app.get('/portfolio', (req, res) => {
  res.render('portfolio', { title: 'Portfolio - StreamArtisan', page: 'portfolio' })
})

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us - StreamArtisan', page: 'contact' })
})

app.get('/get-started', (req, res) => {
  res.render('get-started', { title: 'Get Started - StreamArtisan', page: 'get-started' })
})

// Contact form handler
app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body
  console.log('Contact form submission:', { name, email, subject, message })
  res.redirect('/contact?success=true')
})

app.listen(port, () => {
  console.log(`StreamArtisan app listening on port ${port}`)
})