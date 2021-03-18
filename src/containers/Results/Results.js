import React, { useEffect, useState } from 'react';

import ResultComponent from '../../components/ResultComponent/ResultComponent';
import ToggleButton from '../../components/UI/ToggleButton/ToggleButton';
import './Results.scss';

const Results = ({ routes }) => {

    // Retrieve objects from routes prop
    const { Quotes, Carriers, Places, Currencies } = routes;
    
    // Component-level states
    const [ quotes, setQuotes ] = useState(null);           
    const [ descending, setDescending ] = useState(false); // Sort flights by MinPrice from highest to lowest
    
    useEffect(() => {
        // console.log('Sort toggle clicked!');
        if (quotes) {
            quotes.sort(
                (quote_a, quote_b) =>
                    quote_a.Minprice - quote_b.MinPrice ? 1 : -1
            );
        }
    }, [ quotes, descending ]);

    // Quotes changed (as a result of new Search) does not logically trigger a re-sort
    useEffect(() => {
        // console.log('Quotes changed')
        setDescending(false);
        setQuotes(Quotes);
    }, [ Quotes ])

    // Parse the each quote into a route object that contains only the fields we want to display
    const results = () => {
        const results = quotes.map((quote, idx) => {
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

    // Helper function used to build the route object that has information we want to display
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


    // Display what we want users to see - Error Message or Results
    const renderContent = () => {
        // Return Error Message if no route is found from Search inputs
        if (routes == null || routes.Quotes.length === 0) {
            return (
                <h6 className='no-result-response'>
                    Sorry, No Results Found!
                </h6>
            );
        }

        // Else, return sort toggle button and a list of flight options
        return (
            //  Result box
            <div className='result-box'>
                {/* Sort toggle */}
                <ToggleButton
                    leftValue='Price: Low to High'
                    rightValue='Price: High to Low'
                    handleCheck={ () => setDescending(!descending) }
                    checked={ descending ? 'true' : 'false' }
                />

                {/* Result list */}
                {
                    results().map((result, idx) => {
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