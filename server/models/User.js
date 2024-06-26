const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    innerCircle: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            unique: true
        }
    ]
});

userSchema.pre('save', async function(next){
    if(this.isNew || this.isModified('password') ){
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds)
    }

    next()
});

userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema);

module.exports = User


