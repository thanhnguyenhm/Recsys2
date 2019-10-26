import React, { Component } from 'react';
import { Rating, Card, Icon, Image } from 'semantic-ui-react'
import PropTypes from 'prop-types';

class MovieModule extends Component {
    render() {
        return (
            <div className='dib pa3 grow'>
                {/* 'bg-white tc dib br3 pa3 ma2 grow bw2 shadow-5'
                <p>{this.props.movie.title}</p>
                <img src={"http://image.tmdb.org/t/p/w300" + this.props.movie.poster} alt=""></img>
                <p>
                    <Rating size='massive' icon='star' maxRating={5} clearable />
                </p> */}

                <Card>
                    <Image src={"http://image.tmdb.org/t/p/w300" + this.props.movie.poster} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{this.props.movie.title}</Card.Header>
                    </Card.Content> 
                    <Card.Content>
                        <Rating size='massive' icon='star' maxRating={5} clearable />
                    </Card.Content> 
                </Card>
            </div>
        )
    }
}


// PropTypes
MovieModule.propTypes = {
    movie: PropTypes.object.isRequired
}

export default MovieModule;