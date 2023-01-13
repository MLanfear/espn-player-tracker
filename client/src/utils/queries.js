import { gql } from '@apollo/client';

export const QUERY_USER = gql`
   {
    user {
        username
        players {
            ADD LOGIC HERE
        }
    }
   }
`
export const QUERY_ME = gql`
   {
    me {
        _id
        username
        players {
            ADD LOGIC HERE
        }

        player {
            _id
            playerTitle
            playerText
            createdBy

        }
    }
   }
`

export const QUERY_PLAYERS = gql`
     {
        players {
            _id
            playersTitle
            playersText
            createdBy
        }
     }
`
        