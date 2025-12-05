// Path
const path = require('path')

// Directory path Only
console.log(__dirname)

// Directory path + current file name
console.log(__filename)

// File name only
const fileName = path.basename(__filename)
console.log(fileName)

// Directory path + current file name as (__filename)
const currentFilePath = path.join(__dirname, fileName)
console.log(currentFilePath)

// Directory path + new file name
const newFilePath = path.join(__dirname, 'abc.js')
console.log(newFilePath)

// File Extension
const fileExtension = path.extname(fileName)
console.log(fileExtension)

// File Parsing
const fileParsing = path.parse(currentFilePath)
console.log(fileParsing)

