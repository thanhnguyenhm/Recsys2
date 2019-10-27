import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Icon, Input } from 'semantic-ui-react'
import Search from './Search'

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
                        <i className="fas fa-sign-in-alt f3 pa2"></i> Login
        </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        <i className="fas fa-user-plus f3 pa2"></i> Register
        </Link>
                </li>
            </ul>
        )

        const userLink = (
            <ul className="nav navbar-nav navbar-right">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        <i class="far fa-user f3 pa2"></i> User
        </Link>
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                        <i class="fas fa-sign-out-alt f3 pa2"></i> Logout
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
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            <i class="fas fa-home f3 pa2"></i> Home
                </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/browse" className="nav-link">
                            <i class="fas fa-film f3 pa2"></i> All Movies
                    </Link>
                    </li>
                </ul>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mr-auto pa2">
                        <Input 
                            icon={<Icon name='search' inverted circular link />}
                            placeholder='Search...'
                        />
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