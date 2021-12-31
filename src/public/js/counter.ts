function counter() {
    var div = document.createElement('div')
    div.setAttribute('id','counter')
    div.innerHTML = '1';
    div.onclick = function(){
        div.innerHTML = String(parseInt(div.innerHTML,10) + 1)
    }
    document.body.appendChild(div)
}

module.exports  = {
    counter
}