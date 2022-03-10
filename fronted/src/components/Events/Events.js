import React, { Component } from 'react'
import UserContext from '../../context/User-context'
import { Form, Row, Col, Button } from 'react-bootstrap'
import './Events.css'

class Events extends Component {
    state = {
        creating: false,
        events: [],
        isLoading: false,
        selectedEvent: null,
    }

    isActive = true

    static contextType = UserContext

    constructor(props) {
        super(props)
        this.nameElRef = React.createRef()
        this.phoneElRef = React.createRef()
        this.titleElRef = React.createRef()
        this.priceElRef = React.createRef()
        this.dateElRef = React.createRef()
        this.descriptionElRef = React.createRef()
    }
    componentDidMount() {
        this.fetchEvents()
    }

    confirmHandler = () => {
        this.setState({ creating: false })
        const title = this.titleElRef.current.value
        const name = this.nameElRef.current.value
        const phone = this.phoneElRef.current.value
        const price = +this.priceElRef.current.value
        const date = this.dateElRef.current.value
        const description = this.descriptionElRef.current.value

        if (
            name.trim().length === 0 ||
            phone.trim().length === 0 ||
            title.trim().length === 0 ||
            price <= 0 ||
            date.trim().length === 0 ||
            description.trim().length === 0
        ) {
            return
        }

        const event = { name, phone, title, price, date, description }
        console.log(event)

        const requestBody = {
            query: `
                    mutation CreateEvent($name: String!, $phone: String!, $title: String!, $description: String!, $price: Float!, $date: String!) {
                        createEvent(eventInput: {name: $name, phone: $phone, title: $title, description: $description, price: $price, date: $date}) {
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
                name: name,
                phone: phone,
                title: title,
                description: description,
                price: price,
                date: date,
            },
        }

        const token = this.context.token

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
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
                    const updatedEvents = [...prevState.events]
                    updatedEvents.push({
                        _id: resData.data.createEvent._id,
                        name: resData.data.createEvent.name,
                        phone: resData.data.createEvent.phone,
                        title: resData.data.createEvent.title,
                        description: resData.data.createEvent.description,
                        date: resData.data.createEvent.date,
                        price: resData.data.createEvent.price,
                        creator: {
                            _id: this.context.userId,
                        },
                    })
                    return { events: updatedEvents }
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    fetchEvents = () => {
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
                // Authorization: 'Bearer ' + this.context.token,
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
                if (this.isActive) {
                    this.setState({ events: events, isLoading: false })
                }
            })
            .catch((err) => {
                console.log(err)
                if (this.isActive) {
                    this.setState({ isLoading: false })
                }
            })
    }

    // bookEventHandler = () => {
    //     if (!this.context.token) {
    //         this.setState({ selectedEvent: null })
    //         return
    //     }

    //     const requestBody = {
    //         query: `
    //         mutation BookEvent($id: ID!) {
    //             bookEvent(eventId: $id) {
    //             _id

    //           }
    //         }
    //       `,
    //         variables: {
    //             id: this.state.selectedEvent._id,
    //         },
    //     }

    //     fetch('http://localhost:8000/graphql', {
    //         method: 'POST',
    //         body: JSON.stringify(requestBody),
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: 'Bearer ' + this.context.token,
    //         },
    //     })
    //         .then((res) => {
    //             if (res.status !== 200 && res.status !== 201) {
    //                 throw new Error('Failed!')
    //             }
    //             return res.json()
    //         })
    //         .then((resData) => {
    //             console.log(resData)
    //             this.setState({ selectedEvent: null })
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    componentWillUnmount() {
        this.isActive = false
    }

    render() {
        return (
            <>
                <div className="boka-online">BOKA ONLINE</div>
                <div className="fragment-style">
                    <React.Fragment>
                        {this.context.token && (
                            <div children>
                                <header className="modal__header">
                                    <h1>"SMS bekräftelse direkt till din mobil"</h1>
                                </header>
                                <Form className="form-content">
                                    <Row className="mb-3">
                                        <Form.Group as={Col}>
                                            <Form.Control
                                                className="size-form"
                                                type="text"
                                                id="name"
                                                ref={this.nameElRef}
                                                placeholder="Namn"
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Control
                                                className="size-form"
                                                type="number"
                                                id="phone"
                                                ref={this.phoneElRef}
                                                placeholder="Telefonnummer"
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                className="size-form"
                                                type="text"
                                                id="title"
                                                ref={this.titleElRef}
                                                placeholder="Tjänst"
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                className="size-form"
                                                type="number"
                                                id="price"
                                                ref={this.priceElRef}
                                                placeholder="Price"
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                className="size-form"
                                                type="datetime-local"
                                                id="date"
                                                ref={this.dateElRef}
                                                placeholder="Datum / Tid"
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                className="size-form"
                                                type="text"
                                                id="description"
                                                rows="4"
                                                ref={this.descriptionElRef}
                                                placeholder="Bilmärke"
                                            />
                                        </Form.Group>
                                    </Row>
                                </Form>
                                <div
                                    className="d-grid gap-2"
                                    style={{
                                        width: '100%',
                                        height: '5rem',
                                        paddingLeft: '2rem',
                                        paddingRight: '2rem',
                                    }}
                                >
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        style={{
                                            fontSize: '2rem',
                                            borderRadius: '10px',
                                        }}
                                        onClick={() => this.confirmHandler()}
                                    >
                                        Boka
                                    </Button>
                                </div>
                                <div
                                    style={{
                                        textAlign: 'center',
                                        fontSize: '1.2rem',
                                        color: '#4876BA',
                                        fontFamily: 'Roboto Condensed',
                                        fontWeight: 'bold',
                                        padding: '2rem',
                                    }}
                                >
                                    <p>
                                        OBS! Om du vill boka flera tjänster räcker det med att du
                                        bokar en tjänst och säger till önskemål när du lämnar bilen
                                        hos oss.
                                    </p>
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                </div>
            </>
        )
    }
}

export default Events
