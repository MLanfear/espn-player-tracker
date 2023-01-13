const {gql} = require('apollo-server-express');


const typeDefs = gql`
    type User {
        _id: ID
        username: String
        player: [Players]
        statistics: [Stats]
    }
    type Query {
        users: [User]
        player: [Players]
        me: User
    }
    type Mutation {
        addUser(username: String!, password: String!): Auth
        addPlayers(playerTitle: String!, postText: String!): Players
        deletePlayers(playerId: String!): Players

        addNote(noteText: String!): User
        editNote(noteId: ID!,noteText: String!): User
        deleteNote(noteId: ID!): User

        deleteUser(_id: ID!): User
        loginUser(username: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;

