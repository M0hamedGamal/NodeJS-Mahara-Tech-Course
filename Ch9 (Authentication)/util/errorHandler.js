const errorHandler = () => {

// Handle Synchronous Error
process.on('uncaughtException', err => {
    console.log('uncaught Exception')
    process.exit(1) // Stop the project
})

// Handle Asynchronous Error
process.on('unhandledRejection', err => {
    console.log('uncaught Promise Exception')
    process.exit(1) // Stop the project
})
}

module.exports = errorHandler
