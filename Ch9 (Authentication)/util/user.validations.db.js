const Ajv = require('ajv');

const userSchema = {
    type: 'object',
    required: ['id', 'name', 'age'],
    additionalProperties: false,
    properties: {
        id: {type: 'number'},
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
