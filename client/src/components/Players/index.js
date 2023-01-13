import React, { useState } from 'react';

import PlayersModal from '../PlayersModal';
import $ from 'jquery';
import "../style.css";

import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from "../../utils/queries";
import { ADD_PLAYERS } from '../../utils/mutations';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




export function Players(props) {
    const [results, setResults] = useState([]);

    const { data } = useQuery(QUERY_ME);
    console.log(data);

    const [addPlayers] = useMutation(ADD_PLAYERS, {
        update(cache, { data: { addPlayers } }) {
            try {
                const { me } = cache.readQuery({ query: QUERY_ME });
                console.log(me);
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, players: addPlayers.players } }
                });
            } catch (error) {
                console.log(error);
            }
        }
    });


    //===[Modal Functions]========================
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


    async function callApi(playerId) {
        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + playerId,
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
        await addPlayers({
            variables: playerId
        });

    };


    // async function addToJournal(exerciseName) {
    //     const exerciseInfo = {
    //         exercise: exerciseName,
    //         amount: 0,
    //         units: "none",
    //         reps: 0,
    //         sets: 0,
    //     };


    //===[Stuff to Render]========================
    return (
        <section>
            <Container fluid className="player-section">
                <Row className="find-player">
                    <Col>
                        <Button variant="secondary" border="dark" size='lg' md={12} style={{ justifyContent: 'center' }} onClick={toggleModal}>Find Players!</Button>
                    </Col>
                </Row>
            </Container>
            <Container className='player-card-container'>
                <Row style={{justifyContent:'center', alignItems:'center'}}>
                    {results && results.map((playerId) =>
                        <Col className="player-cards" md={6}>
                            <Card border='dark' style={{height: '40rem', text: 'fit', text: 'black', overflow: 'auto' }} >
                                <Card.Header className=''><b>{playerId.name}</b></Card.Header>
                                <Card.Body className="card-body">
                                    <Card.Text><b>Type:</b> {playerId.type} </Card.Text>
                                    <Card.Text><b>Muscle Group:</b> {playerId.muscle}</Card.Text>
                                    <Card.Text><b>Difficulty:</b> {playerId.difficulty}</Card.Text>
                                    <Card.Text><b>Equipment:</b> {playerId.equipment}</Card.Text>
                                    <Card.Text><b>Instructions:</b> {playerId.instructions}</Card.Text>
                                    {/* <Button variant="secondary" onClick={() => addToJournal(playerId.name)}>Check Analysis!</Button> */}
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
            {
                modalOpen &&
                <PlayersModal onClose={toggleModal} callApi={callApi} />
            }
        </section >
    );

}
