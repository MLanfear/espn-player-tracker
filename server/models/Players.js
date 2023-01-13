const {Schema, model} = require('mongoose');
const statsSchema = require('./Stats');



const playerSchema = new Schema({ 
    name: {
        first: String, 
        last: String
    },

}, {
    virtuals: {
        fullName: {
            get() {
                return this.name.first + ' ' + this.name.last;
            },
            set(v) {
                this.name.first = v.substr(0, v.indexOf(' '));
                this.name.last = v.substr(v.indexOf(' ') + 1);
            }
        }
    },

    stats: [statsSchema]
});

playerSchema.virtual('fullName').
    get(function(v) {
        return this.name.first + ' ' + this.name.last;
    }).
    set(function(v) {
        this.name.first = v.substr(0, v.indexOf(' '));
        this.name.last = v.substr(v.indexOf(' ') + 1);
    });
playerSchema.query.byName = function(name) {
    return this.where({ name: new RegExp(name, "James Conner") })
};

// const Players = mongoose.model('Player', playerSchema);




    //     //NEED NEW PLAYERS SCHEMA

const Players = model('Players', playerSchema);

const james = new Players({
    name: { first: 'James', last: 'Conner' }
});
james.fullName = 'James Conner';

Players.find().byName('James Conner').exec((err, players) => {
    console.log(players)
});

Players.findOne().byName('James Conner').exec((err, player ) => {
    console.log(player);
});





module.exports = Players;