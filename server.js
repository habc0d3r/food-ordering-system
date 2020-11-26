const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressEjsLayouts = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000

app.use(express.static('public'))

//* set template engine
app.use(expressEjsLayouts)
app.set('views', path.join(__dirname + '/resources/views'))
app.set('view engine', 'ejs')

app.get("/", (req, res) => {
    res.render('home')
})

app.get("/cart", (req, res) => {
    res.render('customers/cart')
})

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
})