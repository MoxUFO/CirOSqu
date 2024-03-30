const mongoose = require('mongoose')

const {Schema} = mongoose


const bioSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    birthday: {
        type: Schema.Types.Date,
        required: true,
    },
    fav_color: {
        type: String,
        required: true,
        trim: true
    },
    fav_food: {
        type:String,
        required: true,
        trim: true
    },
    fav_quote: {
        type: String,
        required: true,
        trim: true,
    },
    fav_movie: {
        type : String,
        required: true,
        trim: true
    },
    fav_tv_show : {
        type: String,
        required: true,
        trim: true 
    },
    fav_music_artist: {
        type: String,
        required: true,
        trim: true 
    },
    fav_song: {
        type: String,
        required: true,
        trim: true
    },
    hobby: {
        type: String,
        required: true,
        trim: true
    },
    github: {
        type: String,
        trim: true
    },
    linkedin: {
        type: String,
        trim: true 
    },
    twitter:{
        type : String,
        trim: true
    },


})

const Bio = mongoose.model('Bio', bioSchema)

module.exports = Bio