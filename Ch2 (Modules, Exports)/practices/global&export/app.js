const {
    addFn,
    subFn,
    multiFn,
    divideFn
} = require('./functions.js')


const appName = global.appName
console.log('The application name is: ', appName)

console.log('Add 5 and 8 is: ', addFn(5, 8))
console.log('Sub 4 and 2 is: ', subFn(4, 2))
console.log('Multi 3 and 7 is: ', multiFn(3, 7))
console.log('Divide 100 and 5 is: ', divideFn(100, 5))

// node ./app.js Gamal
// Gamal
const name = process.argv[2]

console.log(`Welcome, Mr.${name}`)

