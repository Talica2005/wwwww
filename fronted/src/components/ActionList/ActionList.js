import React from 'react'
// import ActionItem from '../ActionItem/ActionItem'
import { FaRegClock } from 'react-icons/fa'
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri'
import './Booking.css'
import { Modal, Row, Form, Col } from 'react-bootstrap'

import { Component } from 'react'

import Button from '@restart/ui/esm/Button'

export default class ActionList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            events: [],
            creating: false,
            selectedEvent: null,
            modalConfirmHandler: false,
            showHide: false,
            onDetail: false,
            show: false,
        }
    }

    handleModalShowHide(event) {
        this.setState({ showHide: !this.state.showHide, selectedEvent: { ...event } })
    }

    doSave = () => {
        this.props.onConfirm(this.state.selectedEvent)
    }

    render() {
        return (
            <ul className="bookings-list container">
                <li className="bookings-items ">
                    {this.props.events.map((event) => {
                        return (
                            <div key={event._id} className="bookings-item row">
                                <div className=" col s6 m6 l1">
                                    <FaRegClock />
                                </div>
                                <div className=" col s6 m6 l1">{event.name}</div>
                                <div className=" col s6 m6 l2">{event.phone}</div>
                                <div className=" col s6 m6 l2">{event.title}</div>
                                <div className=" col s6 m6 l1">{event.description}</div>
                                <div className=" col s6 m6 l1">{event.price} kr</div>
                                <div className=" col s6 m6 l2">
                                    {new Date(event.date).toLocaleDateString()}
                                </div>

                                <div
                                    className="bookings-icon-delete  col s6 m6 l1"
                                    onClick={this.props.onDeleteEvent.bind(this, event._id)}
                                    variant="primary"
                                    size="lg"
                                    style={{
                                        fontSize: '1rem',
                                        borderRadius: '10px',
                                    }}
                                >
                                    <Button>
                                        <RiDeleteBinLine />
                                    </Button>
                                </div>
                                <div
                                    className="bookings-icon-delete  col s6 m6 l1"
                                    variant="primary"
                                    size="lg"
                                    style={{
                                        fontSize: '1rem',
                                        borderRadius: '10px',
                                    }}
                                >
                                    <div className="events-control">
                                        <div
                                            variant="primary"
                                            onClick={() => this.handleModalShowHide(event)}
                                            // onClick={() =>
                                            //     this.showDetailHandler.bind(
                                            //         this,
                                            //         this.props.eventId
                                            //     )
                                            // }

                                            events={this.state.events}
                                        >
                                            <Button>
                                                <RiEditLine />
                                            </Button>
                                        </div>

                                        {this.state.showHide && (
                                            <Modal
                                                show={this.state.showHide}
                                                ondetail={this.state.onViewDetail}
                                            >
                                                <Modal.Header>
                                                    <Modal.Title>Redigera bokning</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form className="form-content">
                                                        <Row className="mb-3">
                                                            <Form.Group as={Col}>
                                                                <Form.Control
                                                                    className="size-form"
                                                                    type="text"
                                                                    id="name"
                                                                    value={
                                                                        this.state.selectedEvent
                                                                            .name
                                                                    }
                                                                    // placeholder="Namn"
                                                                ></Form.Control>
                                                            </Form.Group>

                                                            <Form.Group as={Col}>
                                                                <Form.Control
                                                                    className="size-form"
                                                                    type="number"
                                                                    id="phone"
                                                                    value={
                                                                        this.state.selectedEvent
                                                                            .phone
                                                                    }
                                                                    onChange={(e) =>
                                                                        this.setState({
                                                                            selectedEvent: {
                                                                                ...this.state
                                                                                    .selectedEvent,
                                                                                price: parseInt(
                                                                                    e.target.value
                                                                                ),
                                                                            },
                                                                        })
                                                                    }
                                                                    // placeholder="Telefonnummer"
                                                                />
                                                            </Form.Group>
                                                        </Row>
                                                        <Row>
                                                            <Form.Group className="mb-3">
                                                                <Form.Control
                                                                    className="size-form"
                                                                    type="text"
                                                                    id="title"
                                                                    value={
                                                                        this.state.selectedEvent
                                                                            .title
                                                                    }
                                                                    // placeholder="Tjänst"
                                                                />
                                                            </Form.Group>
                                                        </Row>
                                                        <Row>
                                                            <Form.Group className="mb-3">
                                                                <Form.Control
                                                                    className="size-form"
                                                                    type="number"
                                                                    id="price"
                                                                    value={
                                                                        this.state.selectedEvent
                                                                            .price
                                                                    }

                                                                    // placeholder="Price"
                                                                />
                                                            </Form.Group>
                                                        </Row>

                                                        <Row>
                                                            <Form.Group className="mb-3">
                                                                <Form.Control
                                                                    className="size-form"
                                                                    type="datetime-local"
                                                                    id="date"
                                                                    value={
                                                                        this.state.selectedEvent
                                                                            .date
                                                                    }

                                                                    // placeholder="Datum / Tid"
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
                                                                    value={
                                                                        this.state.selectedEvent
                                                                            .description
                                                                    }

                                                                    // placeholder="Bilmärke"
                                                                />
                                                            </Form.Group>
                                                        </Row>
                                                    </Form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button
                                                        variant="secondary"
                                                        onClick={() => this.handleModalShowHide()}
                                                    >
                                                        Close
                                                    </Button>
                                                    <Button
                                                        variant="primary"
                                                        onClick={() => this.doSave()}
                                                    >
                                                        Save
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </li>
            </ul>
        )
    }
}
