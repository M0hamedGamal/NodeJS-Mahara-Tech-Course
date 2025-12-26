const fs = require('fs');
const path = require('path');

const carDbPath = path.join(__dirname, '../data/cars.json');

class Car {
    constructor({type: carType, class: carClass}) {
        this.type = carType
        this.class = carClass
    }

    static fetchAllCars(callback) {

        fs.readFile(carDbPath, 'utf8', (err, data) => {
            if (err) return console.log(err)

            const carsJson = JSON.parse(data)

            callback(carsJson)
        })
    }

    static fetchCar(id, callback) {
        fs.readFile(carDbPath, 'utf8', (err, data) => {
            if (err) return console.log(err)

            const carsJson = JSON.parse(data)

            const idx = carsJson.findIndex(car => car.id === id)

            if (idx === -1) {
                callback(undefined)
                return
            }

            callback(carsJson[idx])
        })
    }

    createCar(callback) {
        fs.readFile(carDbPath, 'utf8', (err, data) => {
            if (err) return console.log(err)

            const carsJson = JSON.parse(data)

            this.id = carsJson.length + 1

            carsJson.push(this)

            fs.writeFile(carDbPath, JSON.stringify(carsJson), (err) => {
                if (err) return console.log(err)

                callback(this)
            })
        })
    }

    static updateCar(id, updatedData, callback) {
        fs.readFile(carDbPath, 'utf8', (err, data) => {
            if (err) return console.log(err)

            const carsJson = JSON.parse(data)

            const idx = carsJson.findIndex(car => car.id === id)

            if (idx === -1) {
                callback(undefined)
                return
            }

            for (let i in updatedData) {
                carsJson[idx][i] = updatedData[i]
            }

            fs.writeFile(carDbPath, JSON.stringify(carsJson), (err) => {
                if (err) return console.log(err)

                callback(carsJson[idx])
            })
        })
    }

    static deleteCar(id, callback) {
        fs.readFile(carDbPath, 'utf8', (err, data) => {
            if (err) return console.log(err)

            const carsJson = JSON.parse(data)
            const idx = carsJson.findIndex(car => car.id === id)

            if (idx === -1) {
                callback(undefined)
                return
            }

            const deletedCar = carsJson.splice(idx, 1)[0]

            fs.writeFile(carDbPath, JSON.stringify(carsJson), (err) => {
                if (err) return console.log(err)

                callback(deletedCar)
            })
        })
    }

}

module.exports = Car;