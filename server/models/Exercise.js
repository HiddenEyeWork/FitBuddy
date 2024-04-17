const { Schema } = require('mongoose');

const exerciseSchma = new Schema({
    exerciseId: {
        type: String,
        required: true
    },
    bodyPart: {
        type: String,
        required: true
    },
    gifUrl: {
        type: String,
        required: true
    },
    equipment: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    secondaryMuscles: [
        {
            type: String
        }
    ],
    instructions: [
        {
            type: String
        }
    ]
})

module.exports = exerciseSchma;