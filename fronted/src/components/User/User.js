import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import UserContext from '../../context/User-context'
import './User.css'

class User extends Component {
    state = {
        isLogin: true,
    }

    static contextType = UserContext

    constructor(props) {
        super(props)
        this.emailEl = React.createRef()
        this.passwordEl = React.createRef()
    }

    switchModeHandler = () => {
        this.setState((prevState) => {
            return { isLogin: !prevState.isLogin }
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        const email = this.emailEl.current.value
        const password = this.passwordEl.current.value

        if (email.trim().length === 0 || password.trim().length === 0) {
            return
        }

        let requestBody = {
            query: `
              query Login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                  userId
                  token
                  tokenExpiration
                }
              }
            `,
            variables: {
                email: email,
                password: password,
            },
        }

        if (!this.state.isLogin) {
            requestBody = {
                query: `
                mutation CreateUser($email: String!, $password: String!) {
                  createUser(userInput: {email: $email, password: $password}) {
                    _id
                    email
                  }
                }
              `,
                variables: {
                    email: email,
                    password: password,
                },
            }
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
                if (resData.data.login.token) {
                    this.context.login(
                        resData.data.login.token,
                        resData.data.login.userId,
                        resData.data.login.tokenExpiration
                    )
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="logga-in">Logga in</div>
                <div className="Login">
                    <Form onSubmit={this.submitHandler}>
                        <Form.Group className="form-content-log">
                            <Form.Label htmlFor="email">Email:</Form.Label>
                            <Form.Control
                                className="form-control-log"
                                type="email"
                                id="email"
                                ref={this.emailEl}
                            />
                        </Form.Group>
                        <Form.Group className="form-content-log">
                            <Form.Label htmlFor="password">Lösenord:</Form.Label>
                            <Form.Control
                                className="form-control-log"
                                type="password"
                                id="password"
                                ref={this.passwordEl}
                            />
                        </Form.Group>
                        <Form.Group className="form-actions">
                            <Button size="lg" className="button-log" type="submit">
                                Acceptera
                            </Button>
                            <Button
                                size="lg"
                                className="button-log-reg"
                                type="button"
                                onClick={this.switchModeHandler}
                            >
                                {this.state.isLogin ? 'Registrera' : 'Logga in'}
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}

export default User
