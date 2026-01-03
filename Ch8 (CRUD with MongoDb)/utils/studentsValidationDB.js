const Ajv = require('ajv')

const schema = {
    type: 'object',
    properties: {
        id: {
            type: 'number',
        },
        fn: {
            type: 'string',
            pattern: '^[A-Z][a-z]*$'
        },
        ln: {
            type: 'string',
            pattern: '^[A-Z][a-z]*$'
        },
        dept: {
            type: 'string',
            maxLength: 2,
            minLength: 2
        },
    },
    required: ['id', 'fn', 'ln', 'dept'],
}

const ajv = new Ajv()
module.exports = ajv.compile(schema)