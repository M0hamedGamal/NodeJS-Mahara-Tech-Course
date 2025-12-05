require('./global')
const {exportedAddingFn} = require('./app');

console.log('Hello from Script file.')

const x = 7
const y = 8

const subtraction = () => {
    return y - x
}

console.log(subtraction())

console.log(exportedAddingFn(x, y))

console.log(global.appName)