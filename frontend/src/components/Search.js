import React, { Component } from 'react';
import Movies from './Movies'
import { getMovies } from './MovieFunctions'

class Search extends Component {
    constructor() {
        super()
        this.state = {
            query: '',
            results: {}
        }

        this.getInfo = this.getInfo.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    getInfo = () => {
        const query = this.state.query

        getMovies(query)
        /*fetch('/movies?query=${this.state.query}&limit=5', {method: 'GET'})
        .then(response => response.json())
        .then(data => this.setState({results: data}))*/
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 2 === 0) {
                    this.getInfo()
                }
            } else if (!this.state.query) {
            }
        })
    }

    render() {
        return (
            <form>
                <input
                    placeholder="Search..."
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                />
                <Movies movies={this.state.results} />
            </form>
        )
    }
}

export default Search; 