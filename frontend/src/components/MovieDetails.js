import React, { Component } from 'react';
import "./style.css";
import axios from 'axios';

const API_KEY = '7607a580860a0612a63134f284663524'

class MovieDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { data: []};
    }

    componentDidMount() {
        axios.get('https://api.themoviedb.org/3/movie/19995?api_key=' +API_KEY)
            .then(res => {
                const data = res.data;
                this.setState({ data });
            })
    }
    render() {
        return (
            <div className='moviedetails'>
                <div className='moviedetails\_inner'>
                    <h1>test</h1>
                    {console.log(this.state.data)}
                </div>
            </div>
        );
    }
}

export default MovieDetails;