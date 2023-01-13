const {Schema, model} = require('mongoose');
const statsSchema = require('./Stats');

const playerSchema = new Schema(
    {
        player: {
            type: String,
            required: true,
            trim: true
        },
        //NEED NEW PLAYERS SCHEMA





        // postTitle: {
        //     type: String,
        //     required: 'You must include text in a post',
        //     minlength: 1,
        //     maxlength: 500
        // },
        // postText: {
        //     type: String,
        //     required: 'You must include text in a post',
        //     minlength: 1,
        //     maxlength: 500
        // },
        // createdBy: {
        //     type: String,
        //     required: true,
        //     references: {
        //         key: "username",
        //         model: "User"
        //     } 
        // },
        stats: [statsSchema]
    }
);

const Players = model('Players', playerSchema);

module.exports = Players;