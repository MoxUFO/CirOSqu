const mongoose = require('mongoose')

const { Schema } = mongoose


const circleSchema = new Schema({
    circle_name: {
        type: String,
        required: true,
        trim: true 
    },
    squares: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    circle_type: {
        type: String,
        trim: true 
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    circle_code : {
        type: Schema.Types.UUID,
        required: true
    }
})

userSchema.pre('save', async function(next){
    if(this.isNew || this.isModified('password') ){
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds)
    }

    next()
});

userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password,this.password);
    
}

const Circle = mongoose.model('Circle', circleSchema)

module.exports = Circle