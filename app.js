const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'SoftEdigi - Professional Software Development & Digital Solutions', 
    page: 'home' 
  });
});

app.get('/about', (req, res) => {
  res.render('about', { 
    title: 'About Us - SoftEdigi', 
    page: 'about' 
  });
});

app.get('/services', (req, res) => {
  res.render('services', { 
    title: 'Our Services - SoftEdigi', 
    page: 'services' 
  });
});

app.get('/portfolio', (req, res) => {
  res.render('portfolio', { 
    title: 'Our Portfolio - SoftEdigi', 
    page: 'portfolio' 
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', { 
    title: 'Contact Us - SoftEdigi', 
    page: 'contact' 
  });
});

// Service routes
app.get('/services/web-design', (req, res) => {
  res.render('services/web-design', { 
    title: 'Professional Web Design Services | SoftEdigi', 
    page: 'services' 
  });
});

app.get('/services/web-development', (req, res) => {
  res.render('services/web-development', { 
    title: 'Custom Web Development Services | SoftEdigi', 
    page: 'services' 
  });
});

app.get('/services/mobile-apps', (req, res) => {
  res.render('services/mobile-apps', { 
    title: 'Mobile App Development Services | SoftEdigi', 
    page: 'services' 
  });
});

app.get('/services/digital-marketing', (req, res) => {
  res.render('services/digital-marketing', { 
    title: 'Digital Marketing Services | SoftEdigi', 
    page: 'services' 
  });
});

// Blog routes
app.get('/blog', (req, res) => {
  res.render('blog/index', { 
    title: 'Blog - SoftEdigi', 
    page: 'blog' 
  });
});

// Contact form handler
app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body
  console.log('Contact form submission:', { name, email, subject, message })
  res.redirect('/contact?success=true')
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render('error', { 
    title: 'Error - SoftEdigi', 
    page: 'error',
    error: process.env.NODE_ENV === 'production' ? {} : err 
  })
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { 
    title: 'Page Not Found - SoftEdigi', 
    page: '404' 
  });
});

app.listen(PORT, () => {
  console.log(`SoftEdigi server running on port ${PORT}`);
});

