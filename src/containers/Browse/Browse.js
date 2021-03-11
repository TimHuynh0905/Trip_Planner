import React from 'react';
import { Row, Col } from 'react-bootstrap';

import './Browse.scss';

import DropdownInput from '../../components/DropdownInput/DropdownInput';
import { countries, airports } from './collections';

const Browse = () => {

    const countrySelection = (label, name) => (
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
            required
        />
    );

    const airportSelection = (label, name) => (
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
            required
        />
    );

    return (
        <div id='browse'>
            <div className='browse-inputs'>
                <form className='form-group'>
                    <Row>
                        <Col>{ countrySelection('From Country', 'from') }</Col>
                        <Col>{ countrySelection('To Country', 'to') }</Col>
                    </Row>
                    <Row>
                        <Col>{ airportSelection('From Airport', 'from') }</Col>
                        <Col>{ airportSelection('To Airport', 'to') }</Col>
                    </Row>
                </form>
            </div>
        </div>
    );
}

export default Browse;