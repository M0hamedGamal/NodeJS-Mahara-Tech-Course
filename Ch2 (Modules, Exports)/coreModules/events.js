const EventsEmitter = require('events')

const myEvents = new EventsEmitter()

/**
 * Note: Events are sync [Fire 2, 1, 3]
 * on => Activate the event
 * once => Activate the event for one time only
 * off => Deactivate the event
 * emit => Fire the event
 * */

myEvents.once('Lookup', () => {
    console.log('Lookup #2')
})

myEvents.on('Lookup', () => {
    console.log('Lookup #1')
})

const listenerNum3 = () => {
    console.log('Lookup #3', listenerNum3)
}

myEvents.on('Lookup', listenerNum3)

myEvents.emit('Lookup')

console.log('--------------------------------------')

myEvents.emit('Lookup')

console.log('--------------------------------------')

setTimeout(() => {
    myEvents.off('Lookup', listenerNum3)

    myEvents.emit('Lookup')
}, 1000)

