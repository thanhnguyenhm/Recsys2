import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import RatedMovies from './RatedMovies'
import RecmdMovies from './RecmdMovies'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            errors: {}
        }
    }

    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            username: decoded.identity.username,
            email: decoded.identity.email
        })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="jumbotron mt-5">
                        <div className="col-sm-8 mx-auto">
                            <h1 id="title" className="text-center">Profile</h1>
                        </div>
                        <table className="table col-md-6 mx-auto">
                            <tbody>
                                <tr>
                                    <td>Username</td>
                                    <td>{this.state.username}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{this.state.email}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <h1 id='title'>Rated Movies</h1>
                <RatedMovies />
                <h1 id='title'>Recommended Movies</h1>
                <RecmdMovies />
            </div>
        )
    }
}

export default Profile