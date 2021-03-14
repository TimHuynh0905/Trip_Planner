import React, { useEffect, useState } from 'react';
import './Results.scss';
import ResultComponent from '../../components/ResultComponent/ResultComponent';
import ToggleButton from '../../components/UI/ToggleButton/ToggleButton';

// import { routes } from './routes';

const Results = ({ routes }) => {
    const { Quotes, Carriers, Places, Currencies } = routes;
    const [ maxSorted, setMaxSorted ] = useState(false);

    useEffect(() => {
        const handleSortOrderChange = () => {
            Quotes.sort(
                (quote_a, quote_b) =>
                    quote_a.Minprice - quote_b.MinPrice ? 1 : -1
            );
        }
        handleSortOrderChange();
    }, [ Quotes, maxSorted ]);

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
            <>
                <ToggleButton
                    leftValue='Price: Low to High'
                    rightValue='Price: High to Low'
                    handleCheck={ () => setMaxSorted(!maxSorted) }
                    checked={ maxSorted ? 'true' : 'false' }
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
            </>
        )
    }

    return (
        <div className='results'>
            { renderContent() }
        </div>
    );
}

export default Results;