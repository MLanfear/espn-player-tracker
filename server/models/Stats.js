const {Schema} = require('mongoose');
 const statsSchema = new Schema(
    {
    // This is where the stat API calls will go
        player: {
            type: String,
            
            required: true,
            trim: true
        },
        amount:{
            type: Number,
            required: true
        },
        units:{
            type: String,
            required: true,
            trim:true
        },
        reps:{
            type: Number,
            required: true
        },
        sets:{
            type: Number,
            required: true
        },
    }
);



module.exports = statsSchema;