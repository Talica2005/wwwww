import React from 'react'
import './Footer.css'

import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { Card, CardGroup } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <CardGroup className="font">
                <Card>
                    <Card.Footer>
                        <div className="footer-bottom">
                            <h4>Adress</h4>
                            <ul className="list-unstyled">
                                <li>HM BILVÅRD</li>
                                <li>___</li>
                                <li>Mirabellbacken 16</li>
                                <li>165 61 Hässelby</li>
                                <li>Org.nr. 559139-5040</li>
                            </ul>
                        </div>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Footer>
                        <div className="footer-bottom">
                            <h4>Öppettider</h4>
                            <ul className="list-unstyled">
                                <li>___</li>
                                <li>Mån-Fre: 08.00 – 18.00</li>
                                <li>Lör-Sön: Stängt</li>
                                <li>___</li>
                                <li>Lunchstängt: 12:00 – 12:45</li>
                            </ul>
                        </div>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Footer>
                        <div className="footer-bottom">
                            <h4>Kontakta oss</h4>
                            <ul className="list-unstyled">
                                <li>E-mail:</li>
                                <li>
                                    <a href="mailto:info@hmbilvard.com">info@hmbilvard.com</a>
                                </li>
                                <li>___ </li>
                                <li>Telefon:</li>
                                <li>
                                    <a href="tel:+4 (67) 00 22 54 03">+4 (67) 00 22 54 03</a>
                                </li>
                            </ul>
                        </div>
                    </Card.Footer>
                </Card>
            </CardGroup>
            <Card>
                <Card.Footer className="socmedia1">
                    <div className="socmedia">
                        <FaTwitter /> <FaFacebook /> <FaInstagram /> <FaYoutube />
                    </div>
                </Card.Footer>
            </Card>
        </footer>
    )
}

export default Footer
