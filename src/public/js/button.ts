function addButton(){
    var btn = document.createElement('button');
    btn.innerHTML = '新增按钮'
    document.body.appendChild(btn)
    btn.onclick = function(){
        var div = document.createElement('div')
        div.innerHTML = 'item'
        div.classList.add('button_item')
        document.body.appendChild(div)
    }
}

module.exports = {
    addButton
}