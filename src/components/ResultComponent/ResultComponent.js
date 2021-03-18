import React from 'react';
import { Row, Col } from 'react-bootstrap';

import './ResultComponent.scss';

const ResultComponent = ({ index, result }) => {

    const { outboundRoute, inboundRoute } = result; // If one-way selected, inboundRoute is null

    // Helper function used to build the Route Component
    const buildComponent = (route) => {
        return (
            <Row>
                {/* Carrier */}
                <Col className='box left' lg={3} md={3}>
                    {
                        route.carrier.split(' ').map((part, idx) => {
                            return (
                                <h4 key={ idx }>{ part }</h4>
                            );
                        })
                    }
                </Col>

                {/* Quote */}
                <Col className='box' lg={9} md={9}>
                    {/* Departure */}

                    <div id='from'>
                        <h6>From: <span>{ route.origin.IataCode }</span></h6>
                    </div>

                    <div id='origin'>
                        <h6>{ route.origin.CityName }, { route.origin.CountryName }</h6>
                    </div>

                    {/* Destination */}
                    <div id='to'>
                        <h6>To: <span>{ route.destination.IataCode }</span></h6>
                    </div>

                    <div id='destination'>
                        <h6>{ route.destination.CityName }, { route.destination.CountryName }</h6>
                    </div>

                    {/* Price */}
                    <div id='price'>
                        <h3 className='price'>
                            { 
                                route.currency.SymbolOnLeft
                                ? `${ route.currency.Symbol } ${ route.price }`
                                : `${ route.price } ${ route.currency.Symbol }`
                            }
                        </h3>
                    </div>

                    {/* Flight date */}
                    <div id='flight-date'>
                        <h6>Flight Date: { route.departureDate }</h6>
                    </div>
                </Col>
            </Row>
        );
    }
    
    return (
        // Draw a green rectangular box around the cheapest (or most expensive) result (based on sort)
        <div className={ index === 0 ? 'result cheapest' : 'result'}>   
            
            {/* outboundRoute is always available */}
            { buildComponent(outboundRoute) }

            {/* Show inboundRoute if it is available (for Two-way search) */}
            { inboundRoute ? buildComponent(inboundRoute) : null }
            
        </div>
    );
}

export default ResultComponent;