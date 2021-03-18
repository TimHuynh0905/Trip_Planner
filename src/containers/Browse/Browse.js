import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { axios_instance, endpoints } from '../../config';

import DropdownInput from '../../components/DropdownInput/DropdownInput';
import ToggleButton from '../../components/UI/ToggleButton/ToggleButton';
import DateInput from '../../components/DateInput/DateInput';
import LoadingButton from '../../components/UI/LoadingButton/LoadingButton';
import './Browse.scss';


const Browse = ({ countries, currencies, setRoutes }) => {

    // Component-level states
    // Search inputs
    
    // -------------------------------------------- Dropdowns --------------------------------------------
    // Static dropdown - No user query required
    const [ fromCountry, setFromCountry ] = useState('');           // Departure   country selection
    const [ toCountry, setToCountry ] = useState('');               // Destination country selection
    const [ currency, setCurrency ] = useState('');                 // Currency            selection

    // Dynamic dropdown - User query required
    // Inputs - User query strings
    const [ fromAirport, setFromAirport ] = useState('');           // Query string for departure   airport
    const [ toAirport, setToAirport ] = useState('');               // Query string for destination airport

    // Outputs - Airport suggestions in selected countries that match query strings
    // Lists are shown in dropdown box
    const [ fromAirportList, setFromAirportList ] = useState([])    // Departure    airport suggestions 
    const [ toAirportList, setToAirportList ] = useState([])        // Destination  airport suggestions

    // --------------------------------------------- Toggles ---------------------------------------------
    const [ twoWay, setTwoWay ] = useState(false);                  // Search one-way or two-way
    const [ ignoreDate, setIgnoreDate ] = useState(false);          // Show results for MM/YYYY
    
    // Date inputs 
    const [ outboundDate, setOutboundDate ] = useState(new Date()); // Departure date selection
    const [ inboundDate, setInboundDate ] = useState(new Date());   // Return date selection (if two-way selected)
    
    // Search button loading state - UI aesthetic purpose
    const [ loading, setLoading ] = useState(false);

    // useEffect hooks for updating airport suggestions whenever user query changes
    // Two separate hooks because departure airport and destination airport queries are independent events
    useEffect( () => {
        if (fromAirport.length) {
            axios_instance.get(`${endpoints.places}/${fromCountry.substring(0, 2)}/${currency.split(' - ')[0]}/en-US/`, {
                params: { query: fromAirport },
            }).then(
                resp => 
                    setFromAirportList(
                        resp.data.Places
                            .filter(airport => 
                                airport.CountryName === fromCountry.split(' - ')[1]
                            )
                            .map(airport => {
                                return {
                                    code: airport.PlaceId,
                                    name: airport.PlaceName
                                }
                            })
                    )
            ).catch(err => console.error(err));
        } else setFromAirportList([]);
    }, [ fromCountry, fromAirport, currency ])

    useEffect( () => {
        if (toAirport.length) {
            axios_instance.get(`${endpoints.places}/${toCountry.substring(0, 2)}/${currency.split(' - ')[0]}/en-US/`, {
                params: { query: toAirport },
            }).then(
                resp => 
                    setToAirportList(
                        resp.data.Places
                            .filter(airport => 
                                airport.CountryName === toCountry.split(' - ')[1]
                            )
                            .map(airport => {
                                return {
                                    code: airport.PlaceId,
                                    name: airport.PlaceName
                                }
                            })
                    )
            ).catch(err => console.error(err));
        } else setToAirportList([]);
    }, [ toCountry, toAirport, currency ])


    // countrySelection, airportSelection, currencySelection functions
    // dynamically leverage DropdownInput (re-usable component) to return the UI we want

    const countrySelection = (label, name, value, handleSelect) => (
        <DropdownInput
            label={ label }
            name={ name }
            collection={
                // Filter necessary fields (Code, Name) of the country object
                countries.map(country => {
                    return {
                        code: country.Code,
                        name: country.Name
                    }
                })
            }
            value={ value }
            handleInput= { (input) => {} }
            handleSelect={ handleSelect }
            required
        />
    );

    const airportSelection = (label, name, value, handleInput) => {
        const collection = name === 'from' ? fromAirportList : toAirportList;
            
        return (
            <DropdownInput
                label={ label }
                name={ name }
                collection={ collection }
                value={ value }
                handleInput={ handleInput }
                handleSelect={ handleInput }
                required
            />
        )
    };

    const currencySelection = (label, name, value, handleSelect) => (
        <DropdownInput
            label={ label }
            name={ name }
            collection={
                // Filter necessary fields (Code, Symbol) of the currency object
                currencies.map(currency => {
                    return {
                        code: currency.Code,
                        name: currency.Symbol
                    }
                })
            }
            value={ value }
            handleInput= { (input) => {} }
            handleSelect={ handleSelect }
            required
        />
    );

    // Check if all required inputs are filled
    const formValid = () => {
        const dropdownsValid = 
            fromCountry.length > 0 && toCountry.length > 0 &&
            fromAirport.length > 0 && toAirport.length > 0 &&
            currency.length > 0
        
        const outboundDateValid = 
            outboundDate && outboundDate >= (new Date()).setHours(0,0,0,0)

        const inboundDateValid =
            twoWay && inboundDate ? outboundDate <= inboundDate : true
            
        const valid = 
            dropdownsValid && outboundDateValid && inboundDateValid            

        return valid;
    }

    // Format JavaScript Date() object to YYYY-MM or YYYY-MM-DD
    const getFormattedDate = (date) => {
        const year = date.getFullYear();
      
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
      
        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        if (ignoreDate) {
            return year + '-' + month;
        }

        return year + '-' + month + '-' + day;
    }

    // Handle Search button clicked
    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate if form is valid to be submitted
        if (!formValid()) return;

        // Set loading button into loading state to trigger loading icon
        setLoading(true);

        // Format user inputs into the right formats to use in API requests
        const curr = currency.split(' - ')[0]
        const origin = fromAirport.split(' - ')[0];
        const destination = toAirport.split(' - ')[0];
        const outbound = getFormattedDate(outboundDate);
        const inbound = getFormattedDate(inboundDate);
        const url = 
            twoWay 
            ?
                `${endpoints.routes}/US/${curr}/en-US/${origin}/${destination}/${outbound}/${inbound}`
            :
                `${endpoints.routes}/US/${curr}/en-US/${origin}/${destination}/${outbound}`

        axios_instance({
            method: 'get',
            url: url,
        })
            .then(resp => {
                console.log(resp);
                setRoutes(resp.data);   // "routes" is an application-level variable - see App.js
                setLoading(false);      // End loading state of Search button on callback
            })
            .catch(err => {
                console.error(err);
                setRoutes({             // Mark fetch errors as no routes found for coding convenience
                    Quotes: [],
                    Carriers: [],
                    Places: [],
                    Currencies: [],
                    Routes: [],
                });
                setLoading(false);      // End loading state of Search button on callback
            });
    }

    return (
        <div className='browse'>
            <div className='browse-inputs'>
                <form 
                    className='form-group' 
                    noValidate
                    onSubmit={ event => handleSubmit(event) }
                >
                    {/* Country selections */}
                    <Row>
                        {/* Departure */}
                        <Col lg={6} md={6} sm={12}>
                            { 
                                countrySelection(
                                    'From Country (*)', 
                                    'from', 
                                    fromCountry, 
                                    setFromCountry
                                ) 
                            }
                        </Col>

                        {/*  Destination */}
                        <Col lg={6} md={6} sm={12}>
                            { 
                                countrySelection(
                                    'To Country (*)', 
                                    'to',
                                    toCountry,
                                    setToCountry
                                )
                            }
                        </Col>
                    </Row>

                    {/* Currency selection */}
                    <Row id='currency-row'>
                        <Col>
                            {
                                currencySelection(
                                    'Currency',
                                    'currency',
                                    currency,
                                    setCurrency
                                )
                            }
                        </Col>
                    </Row>

                    {/* Airport selections */}
                    {
                        // shown if countries and currencies are filled
                        // these 3 inputs are required as specified in the API description
                        fromCountry.length && toCountry.length && currency.length
                        ? (
                            <Row>
                                {/* Departure */}
                                <Col lg={6} md={6} sm={12}>
                                    {
                                        airportSelection(
                                            'From Airport (*)',
                                            'from',
                                            fromAirport,
                                            setFromAirport
                                        )
                                    }
                                </Col>

                                {/* Destination */}
                                <Col lg={6} md={6} sm={12}>
                                    {
                                        airportSelection(
                                            'To Airport (*)',
                                            'to',
                                            toAirport,
                                            setToAirport
                                        )
                                    }
                                </Col>
                            </Row>
                        ) : null
                    }

                    {/* One-way or Two-way selections */}
                    <Row>
                        <Col>
                            <ToggleButton
                                leftValue='One-way'
                                rightValue='Two-way'
                                handleCheck={ () => setTwoWay(!twoWay) }
                                checked={ twoWay ? 'true' : 'false' }
                            />
                        </Col>
                    </Row>

                    {/* Date selections */}
                    <Row>
                        <Col>
                            <DateInput
                                label='Outbound Date'
                                value={ outboundDate }
                                handleInput={ setOutboundDate }/>
                        </Col>
                        {
                            twoWay &&
                            <Col>
                                <DateInput
                                    label='Inbound Date'
                                    value={ inboundDate }
                                    handleInput={ setInboundDate }/>
                            </Col>
                        }
                    </Row>

                    {/* Error messages */}
                    {
                        twoWay && inboundDate < outboundDate &&
                        <Row className='error-message'>
                            <h6>Inbound date cannot be less than outbound date!</h6>
                        </Row>
                    }
                    {
                        outboundDate < (new Date()).setHours(0,0,0,0) &&
                        <Row className='error-message'>
                            <h6>Outbound date cannot be less than today's date!</h6>
                        </Row>
                    }

                    {/* Show results for YYYY-MM or YYYY-MM-DD */}
                    {/* Calendar library used does not support month selection */}
                    <Row>
                        <Col>
                            <ToggleButton
                                leftValue= 'Include Date'
                                rightValue='Ignore Date'
                                handleCheck={ () => setIgnoreDate(!ignoreDate) }
                                checked={ ignoreDate ? 'true' : 'false' }
                            />
                        </Col>
                    </Row>
                    {
                        ignoreDate
                        ? (
                            <Row className='ignore-date-notice'>
                                <h6>
                                    ({' '}Show results for {' '}
                                    <span>
                                        {1 + outboundDate.getMonth()}/
                                        {outboundDate.getFullYear()}
                                        {
                                            twoWay
                                            ? (
                                                <>
                                                    {' '}-{' '}
                                                    {1 + inboundDate.getMonth()}/
                                                    {inboundDate.getFullYear()}
                                                </>
                                            ) : null
                                        }
                                    </span>{' '})     
                                </h6>    
                            </Row>
                        ) : null
                    }

                    {/* Search button */}
                    <Row id='button-row'>
                        <Col>
                            <LoadingButton
                                label='Search'
                                loading={ formValid() && loading }
                                disabled={ !formValid() }
                            />
                        </Col>
                    </Row>
                </form>
            </div>
        </div>
    );
}

export default Browse;