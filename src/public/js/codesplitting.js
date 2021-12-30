const _ = require('lodash')

function lodash_console(){
    console.log(_.join(['a','b','c'],'***'))
}

module.exports = {
    lodash_console
}