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
                        <i className="fas fa-sign-in-alt f3"></i> Login
        </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        <i className="fas fa-user-plus f3"></i> Register
        </Link>
                </li>
            </ul>
        )

        const userLink = (
            <ul className="nav navbar-nav navbar-right">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        <i class="far fa-user f3"></i> User
        </Link>
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                        <i class="fas fa-sign-out-alt f3"></i> Logout
        </a>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                <a className="navbar-brand" href="/"><img src={"https://www.themoviedb.org/assets/2/v4/logos/408x161-powered-by-rectangle-green-bb4301c10ddc749b4e79463811a68afebeae66ef43d17bcfd8ff0e60ded7ce99.png"} alt={"Recsys"} width={110} height={50} /></a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target=".navbar-collapse"
                    // aria-controls="navbarsExample10"
                    // aria-expanded="false"
                    // aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mr-auto">
                        <form className="form-inline">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><i className="fas fa-search"></i> Search</button>
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