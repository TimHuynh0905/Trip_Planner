import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './ResultComponent.scss';

const ResultComponent = ({ result }) => {
    const { 
        origin, 
        destination, 
        carrier, 
        price, 
        currency, 
        departureDate 
    } = result;
    
    return (
        <div className='result'>
            <Row>
                <Col className='box left' lg={3} md={3}>
                    {
                        carrier.split(' ').map((part, idx) => {
                            return (
                                <h4 key={ idx }>{ part }</h4>
                            );
                        })
                    }
                </Col>
                <Col className='box' lg={9} md={9}>
                    <div id='from'>
                        <h6>From: <span>{ origin.IataCode }</span></h6>
                    </div>
                    <div id='to'>
                        <h6>To: <span>{ destination.IataCode }</span></h6>
                    </div>
                    <div id='origin'>
                        <h6>{ origin.CityName }, { origin.CountryName }</h6>
                    </div>
                    <div id='destination'>
                        <h6>{ destination.CityName }, { destination.CountryName }</h6>
                    </div>
                    {/* <div id='currency'>
                        <h6>
                           Currency: { currency.Code } 
                        </h6>
                    </div> */}
                    <div id='price'>
                        <h3 className='price'>
                            { 
                                currency.SymbolOnLeft
                                ? `${ currency.Symbol } ${ price }`
                                : `${ price } ${ currency.Symbol }`
                            }
                        </h3>
                    </div>
                    <div id='departure-date'>
                        <h6>Departure Date: { departureDate }</h6>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default ResultComponent;