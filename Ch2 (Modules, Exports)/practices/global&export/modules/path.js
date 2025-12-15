const path = require('path')

// console.log(path)

console.log(__dirname)
console.log(__filename)

const basename = path.basename(__filename)
console.log(basename)

const extFile = path.extname(basename)
console.log(extFile)

const newPath = path.join(__dirname, 'abc.js')
console.log(newPath)

const parseFile = path.parse(__filename)
console.log(parseFile)