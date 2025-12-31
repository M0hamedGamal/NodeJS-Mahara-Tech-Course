const Ajv = require('ajv')

const schema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            pattern: '^[A-Z][a-z]*$'
        },
        dept: {
            type: 'string',
            enum: ['SD', 'MD', 'SA'],
            maxLength: 2,
            minLength: 2
        },
    },
    required: ['name', 'dept'],
    maxProperties: 2,
    minProperties: 2,
}

const ajv = new Ajv()
module.exports = ajv.compile(schema)