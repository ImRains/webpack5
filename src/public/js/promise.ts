function promiseCode(){
    let arr = [
        new Promise(() => {}),
        new Promise(() => {})
    ]

    arr.map(item => {
        console.log('rain',item)
    })
}

module.exports = {
    promiseCode
}