import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { axios_instance, endpoints } from '../../config';

import './Browse.scss';

import DropdownInput from '../../components/DropdownInput/DropdownInput';
import ToggleButton from '../../components/UI/ToggleButton/ToggleButton';
import DateInput from '../../components/DateInput/DateInput';
import LoadingButton from '../../components/UI/LoadingButton/LoadingButton';
// import axios from 'axios';

const Browse = ({ countries, currencies, setRoutes }) => {
    const [ fromCountry, setFromCountry ] = useState('');
    const [ toCountry, setToCountry ] = useState('');
    const [ fromAirport, setFromAirport ] = useState('');
    const [ fromAirportList, setFromAirportList ] = useState([])
    const [ toAirport, setToAirport ] = useState('');
    const [ toAirportList, setToAirportList ] = useState([])
    const [ currency, setCurrency ] = useState('');
    const [ twoWay, setTwoWay ] = useState(false);
    const [ ignoreDate, setIgnoreDate ] = useState(false);
    const [ outboundDate, setOutboundDate ] = useState(new Date());
    const [ inboundDate, setInboundDate ] = useState(new Date());
    const [ loading, setLoading ] = useState(false);

    useEffect( () => {
        const handleCountryInputsChange = () => {
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
        }
        handleCountryInputsChange();
    }, [ fromCountry, fromAirport, currency ])

    useEffect( () => {
        const handleCountryInputsChange = () => {
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
        }
        handleCountryInputsChange();
    }, [ toCountry, toAirport, currency ])

    const countrySelection = (label, name, value, handleSelect) => (
        <DropdownInput
            label={ label }
            name={ name }
            collection={
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

        // console.log(valid);

        return valid;
    }

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

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formValid()) return;

        setLoading(true);
        
        const curr = currency.split(' - ')[0]
        const origin = fromAirport.split(' - ')[0];
        const destination = toAirport.split(' - ')[0];
        const outbound = getFormattedDate(outboundDate);
        const inbound = getFormattedDate(inboundDate);

        // const curr = 'USD'
        // const origin = 'AMS-sky';
        // const destination = 'LAX-sky';
        // const outbound = '2021-03';
        // const inbound = '2021-04'

        const url = 
            twoWay 
            ?
                `${endpoints.routes}/US/${curr}/en-US/${origin}/${destination}/${outbound}/${inbound}`
            :
                `${endpoints.routes}/US/${curr}/en-US/${origin}/${destination}/${outbound}`

        axios_instance({
            method: 'get',
            url: url,
            // params: twoWay ? {
            //     inboundpartialdate: getFormattedDate(inboundDate)
            // }: null
        })
            .then(resp => {
                console.log(resp);
                setRoutes(resp.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setRoutes({
                    Quotes: [],
                    Carriers: [],
                    Places: [],
                    Currencies: [],
                    Routes: [],
                });
                setLoading(false);
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
                    <Row>
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
                    {
                        fromCountry.length && toCountry.length && currency.length
                        ? (
                            <Row>
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
                    <Row id='button-row'>
                        <Col>
                            <LoadingButton
                                label='Search'
                                loading={ formValid() && loading }
                                // disabled={ !formValid() }
                            />
                        </Col>
                    </Row>
                </form>
            </div>
        </div>
    );
}

export default Browse;