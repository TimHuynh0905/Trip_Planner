import React from 'react';
import { Row, Col } from 'react-bootstrap';

import './Browse.scss';

import CountryInput from '../../components/CountryInput/CountryInput';
import AirportInput from '../../components/AirportInput/AirportInput';
// import FormInput from '../../components/UI/FormInput/FormInput';

const Browse = () => {

    return (
        <div id='browse'>
            <div className='browse-inputs'>
                <form className='form-group'>
                    <Row>
                        <Col>
                            <CountryInput 
                                label='From Country'
                                name='from'
                                required
                            />
                        </Col>
                        <Col>
                            <CountryInput
                                label='To Country'
                                name='to'
                                required
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <AirportInput 
                                label='From Airport'
                                name='from'
                                required
                            />
                        </Col>
                        <Col>
                            <AirportInput
                                label='To Airport'
                                name='to'
                                required
                            />
                        </Col>
                    </Row>
                </form>
            </div>
        </div>
    );
}

export default Browse;