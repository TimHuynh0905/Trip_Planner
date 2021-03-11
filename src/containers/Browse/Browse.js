import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import './Browse.scss';

import DropdownInput from '../../components/DropdownInput/DropdownInput';
import ToggleButton from '../../components/UI/ToggleButton/ToggleButton';
import { countries, airports } from './collections';
import DateInput from '../../components/DateInput/DateInput';
import LoadingButton from '../../components/UI/LoadingButton/LoadingButton';

const Browse = () => {
    const [ fromCountry, setFromCountry ] = useState('');
    const [ toCountry, setToCountry ] = useState('');
    const [ fromAirport, setFromAirport ] = useState('');
    const [ toAirport, setToAirport ] = useState('');
    const [ checked, setChecked ] = useState(false);
    const [ outboundDate, setOutboundDate ] = useState(new Date());
    const [ inboundDate, setInboundDate ] = useState(new Date());
    const [ loading, setLoading ] = useState(false);

    const countrySelection = (label, name, value, handleInput) => (
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
            handleInput= { handleInput }
            required
        />
    );

    const airportSelection = (label, name, value, handleInput) => (
        <DropdownInput
            label={ label }
            name={ name }
            collection={
                airports.map(airport => {
                    return {
                        code: airport.PlaceId,
                        name: airport.PlaceName
                    }
                })
            }
            value={ value }
            handleInput= { handleInput }
            required
        />
    );

    const formValid = () => {
        const dropdownsValid = 
            fromCountry.length > 0 && toCountry.length > 0 &&
            fromAirport.length > 0 && toAirport.length > 0
        
        const outboundDateValid = 
            outboundDate && outboundDate >= (new Date()).setHours(0,0,0,0)

        const inboundDateValid =
            checked && inboundDate ? outboundDate <= inboundDate : true
            
        const valid = 
            dropdownsValid && outboundDateValid && inboundDateValid            

        console.log(valid);

        return valid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formValid()) return;

    }

    return (
        <div id='browse'>
            <div className='browse-inputs'>
                <form 
                    className='form-group' 
                    noValidate
                    onSubmit={ event => handleSubmit(event) }
                >
                    <Row>
                        <Col>{ countrySelection('From Country', 'from', fromCountry, setFromCountry) }</Col>
                        <Col>{ countrySelection('To Country', 'to', toCountry, setToCountry) }</Col>
                    </Row>
                    <Row>
                        <Col>{ airportSelection('From Airport', 'from', fromAirport, setFromAirport) }</Col>
                        <Col>{ airportSelection('To Airport', 'to', toAirport, setToAirport) }</Col>
                    </Row>
                    <Row>
                        <ToggleButton
                            leftValue='One-way'
                            rightValue='Two-way'
                            handleCheck={ () => setChecked(!checked) }
                            checked={ checked ? 'true' : 'false' }
                        />
                    </Row>
                    <Row>
                        <Col>
                            <DateInput
                                label='Outbound Date'
                                value={ outboundDate }
                                handleInput={ setOutboundDate }/>
                        </Col>
                        {
                            checked &&
                            <Col>
                                <DateInput
                                    label='Inbound Date'
                                    value={ inboundDate }
                                    handleInput={ setInboundDate }/>
                            </Col>
                        }
                    </Row>
                    {
                        checked && inboundDate < outboundDate &&
                        <Row className='error-message'>
                            <h6>
                                Inbound date cannot be less than outbound date!
                            </h6>
                        </Row>
                    }
                    {
                        outboundDate < (new Date()).setHours(0,0,0,0) &&
                        <Row className='error-message'>
                            <h6>
                                Outbound date cannot be less than today's date!
                            </h6>
                        </Row>
                    }
                    <Row>
                        <LoadingButton
                            label='Search'
                            loading={ formValid() && loading }
                            disabled={ !formValid() }
                        />
                    </Row>
                </form>
            </div>
        </div>
    );
}

export default Browse;