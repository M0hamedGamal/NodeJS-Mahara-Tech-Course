const EventsEmitter = require('events')
const fs = require('fs')

const events = new EventsEmitter()

events.on('readFile', () => {
    console.log('Read file successfully')
})

events.once('writeFile', () => {
    console.log('Write file successfully')
})

events.off('unlinkFile', () => {
    console.log('Delete file successfully')
})

fs.writeFile('files/eventFile', 'This is a new event file', (err) => {
    if (err) return console.log(err)

    // This event will be call because it has ON for calling
    events.emit('writeFile')

    fs.readFile('files/eventFile', 'utf8', (err, data) => {
        if (err) return console.log(err)

        // This event won't be call again because it has ONCE for calling
        events.emit('writeFile')

        events.emit('readFile')
    })

    fs.unlink('files/eventFile', (err) => {
        if (err) return console.log(err)

        // This event won't be call because it has OFF for calling
        events.emit('unlinkFile')
    })
})
