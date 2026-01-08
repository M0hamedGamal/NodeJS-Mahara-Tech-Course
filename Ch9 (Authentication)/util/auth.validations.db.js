const Ajv = require('ajv');
const addFormats  = require('ajv-formats')

const ajv = new Ajv()
addFormats(ajv)

// Shared Properties
const sharedProperties = {
    name: {
        type: 'string',
        minLength: 3,
        maxLength: 50
    },
    password: {
        type: 'string',
        minLength: 5
    },
    email: {
        type: 'string',
        format: 'email', // --> Using within ajv-formats lib
    }
}

// Register Schema
const registerSchema = {
    type: 'object',
    required: ['name', 'email', 'password'],
    additionalProperties: false,
    properties: sharedProperties
};

// Login Schema
const loginSchema = {
    type: 'object',
    required: ['email', 'password'],
    additionalProperties: false,
    properties: sharedProperties
}

module.exports = {
    registerValidator: ajv.compile(registerSchema),
    loginValidator: ajv.compile(loginSchema),
};
