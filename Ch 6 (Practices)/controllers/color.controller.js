const validator = require("../utils/color.validation");
const Color = require("../models/color.model");

const fetchColors = (req, res) => {
    Color.fetchColors((colors) => {
        res.json(colors)
        console.log('Colors are fetched successfully')
    })
}

const fetchColorById = (req, res) => {
    const id = Number(req.params.id);

    Color.fetchColorById(id, (color) => {

        if (!color) {
            res.status(404).send('No color found.');
            return;
        }

        res.json(color)
        console.log('A color is fetched successfully')
    })
}

const createNewColor = (req, res) => {
    const isValid = validator(req.body)

    if (!isValid) {
        res.status(400).send('Invalid color format.')
        return
    }

    const color = new Color(req.body);

    color.createColor(req.body, (color) => {
        if (!color) {
            res.status(400).send('Invalid color format.')
            return;
        }

        res.json(color)
        console.log('A new color is created successfully')
    })
}

const updateColor = (req, res) => {
    const isValid = validator(req.body)

    if (!isValid) {
        res.status(404).send('No color found.')
        return
    }

    const id = Number(req.params.id);

    Color.updateColor(id, req.body, (color) => {
        if (!color) {
            res.status(404).send('Invalid color format.')
            return;
        }

        res.json(color)
        console.log('A color is updated successfully')
    })

}

const deleteColor = (req, res) => {
    const id = Number(req.params.id);

    Color.deleteColor(id, (deletedColor) => {
        if (!deletedColor) {
            res.status(400).send('No color found.')
            return;
        }

        res.json(deletedColor)
    console.log('A color is deleted successfully')
    })
}

module.exports = {
    fetchColors,
    fetchColorById,
    createNewColor,
    updateColor,
    deleteColor
}