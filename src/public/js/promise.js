function promiseCode(){
    const arr = [
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