const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const { Schema } = mongoose


const circleSchema = new Schema({
    circle_name: {
        type: String,
        required: true,
        trim: true 
    },
    circle_type: {
        type: String,
        trim: true 
    },
    circle_id_code : {
        type: String,
        required: true,
        default : uuidv4()
    },
    squares: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

const Circle = mongoose.model('Circle', circleSchema)

module.exports = Circle