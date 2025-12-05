const greeting = (name) => {
    console.log(`Hello, ${name}`)
}

/**
 * In terminal: node greeting Gamal
 * process.argv[0] ==> node
 * process.argv[1] ==> greeting
 * process.argv[2] ==> Gamal
 *
 *
 **/
const userName = process.argv[2] // Gamal

greeting(userName)