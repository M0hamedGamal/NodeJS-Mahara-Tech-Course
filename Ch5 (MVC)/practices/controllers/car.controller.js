const validate = require('../utils/car.validation')

const data = [
    {id: 1, type: 'Sedan', class: 'A'},
    {id: 2, type: 'Hatchback', class: 'A'},
    {id: 3, type: 'SUV', class: 'C'},
    {id: 4, type: 'Van', class: 'B'},
]

const fetchAllCars = (req, res) => {
    res.json(data)
    console.log('Cars are fetched successfully')
}

const fetchCar = (req, res) => {
    const id = Number(req.params.id)

    const idx = data.findIndex(car => car.id === id)

    if (idx === -1) {
        res.status(404).send('No Cars')
        return
    }

    res.json(data[idx])
    console.log('A Car is fetched successfully')
}

const createCar = (req, res) => {
    const isValid = validate(req.body)

    if (!isValid) {
        res.status(400).send('Data is invalid')
        return
    }

    const newItem = req.body

    newItem.id = data.length + 1

    data.push(newItem)

    res.json(newItem)
    console.log('A new Car is created successfully')
}

const updateCar = (req, res) => {
    const id = Number(req.params.id)

    const idx = data.findIndex(car => car.id === id)

    if (idx === -1) {
        res.status(404).send('No Cars')
        return
    }

    const isValid = validate(req.body)

    if (!isValid) {
        res.status(400).send('Data is invalid')
        return;
    }

    for (let i in req.body) {
        data[idx][i] = req.body[i]
    }

    res.json(data[idx])
    console.log('A Car is updated successfully')
}

const deleteCar = (req, res) => {
    const id = Number(req.params.id)

    const idx = data.findIndex(car => car.id === id)

    if (idx === -1) {
        res.status(404).send('No Cars')
        return
    }

    const deletedItem = data.splice(idx, 1)[0]

    res.json(deletedItem)
    console.log('A Car is deleted successfully')
}

module.exports = {
    fetchAllCars,
    fetchCar,
    createCar,
    updateCar,
    deleteCar
}