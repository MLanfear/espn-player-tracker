const {Schema} = require('mongoose');
 const watchSchema = new Schema(
    {
        watchText: {
            type: String,
            required: true,
            trim: true
        },
    }
 )


 module.exports = watchSchema;