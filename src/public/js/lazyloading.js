

async function lazyLoading(){
    const { default:_ } = await import(/* webpackChunkName:"lodash" */'lodash')
    var element = document.createElement('div')
    element.innerHTML = _.join(['Hello','World'],',')
    return element
}

export default lazyLoading