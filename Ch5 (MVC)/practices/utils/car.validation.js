const Ajv = require('ajv')

const schema = {
    type: 'object',
    minProperties: 2,
    maxProperties: 2,
    required: ['type', 'class'],
    properties: {
        type: {
            type: 'string',
            pattern: '^[A-Za-z0-9]+( [A-Za-z0-9]+)*$',
            enum: ['Sedan', 'Hatchback', 'SUV', 'Van'],
        },
        class: {
            type: 'string',
            enum: ['A', 'B', 'C'],
            minLength: 1,
            maxLength: 1,
        }
    }
}

const ajv = new Ajv()
module.exports = ajv.compile(schema)
