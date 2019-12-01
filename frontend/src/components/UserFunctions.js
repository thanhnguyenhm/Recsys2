import axios from 'axios'
import { BACKEND_API } from '../config';

export const register = newUser => {
    return axios
        .post(BACKEND_API + 'users/register', {
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            window.alert("You've successfully signed up. Please log in.")
        })
}

export const login = user => {
    return axios
        .post(BACKEND_API + 'users/login', {
            username: user.username,
            password: user.password
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getProfile = user => {
    return axios
        .get(BACKEND_API + 'users/profile', {
            //headers: { Authorization: ` ${this.getToken()}` }
        })
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const rate = rate => {
    return axios
        .post(BACKEND_API + 'add_rating', {
            title: rate.title,
            rating: rate.rating,
            user: rate.user
        })
    .then(response => {
        console.log('Rated')
    })
}