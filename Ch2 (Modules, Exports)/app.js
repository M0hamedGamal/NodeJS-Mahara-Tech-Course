console.log('Hello from App file.')

const x = 4
const y = 6

const addingFn = () => {
    return x + y
}

const addingFromAnotherFileFn = (a, b) => {
    return a + b
}

console.log(addingFn())

module.exports = {
    exportedAddingFn: addingFromAnotherFileFn
}

console.log(module)

// exports.exportedAddingFn = addingFromAnotherFileFn