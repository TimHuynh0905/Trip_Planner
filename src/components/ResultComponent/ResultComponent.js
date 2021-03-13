import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './ResultComponent.scss';

const ResultComponent = ({ index, result }) => {
    const { outboundRoute, inboundRoute } = result;

    const buildComponent = (route) => {
        return (
            <Row>
                <Col className='box left' lg={3} md={3}>
                    {
                        route.carrier.split(' ').map((part, idx) => {
                            return (
                                <h4 key={ idx }>{ part }</h4>
                            );
                        })
                    }
                </Col>
                <Col className='box' lg={9} md={9}>
                    <div id='from'>
                        <h6>From: <span>{ route.origin.IataCode }</span></h6>
                    </div>
                    <div id='to'>
                        <h6>To: <span>{ route.destination.IataCode }</span></h6>
                    </div>
                    <div id='origin'>
                        <h6>{ route.origin.CityName }, { route.origin.CountryName }</h6>
                    </div>
                    <div id='destination'>
                        <h6>{ route.destination.CityName }, { route.destination.CountryName }</h6>
                    </div>
                    <div id='price'>
                        <h3 className='price'>
                            { 
                                route.currency.SymbolOnLeft
                                ? `${ route.currency.Symbol } ${ route.price }`
                                : `${ route.price } ${ route.currency.Symbol }`
                            }
                        </h3>
                    </div>
                    <div id='departure-date'>
                        <h6>Departure Date: { route.departureDate }</h6>
                    </div>
                </Col>
            </Row>
        );
    }
    
    return (
        <div className={ index === 0 ? 'result cheapest' : 'result'}>
            { buildComponent(outboundRoute) }
            { inboundRoute ? buildComponent(inboundRoute) : null }
        </div>
    );
}

export default ResultComponent;