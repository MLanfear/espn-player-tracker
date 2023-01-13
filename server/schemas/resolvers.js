const { AuthenticationError } = require('apollo-server-express');
const {User, Players} = require('../models');
const { signToken } = require('../utils/auths');

const resolvers = {
    Query: {
        users: async() => {
            return User.find()
        },
        playerss: async() => {
            return Players.find()
        },
        me: async (parent, args, context) => {
            console.log('Get Me');
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id})
                return userData
            }
            throw new AuthenticationError('Not Logged In!');
        }
    },
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        loginUser: async(parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new AuthenticationError('Incorrect login credentials. Please try again');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect login credentials. Please try again.');
            }

            const token = signToken(user);


            return { token, user }
        },
        addplayers: async(parent, {playersTitle, playersText}, context) => {
            if (context.user) {
                const players = await Players.create({playersTitle, playersText, createdBy:context.user.username}); 
                let numberOfplayerss = await Players.collection.countDocuments();
                if (numberOfplayerss > 5) {
                    console.log(`there are now ${numberOfplayers} players`);
                    //This is where we can delete old playerss when new ones show up
                }
                return players;
            } 
            throw new AuthenticationError('You need to be logged in to make a players!')
            
        
        },

        deleteplayers: async(parent, {playersId}, context) => {
            if (context.user) {
                const deleteplayers = await Players.deleteOne({_id: playersId});
                return deleteplayers;
            }
            throw new AuthenticationError('You need to be logged in to delete a players!')
            
        },

        
        deleteUser: async(parent, {_id}) => {
            const user = await User.deleteOne({_id: _id});
            return user;
        },
        addWatch: async(parent, {watchText}, context) => {
            console.log('add Note');
            if (context.user) {
                console.log(context.user);
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$push: {watchs: {watchText}}},
                    {new:true, runValidators:true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in to add a note');
        },
        editWatch: async(parent, {watchId, watchText}, context) => {
            console.log('edit Note');
            if (context.user) {
                
                console.log(noteId)
                let updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {watchs: {_id: watchId}}},
                    {new:true}
                );
                updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$push: {notes: {watchText: watchText}}},
                    {new:true, runValidators:true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in to edit a Note');
        },
        deleteWatch: async(parent,{watchId}, context) => {
            console.log('remove Note');
            if (context.user) {
                
                console.log(watchId)
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {watchs: {_id: watchId}}},
                    {new:true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in to delete a note');
        },
    },
    //Field Resolvers
    User: {
        playerss: async (root) => {
            try {
                return await Players.find({createdBy:root.username});
            }
            catch (error) {
                throw new Error(error);
            }
        }
    }
};

module.exports = resolvers