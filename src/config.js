import axios from 'axios';

export const axios_instance = axios.create({
    baseURL: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices',
    headers: {
        'x-rapidapi-key': 'e69b0feb8cmsh5bbc289dd902a9fp1f728ejsn72f59c684da5',
        'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
    }
});

export const endpoints = {
    places: '/autosuggest/v1.0',
    routes: '/browseroutes/v1.0',
    countries: '/reference/v1.0/countries/en-US',
    currencies: '/reference/v1.0/currencies',
}