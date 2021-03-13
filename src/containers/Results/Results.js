import React from 'react';
import './Results.scss';
import ResultComponent from '../../components/ResultComponent/ResultComponent';

import { routes } from './routes';

const Results = () => {

    const results = (routes) => {
        const { Quotes, Carriers, Places, Currencies } = routes;

        const results = Quotes.map((quote, idx) => {
            const price = quote.MinPrice;
            const { CarrierIds, OriginId, DestinationId, DepartureDate } = quote.OutboundLeg;
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
        })

        return results;
    }

    return (
        <div className='results'>
            {
                results(routes).map((result, idx) => {
                    return (
                        <ResultComponent 
                            key={ idx }
                            result={ result }/>
                    );
                })
            }
            {
                results(routes).map((result, idx) => {
                    return (
                        <ResultComponent 
                            key={ idx }
                            result={ result }/>
                    );
                })
            }
        </div>
    );
}

export default Results;