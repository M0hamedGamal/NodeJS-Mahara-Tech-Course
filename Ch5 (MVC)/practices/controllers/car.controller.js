const validate = require('../utils/car.validation')
const Car = require('../models/car.model')

const data = [
    {id: 1, type: 'Sedan', class: 'A'},
    {id: 2, type: 'Hatchback', class: 'A'},
    {id: 3, type: 'SUV', class: 'C'},
    {id: 4, type: 'Van', class: 'B'},
]

const fetchAllCars = (req, res) => {
    Car.fetchAllCars((cars) => {
        res.json(cars)
        console.log('Cars are fetched successfully')
    })
}

const fetchCar = (req, res) => {
    const id = Number(req.params.id)

    Car.fetchCar(id, (car) => {

        if (!car) {
            res.status(404).send('No Cars')
            return
        }

        res.json(car)
        console.log('A Car is fetched successfully')
    })
}

const createCar = (req, res) => {
    const isValid = validate(req.body)

    if (!isValid) {
        res.status(400).send('Data is invalid')
        return
    }

    const car = new Car(req.body)

    car.createCar((newItem) => {
        res.json(newItem)
        console.log('A new Car is created successfully')
    })
}

const updateCar = (req, res) => {
    const isValid = validate(req.body)

    if (!isValid) {
        res.status(400).send('Data is invalid')
        return;
    }

    const id = Number(req.params.id)

    Car.updateCar(id, req.body, (updatedCar) => {
    if (!updatedCar) {
        res.status(404).send('No Cars')
        return
    }

    res.json(updatedCar)
    console.log('A Car is updated successfully')
    })
}

const deleteCar = (req, res) => {
    const id = Number(req.params.id)

    Car.deleteCar(id, (deletedCar) => {
    if (!deletedCar) {
        res.status(404).send('No Cars')
        return
    }

    res.json(deletedCar)
    console.log('A Car is deleted successfully')
    })
}

module.exports = {
    fetchAllCars,
    fetchCar,
    createCar,
    updateCar,
    deleteCar
}