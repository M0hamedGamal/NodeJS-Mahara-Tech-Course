const fs = require('fs');
const path = require('path');

const colorPath = path.join(__dirname, '../data/color.json');

class Color {
    constructor({color}) {
        this.color = color;
    }

    static fetchColors(callback) {
        fs.readFile(colorPath, 'utf8', (err, data) => {
            if (err) return console.error(err);

            callback(JSON.parse(data))
        })
    }

    static fetchColorById(id, callback) {
        fs.readFile(colorPath, 'utf8', (err, data) => {
            if (err) return console.error(err);

            const colors = JSON.parse(data);

            const idx = colors.findIndex(color => color.id === id);

            if (idx === -1) {
                callback(undefined);
                return
            }

            callback(colors[idx])
        })
    }

    createColor(newColorData, callback) {
        fs.readFile(colorPath, 'utf8', (err, data) => {
            if (err) return console.error(err);

            const colors = JSON.parse(data);

            const newColor = {
                ...newColorData,
                id: colors.length + 1,
            }

            colors.push(newColor);

            fs.writeFile(colorPath, JSON.stringify(colors), (err, data) => {
                if (err) return console.error(err);

                callback(newColor)
            })
        })
    }

    static updateColor(id, updatedColorData, callback) {
        fs.readFile(colorPath, 'utf8', (err, data) => {
            if (err) return console.error(err);

            const colors = JSON.parse(data);
            const idx = colors.findIndex(color => color.id === id);

            if (idx === -1) {
                callback(undefined);
                return
            }

            for (let i in updatedColorData) {
                colors[idx][i] = updatedColorData[i]
            }

            fs.writeFile(colorPath, JSON.stringify(colors), (err, data) => {
                if (err) return console.error(err);

                callback(colors[idx])
            })
        })
    }

    static deleteColor(id, callback) {
        fs.readFile(colorPath, 'utf8', (err, data) => {
            if (err) return console.error(err);

            const colors = JSON.parse(data);
            const idx = colors.findIndex(color => color.id === id);

            if (idx === -1) {
                callback(undefined);
                return
            }

            const deletedColor = colors.splice(idx, 1)[0]

            fs.writeFile(colorPath, JSON.stringify(colors), (err, data) => {
                if (err) return console.error(err);

                callback(deletedColor)
            })
        })
    }

}

module.exports = Color;