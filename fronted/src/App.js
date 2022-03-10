import './App.css'

import React, { Component } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import User from './components/User/User'
import Bookings from './components/Bookings/Bookings'
import Events from './components/Events/Events'
import UserContext from './context/User-context'

class App extends Component {
    state = {
        token: null,
        userId: null,
    }

    login = (token, userId, tokenExpiration) => {
        this.setState({ token: token, userId: userId })
    }

    logout = () => {
        this.setState({ token: null, userId: null })
    }

    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <UserContext.Provider
                        value={{
                            token: this.state.token,
                            userId: this.state.userId,
                            login: this.login,
                            logout: this.logout,
                        }}
                    >
                        <Header></Header>
                        <main className="main-content">
                            <Switch>
                                {this.state.token && (
                                    <Redirect from="/" to="/events" exact></Redirect>
                                )}
                                {this.state.token && (
                                    <Redirect from="/user" to="/events" exact></Redirect>
                                )}
                                {!this.state.token && <Route path="/user" component={User}></Route>}
                                <Route path="/events" component={Events}></Route>
                                {this.state.token && (
                                    <Route path="/bookings" component={Bookings}></Route>
                                )}
                                {!this.state.token && <Redirect to="/user" exact></Redirect>}
                            </Switch>
                        </main>
                        <Footer></Footer>
                    </UserContext.Provider>
                </React.Fragment>
            </BrowserRouter>
        )
    }
}

export default App
