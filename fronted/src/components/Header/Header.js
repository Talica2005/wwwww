import React from 'react'
import { Navbar, Nav, Container, Card } from 'react-bootstrap'
import UserContext from '../../context/User-context'
import logo from './logo.png'
import bilrekond from './bilrekond.png'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = (props) => (
    <UserContext.Consumer>
        {(context) => {
            return (
                <>
                    <div className="mobile">
                        <Container className="linknav">
                            <Nav>
                                <Nav.Link
                                    style={{ position: 'absolute', left: ' 10%' }}
                                    href="tel:+46739276072"
                                >
                                    {' '}
                                    07 39 27 6072
                                </Nav.Link>
                            </Nav>
                            <Nav style={{ position: 'absolute', right: '10%' }}>
                                {!context.token && (
                                    <Nav.Link href="/user">
                                        <Link to="/user">Logga in</Link>
                                    </Nav.Link>
                                )}
                                <React.Fragment>
                                    {context.token && (
                                        <Nav.Link href="/user">
                                            <Link to="/user" onClick={context.logout}>
                                                Logga ut
                                            </Link>
                                        </Nav.Link>
                                    )}
                                </React.Fragment>
                            </Nav>
                        </Container>
                    </div>

                    <Navbar bg="light" expand="lg">
                        <Container>
                            <Navbar.Brand>
                                <img className="img" src={bilrekond} alt="Bilvard" />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="linknav1">
                                    <Nav.Link href="#hem">Hem</Nav.Link>

                                    <Nav.Link href="#bilvard">
                                        <Link to="#bilvard">Bilvård</Link>
                                    </Nav.Link>

                                    <Nav.Link href="/events">
                                        <Link to="/events">Boka tid</Link>
                                    </Nav.Link>

                                    {context.token && (
                                        <Nav.Link href="/booknings">
                                            <Link to="/bookings">Din bokning</Link>
                                        </Nav.Link>
                                    )}
                                    <Nav.Link href="#gallery">Gallery</Nav.Link>
                                    <Nav.Link href="#kontakt">Kontakt</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                    {/* Image */}
                    <Card>
                        <Card.Body>
                            <Card.Img src={logo} alt="Bilvard" />
                        </Card.Body>
                    </Card>
                </>
            )
        }}
    </UserContext.Consumer>
)

export default Header
