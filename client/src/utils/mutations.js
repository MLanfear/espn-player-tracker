import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation loginUser($username: String!, $password: String!) {
        loginUser( username: $username, password: $password) {
            token
            user {
                _id
            }
        }    
    }

`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!) {
        addUser(username: $username, password: $password) {
            token
            user {
                _id
            }
        }    
    }
`;

export const ADD_PLAYERS = gql`
    mutation addPlayers($playerTitle: String!, $playerText: String!) {
    addPlayers(playerTitle: $playerTitle, playerText: $playerText) {
    playerText
    playerTitle
  }
}
`
export const DELETE_PLAYERS = gql`
  mutation DeletePlayers($playerId: String!) {
    deletePlayers(postId: $playerId) {
      _id
      playerText
      playerTitle
    }
  }
`;

