const fs = require('fs')

// console.log(fs)
/**
 * Write, Read, Delete files
 * */

fs.writeFile('files/fileOneJSON.js', '{"msg": "Hello from FileOne!"}', (err) => {
    if (err) return console.log(err)

    console.log("Write successfully.");
})

fs.readFile('files/fileOneJSON.js', 'utf8', (err, data) => {
    if (err) return console.log(err)

    console.log("Read file one successfully.");
    console.log("Msg File One: ", JSON.parse(data).msg)
})

fs.appendFile('files/fileTwoTxt.txt', 'Hello from FileTwo!', (err) => {
    if (err) return console.log(err)

    console.log("Appended successfully.");
})

fs.appendFile('files/fileTwoTxt.txt', ' This is an appended message!', (err) => {
    if (err) return console.log(err)

    console.log("Appended successfully.");
})

fs.readFile('files/fileTwoTxt.txt', 'utf8', (err, data) => {
    if (err) return console.log(err)

    console.log("Read file two successfully.");
})

fs.unlink('files/fileOneJSON.js', (err) => {
    if (err) return console.log(err)

    console.log("Deleted successfully.");
})
/** ***************************************** */
/**
 * Write, Read, Delete Folders
 * */
fs.mkdir('newDir', (err) => {
    if (err) return console.log(err)
    console.log("Create a new directory successfully.");

    fs.readdir('newDir', (err, data) => {
        if (err) return console.log(err)

        console.log(data)
        console.log("Read directory successfully.");
    })
})

// Remove empty folder
fs.rmdir('files', (err) => {
    if (err) return console.log(err)

    console.log("Empty directory Deleted successfully.");
})

// Remove non-empty folder
fs.rm('filesOne', {recursive: true, force: true} ,(err) => {
    if (err) return console.log(err)

    console.log("Non-Empty directory Deleted successfully.");
})