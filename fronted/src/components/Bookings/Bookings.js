import React, { Component } from 'react'
import UserContext from '../../context/User-context'
import ActionList from '../ActionList/ActionList'
import Spinner from '../Loading/Loading'

import { Accordion } from 'react-bootstrap'

class Bookings extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            events: [],

            creating: false,
            selectedEvent: null,
            userId: null,
        }
    }

    static contextType = UserContext

    componentDidMount() {
        this.fetchEvents()
    }

    fetchEvents() {
        this.setState({ isLoading: true })
        const requestBody = {
            query: `
              query {
                events {
                  _id
                  name
                  phone
                  title
                  description
                  date
                  price
                  creator {
                    _id
                    email
                  }
                }
              }
            `,
        }

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!')
                }
                return res.json()
            })
            .then((resData) => {
                const events = resData.data.events
                this.setState({ events: events, isLoading: false })
            })
            .catch((err) => {
                console.log(err)
                if (this.isActive) {
                    this.setState({ isLoading: false })
                }
            })
    }

    showDetailHandler = (eventId) => {
        this.setState((prevState) => {
            const selectedEvent = prevState.events.find((e) => e._id === eventId)
            return { selectedEvent: selectedEvent }
        })
    }

    // mutation BookEvent($id: ID!) {
    //     bookEvent(eventId: $id) {
    //     _id
    //     name
    //     phone
    //     title
    //     description
    //     date
    //     price
    //   }
    // }

    bookEventHandler = (event) => {
        // if (!this.context.token) {
        //     this.setState({ selectedEvent: null })
        //     return
        // }
        var { _id, name, phone, title, description, price, date } = event
        const requestBody = {
            query: `
            mutation ($id:ID!,$eventInput:EventInput) { updateEvent(id:$id,eventInput:$eventInput) {
                
            _id
            name
            phone
            title
            description
            price
            date
          }
        }
          
            `,
            variables: {
                id: _id,
                eventInput: { name, phone, title, description, price, date },
            },
        }

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.context.token,
            },
        })
            .then((res) => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!')
                }
                return res.json()
            })
            .then((resData) => {
                console.log(resData)
                this.setState({ selectedEvent: null })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    deleteEvent = (eventId) => {
        this.setState({ isLoading: true })
        const requestBody = {
            query: `
                mutation DeleteEvent( $eventId: ID!) {
                  cancelEvent(eventId: $eventId) {
                    _id
                    name
                    phone
                    title
                    description
                    date
                    price
                  }
                }
              `,
            variables: {
                eventId: eventId,
            },
        }

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.context.token,
            },
        })
            .then((res) => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!')
                }
                return res.json()
            })
            .then((resData) => {
                this.setState((prevState) => {
                    const updatedEvents = prevState.events.filter((event) => {
                        return event._id !== eventId
                    })
                    return { events: updatedEvents, isLoading: false }
                })
            })
            .catch((err) => {
                console.log(err)
                this.setState({ isLoading: false })
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="boka-online-o">
                    {this.props.userId === this.props.creatorId && (
                        <div>
                            <div className="boka-online">USER ACCOUNT</div>

                            <div>
                                <div className="presentation">
                                    <p>Välkommen,{JSON.stringify(this.props)} ! </p>
                                </div>

                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item className="accordion-item" eventKey="0">
                                        <Accordion.Header>Din bokning</Accordion.Header>
                                        <Accordion.Body>
                                            {this.state.isLoading ? (
                                                <Spinner />
                                            ) : (
                                                <div>
                                                    <ActionList
                                                        events={this.state.events}
                                                        authUserId={this.context.userId}
                                                        onDeleteEvent={this.deleteEvent}
                                                        onBokaDetail={this.bokaDetailHandler}
                                                        onViewDetail={this.showDetailHandler}
                                                        onConfirm={this.bookEventHandler}
                                                    ></ActionList>
                                                </div>
                                            )}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Faktura</Accordion.Header>
                                        <Accordion.Body>
                                            <ul className="bookings-list">
                                                <li>1. Faktura</li>
                                                <li>2. Faktura</li>
                                                <li>3. Faktura</li>
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Rabatt</Accordion.Header>
                                        <Accordion.Body>
                                            <ul className="bookings-list">
                                                <li>1. Rabatt</li>
                                                <li>2. Info</li>
                                                <li>3. Annons</li>
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>
                    )}
                </div>
                <div className="boka-online">VÅRT LÄGE</div>
            </React.Fragment>
        )
    }
}

export default Bookings
