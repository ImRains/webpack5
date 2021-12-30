// import './public/css/style.css'
// import { component } from './public/js/comment'
// document.body.appendChild(component());

// import { addButton } from './public/js/button'
// addButton();

// import { counter } from './public/js/counter'
// import { number } from './public/js/number'
// counter()
// number()

// import { promiseCode } from './public/js/promise'
// promiseCode()

require('./public/css/style.css')
const { component } = require('./public/js/comment')
const { addButton } = require('./public/js/button')
// const { counter } = require('./public/js/counter')
const { number } = require('./public/js/number')



document.body.appendChild(component());
addButton();


// counter()
number()

const { promiseCode } = require('./public/js/promise')
promiseCode()