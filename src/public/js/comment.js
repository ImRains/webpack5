const Img = require('../img/rain.jpg')
function component() {
    const element = document.createElement('div');

    // lodash 在当前 script 中引用
    element.innerHTML = 'hello webpack!';

    const myIcon = new Image();
    myIcon.src = Img.default;

    element.appendChild(myIcon);

    return element;
}

module.exports = {
    component
}