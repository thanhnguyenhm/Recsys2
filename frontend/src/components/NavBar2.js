import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Landing extends Component {
    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)
    }

    render() {
        const loginRegLink = (
            <ul className="nav navbar-nav navbar-right">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        <i class="fas fa-sign-in-alt"></i> Login
        </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        <i class="fas fa-user-plus "></i> Register
        </Link>
                </li>
            </ul>
        )

        const userLink = (
            <ul className="nav navbar-nav navbar-right">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        <i class="far fa-user"></i> User
        </Link>
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                        <i class="fas fa-sign-out-alt"></i> Logout
        </a>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                <a className="navbar-brand" href="/"><img src={"https://www.themoviedb.org/assets/2/v4/logos/408x161-powered-by-rectangle-blue-10d3d41d2a0af9ebcb85f7fb62ffb6671c15ae8ea9bc82a2c6941f223143409e.png"} alt={"Recsys"} width={110} height={50} /></a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExample10"
                    aria-controls="navbarsExample10"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarsExample10"
                >
                    <ul className="navbar-nav mr-auto">
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-light my-2 my-sm-0" type="submit"><i className="fas fa-search"></i> Search</button>
                        </form>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                    </ul>
                    {localStorage.usertoken ? userLink : loginRegLink}

                </div>
            </nav>
        )
    }
}

export default withRouter(Landing)