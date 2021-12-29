require('./public/css/style.css')
const { component } = require('./public/js/comment')
document.body.appendChild(component());

const { addButton } = require('./public/js/button')
addButton();

const { counter } = require('./public/js/counter')
const { number } = require('./public/js/number')
counter()
number()

const { promiseCode } = require('./public/js/promise')
promiseCode()