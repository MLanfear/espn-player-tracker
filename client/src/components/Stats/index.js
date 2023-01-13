import { Client } from 'espn-fantasy-football-api'; // web
import React, { useState } from 'react';
import $ from 'jquery';
import { ADD_EXERCISE } from '../../utils/mutations';
import { QUERY_ME } from "../../utils/queries";
import { useMutation, useQuery } from '@apollo/client';


// import { ... } from 'espn-fantasy-football-api/node'; // node
// import { ... } from 'espn-fantasy-football-api/web-dev'; // web development build
// import { ... } from 'espn-fantasy-football-api/node-dev'; // node development build

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';





const myClient = new Client({ leagueId: EliteMisfits });

myClient.setCookies({ espnS2: 'AECCZDKF0iqql%2F9y3X46jyBx4V8S%2FQh5g2DcjhqRNj7V8zZEggoY2R0On8gYkICAmUZ%2F0emh0RX9q9m45skG5EMN%2FUtQ78tYWKNa5zgxy7My7Z3klB8CL4go3tqYGriO%2F09rqGeVieYw%2FgR7NozudhXtyd83WpatzFJLNhiFA7tEWQLO5DfepOMao7mPFYq7nrJkTx%2BnF8PeVljY0MQVdxjrrwCTfUsM2AYPHwnnjFsso3ZGUSjZ%2FFAT8fjWTbuPNnMTjXxTfmrYCqJFs%2FhEzyOoi3DS383EtW4rRODAtfa9GA%3D%3D', SWID: '{AC0C0C7A-FFA0-47EB-BE6A-0BC22D14A99D}' });
// const urlKey = '7024013eb7e545f98113c27f633eda1n';

// const url = 'https://api.sportsdata.io/v3/nfl/scores/json/Player/{playerid}' {
//     apiKey = urlKey
// };
export function Players(props) {
    const [ results, setResults] = useState([]);

    const { data } = useQuery(QUERY_ME);
    console.log(data);

    const [addPlayer] = useMutation(ADD_PLAYER, {
        update(cache, { data: { addPlayer } }) {
            try {
                const { me } = cache.readQuery({ query: QUERY_ME });
                console.log(me);
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, players: addPlayer.players } }
                });
            } catch (error) {
                console.log(error);
            }
        }
    });



    // Modal Funcs

    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => {
        if (document.body.style.overflow !== 'hidden') {
            document.body.style.overflow = "hidden";
            document.body.style.height = "100%";
        }
        else {
            document.body.style.overflow = "auto";
            document.body.style.height = "auto";
        };
        setModalOpen(!modalOpen);
    }


    async function callApi(playerid) {
        $.ajax({
            method: 'GET',
            url: 'https://api.sportsdata.io/v3/nfl/scores/json/Player/' + {playerid},
            headers: {
                'X-Api-Key': process.env.REACT_APP_API_KEY,
            },
            contentType: 'application/json',
            success: function (result) {
                console.log(result);
                setResults(result);
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        });
    }

    async function addToWatchList(playerName) {
        const playerInfo = {
            player: playerName,
            // placeholder for player info
            // 
            // 
            // 
            // 
            // 
        };

        await addPlayer({
            variables: playerInfo
        });
    };

    //===[Stuff to Render]========================
    return (
        <section>
            <Container fluid className="player-section">
                <Row className="find-players">
                    <Col>
                        <Button variant="secondary" border="dark" size='lg' md={12} style={{ justifyContent: 'center' }} onClick={toggleModal}>Find Exercises!</Button>
                    </Col>
                </Row>
            </Container>
            <Container className='player-card-container'>
                <Row style={{justifyContent:'center', alignItems:'center'}}>
                    {results && results.map((player) =>
                        <Col className="player-cards" md={6}>
                            <Card border='dark' style={{height: '40rem', text: 'fit', text: 'black', overflow: 'auto' }} >
                                <Card.Header className=''><b>{player.Name}</b></Card.Header>
                                <Card.Body className="card-body">
                                    <Card.Text><b>Age:</b> {player.Age} </Card.Text>
                                    <Card.Text><b>Number:</b> {player.Number}</Card.Text>
                                    <Card.Text><b>Position:</b> {player.Position}</Card.Text>
                                    <Card.Text><b>College:</b> {player.College}</Card.Text>
                                    <Card.Text><b>Stats:</b> {player.instructions}</Card.Text>
                                    <Button variant="secondary" onClick={() => addToWatchList(player.name)}>Add Player!</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
            {
                modalOpen &&
                <Players onClose={toggleModal} callApi={callApi} />
            }
        </section>
    );
}


