// fs
const fs = require('fs')

/**
 * Read Sync File
 * Using Sync Way
 * To encode the data use utf8, utf-8 or data.toString()
 * Return data
 * Error if file doesn't exist
 ***/
 const data = fs.readFileSync('./texts/greetingFile.txt', 'utf8')
console.log(data) //data.toString()

/**
 * Read File
 * Using Async Way
 * To encode the data use utf8, utf-8 or data.toString()
 * Use the utf8 just for knowing its position
 * Return void
 * Error if file doesn't exist
 ***/
fs.readFile('./texts/greetingFile.txt', 'utf8', (err, data) => {
    if (err) return console.log('Error: ', err)
    console.log('Msg: ', data.toString())
})
/////////////////////////////////////////////
/**
 * Write File
 * Using Async Way
 * Case1: If the file name doesn't exist, it will create a new one.
 * Case2: If the file name exists, it will delete all typed data in it and start from the beginning
 ***/
fs.writeFile('./texts/writeFile.txt', 'This is a New File!', (err) => {
    if (err) return console.log('Error: ', err)
})

/**
 * Append File
 * Using Async Way
 * Case1: If the file name doesn't exist, it will create a new one.
 * Case2: If the file name exists, it will append the new text with all typed data in it
 ***/
fs.appendFile('./texts/appendFile.txt', ' Hello from the file 1', (err) => {
    if (err) return console.log('Error: ', err)
})
/////////////////////////////////////////////
/**
 * Read + Write File
 * Using Async Way
 * We need to write before read
 ***/
fs.writeFile('./texts/secretFile.txt' ,'Shhh, this is a secret', 'utf8',(err) => {
    if (err) return console.log('Error: ', err)

    fs.readFile('./texts/secretFile.txt', 'utf8', (err, data) => {
        if (err) return console.log('Error: ', err)
        console.log('Secret is:', data)
    })
})
/////////////////////////////////////////////
/**
 * Delete File
 * Using Async Way
 * Error if file doesn't exist
 ***/
fs.unlink('./texts/writeFile.txt', (err) => {
    if (err) return console.log('Error: ', err)
})
/////////////////////////////////////////////
/**
 * Create a new Directory
 * Error if folder exists
 ***/
fs.mkdir('./newDir', (err) => {
    if (err) return console.log('Error: ', err)

    // You can Change directory with [ process.chdir('./newDir') ]
    fs.writeFile('./newDir/newText.txt', 'This text is into a newDir folder', (err) => {
        if (err) return console.log('Error: ', err)
    })
})
/////////////////////////////////////////////
/**
 * Read a Directory
 * Error if folder doesn't exist
 ***/
fs.readdir('./newDir', (err, files) => {
    if (err) return console.log('Error: ', err)
    console.log(files)
})
/////////////////////////////////////////////
/**
 * Remove an empty Directory
 * Error if folder doesn't exist
 ***/
fs.rmdir('./newDir', (err) => {
    if (err) return console.log('Error: ', err)
})

/**
 * Remove a Directory that contains files or subfolders.
 * recursive: true => deletes folder and everything inside
 * force: true => ignores errors like missing folders/files
 ***/
fs.rm('./newDir', {recursive: true, force: true}, (err) => {
    if (err) return console.log('Error: ', err)
})