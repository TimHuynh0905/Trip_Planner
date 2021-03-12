export const routes = {
    Quotes: [
        {
            QuoteId: 1,
            MinPrice: 46,
            Direct: false,
            OutboundLeg: {
                CarrierIds: [ 1065 ],
                OriginId: 81727,
                DestinationId: 73076,
                DepartureDate: "2021-03-16T00:00:00",
            },
            QuoteDateTime: "2021-03-11T22:47:00",
        },
        {
            QuoteId:2,
            MinPrice:335,
            Direct:true,
            OutboundLeg: {
                CarrierIds: [ 1793 ],
                OriginId: 81727,
                DestinationId: 73076,
                DepartureDate: "2021-03-16T00:00:00",
            },
            QuoteDateTime: "2021-03-11T22:47:00",
        }
    ],
    Carriers: [
        {
            CarrierId: 1065, 
            Name: "Frontier Airlines",
        },
        {
            CarrierId: 1793,
            Name: "United",
        }
    ],
    Places: [
        {
            Name: "Chicago O'Hare International",
            Type: "Station",
            PlaceId: 73076,
            IataCode: "ORD",
            SkyscannerCode: "ORD",
            CityName: "Chicago",
            CityId: "CHIA",
            CountryName: "United States",
        },
        {
            Name: "San Francisco International",
            Type: "Station",
            PlaceId: 81727,
            IataCode: "SFO",
            SkyscannerCode: "SFO",
            CityName: "San Francisco",
            CityId: "SFOA",
            CountryName: "United States",
        }
    ],
    Currencies: [
        {
            Code: "USD",
            Symbol: "$",
            ThousandsSeparator: ",",
            DecimalSeparator: ".",
            SymbolOnLeft: true,
            SpaceBetweenAmountAndSymbol: false,
            RoundingCoefficient: 0,
            DecimalDigits: 2,
        }
    ],
    Routes: [
        {
            Price: 46,
            QuoteDateTime: "2021-03-11T22:47:00",
            QuoteIds: [ 1, 2 ],
            OriginId: 81727,
            DestinationId: 73076,
        }
    ]
}

