import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import "../style.css";
import "../Login";
import "../Signup";
// import globo from "../images/globo.png";
// import community from "../images/community-blog.png";
// import workout from "../images/workout.jpg";
// import workoutJournal from "../images/workout-journal.jpg"
import Type from "./Type"


const Home = (props) => {
    return (
        <main className='home-page'>
            <Container>
                <Row style={{ justifyContent: "center", paddingBottom: "30px", paddingTop: "60px" }}>
                    <Col md={12} className='landing-page-graphic'>
                        <Card className='bg-dark'>
                            {/* <Card.Img variant="top" src={globo} /> */}
                            <Card.Body>
                                <Card.Text>
                                    {/* PLACEHOLDER FOR CARD TEXT */}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container className='choose-globo-gains'>
                <Row style={{ justifyContent: "center", paddingBottom: "30px", paddingTop: "30px" }}>
                    <Col>
                        <div>
                            <h1 style={{ paddingBottom: "30px"}}><Type /></h1>
                            <h2 style={{ paddingBottom: "10px"}}>
                                About Us...
                            </h2>
                            <p style={{ paddingBottom: "10px"}}>
                                <strong>FunkyNFLAnalytics</strong> is the premier Fantasy NFL Analysis application dedicated to helping you make the best of your season! We strive to improve your <strong>Percentages</strong>, <strong>Incite</strong> and <strong>Overall Better Choices</strong>. <br/>
                                We've been in the buisness of making certified winners since 2022 when 5 gentleman from the University of Oregon's Full Stack Bootcamp decided the world of football needs to be redefined! <br/>
                            </p>
                        </div>
                        {/* <div>
                            <h2>
                                Our Promise to You... 
                            </h2>
                            <p>
                                Our promise to you is to 100% change your life around and turn you, yes <strong>YOU!</strong> Into a certified <strong>BADASS</strong>.
                                Follow our amazing <strong>Exercise Recommendations</strong> to get up to date with workouts that will redefine you! After you have your desired
                                workouts be sure to track <strong>EVERYTHING</strong> in our state of the art <strong>Workout Journal</strong> and after you've made sure to grab your gains,
                                be sure to brag about it to <strong>EVERYONE</strong> in our ever connecting <strong>Community Blog</strong>. We are <strong>GLOBO GAINS</strong>.
                            </p>

                        </div> */}
                    </Col>
                </Row>
            </Container>
            <Container className='features'>
                <Row style={{ justifyContent: "center", paddingBottom: "30px", paddingTop: "30px" }}>
                    <Col md={12}>
                    <h1 style={{paddingBottom:"30px"}}>
                        Features...
                    </h1>
                    </Col>
                    <Col md={4} style={{paddingBottom:"30px"}} className='feature-card'>
                        <Card className="feature-card-view bg-dark">
                            {/* <Card.Img variant="top" src={community} alt="card-img" /> */}
                            <Card.Body>
                                <Card.Title className='feature-card-tittle'>Players</Card.Title>
                                <Card.Text style={{ textAlign: "justify" }}>
                                    <p>
                                    </p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} style={{paddingBottom:"30px"}} className='feature-card'>
                        <Card className="feature-card-view bg-dark">
                            {/* <Card.Img variant="top" src={workoutJournal} alt="card-img" /> */}
                            <Card.Body>
                                <Card.Title>Analytics</Card.Title>
                                <Card.Text style={{ textAlign: "justify" }}>
                                    <p>
                                        Cant seem to remember what the hell you were just doing?
                                        Dont worry, we got you fellow meat heads covered with our state of the art <strong>Workout Journal</strong>.
                                    </p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* <Col md={4} style={{paddingBottom:"30px"}} className='feature-card'>
                        <Card className="feature-card-view bg-dark">
                            <Card.Img variant="top" src={workout} alt="card-img" />
                            <Card.Body>
                                <Card.Title>Exercise Reccomendations</Card.Title>
                                <Card.Text style={{ textAlign: "justify" }}>
                                    <p>
                                        Cant seem to decide on what to do when you want to get them gains? With our amazing <strong>Exercise Reccomendations</strong> you'll
                                        never have to think again!
                                    </p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col> */}
                </Row>
            </Container>
        </main>
    );
}

export default Home;