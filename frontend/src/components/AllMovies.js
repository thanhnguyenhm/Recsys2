import Movies from "./Movies";
import React, { useEffect, useState } from "react";
import { Pagination } from 'semantic-ui-react';
import { BACKEND_API } from '../config';

function AllMovies() {
    const [movies, setMovies] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [apiUrl, setApiUrl] = useState(BACKEND_API + '/browse/1');

    useEffect(() => {
        fetch(apiUrl).then(response =>
            response.json().then(data => {
                setMovies(data.movies);
            })
        );
    }, [apiUrl]);

    const onChange = (e, pageInfo) => {
        setActivePage(pageInfo.activePage);
        setApiUrl(BACKEND_API + '\\browse\\' + pageInfo.activePage);
    };

    return (
        <div className='.f2 tc pa4'>
            <h1 id='title'>All Movies</h1>
            <Pagination 
                activePage={activePage}
                onPageChange={onChange}
                totalPages={100}
                ellipsisItem={null}
            />
            <div>
                <Movies movies={movies} rated={false} />      
            </div>
            <Pagination
                activePage={activePage}
                onPageChange={onChange}
                totalPages={100}
                ellipsisItem={null}
            />
        </div>
    )
}

export default AllMovies;
