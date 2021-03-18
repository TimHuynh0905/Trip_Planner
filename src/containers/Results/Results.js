import React, { useEffect, useState } from 'react';
import './Results.scss';
import ResultComponent from '../../components/ResultComponent/ResultComponent';
import ToggleButton from '../../components/UI/ToggleButton/ToggleButton';

const Results = ({ routes }) => {
    const { Quotes, Carriers, Places, Currencies } = routes;
    const [ descending, setDescending ] = useState(false);
    const [ quotes, setQuotes ] = useState(null);

    useEffect(() => {
        // console.log('Sort toggle clicked!');
        if (quotes) {
            quotes.sort(
                (quote_a, quote_b) =>
                    quote_a.Minprice - quote_b.MinPrice ? 1 : -1
            );
        }
    }, [ quotes, descending ]);

    useEffect(() => {
        // console.log('Quotes changed')
        setDescending(false);
        setQuotes(Quotes);
    }, [ Quotes ])

    const buildRoute = (leg, price) => {
        const { CarrierIds, OriginId, DestinationId, DepartureDate } = leg;
        const carrier = Carriers.find(carrier => carrier.CarrierId === CarrierIds[0]);
        const origin = Places.find(place => place.PlaceId === OriginId);
        const destination = Places.find(place => place.PlaceId === DestinationId);
        const [ year, month, date ] = DepartureDate.substring(0, 10).split('-');
        const route = {
            origin: origin,
            destination: destination,
            carrier: carrier.Name,
            price: price,
            currency: Currencies[0],
            departureDate: `${month}/${date}/${year}`
        }
        return route;
    }

    const results = (routes) => {
        const results = Quotes.map((quote, idx) => {
            const price = quote.MinPrice;
            const outboundRoute = buildRoute(quote.OutboundLeg, price);
            const inboundRoute = quote.InboundLeg ? buildRoute(quote.InboundLeg, price) : null;
            return {
                outboundRoute: outboundRoute,
                inboundRoute: inboundRoute
            };
        })

        return results;
    }

    const renderContent = () => {
        if (routes == null || routes.Quotes.length === 0) {
            return (
                <h6 className='no-result-response'>
                    Sorry, No Results Found!
                </h6>
            );
        }

        return (
            <div className='result-box'>
                <ToggleButton
                    leftValue='Price: Low to High'
                    rightValue='Price: High to Low'
                    handleCheck={ () => setDescending(!descending) }
                    checked={ descending ? 'true' : 'false' }
                />
                {
                    results(routes).map((result, idx) => {
                        // console.log(idx);
                        return (
                            <ResultComponent 
                                key={ idx }
                                result={ result }
                                index={ idx }
                            />
                        );
                    })
                }
            </div>
        )
    }

    return (
        <div className='results'>
            { renderContent() }
        </div>
    );
}

export default Results;