const Ajv = require('ajv');

const schema = {
    type: 'object',
    required: ['color'],
    minProperties: 1,
    maxProperties: 1,
    properties: {
        color: { type: 'string' },
    }
}

const ajv = new Ajv();
module.exports = ajv.compile(schema);

