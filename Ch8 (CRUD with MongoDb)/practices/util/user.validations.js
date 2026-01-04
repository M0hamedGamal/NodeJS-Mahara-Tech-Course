const Ajv = require('ajv');

const userSchema = {
    type: 'object',
    required: ['name', 'age'],
    minProperties: 2,
    maxProperties: 2,
    properties: {
        name: {
            type: 'string',
        },
        age: {
            type: 'number',
            minimum: 9,
            maximum: 100,
        }
    }
}

const ajv = new Ajv()
module.exports = ajv.compile(userSchema)
