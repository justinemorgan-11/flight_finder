import React from 'react';

const SingleFlight = props => {
    const { quote } = props;
    return (
        <div key={quote.QuoteId} className="flight">
            <img src={`airlines/${quote.Carrier.toLowerCase().replace(/ /g, '')}.jpg`} className="airline-logo" />
            <p>{quote.Carrier} (<i>{quote.type}</i>)</p>
            <p>${quote.MinPrice.toFixed(2)}</p>
        </div>
    )
};

export default SingleFlight;
