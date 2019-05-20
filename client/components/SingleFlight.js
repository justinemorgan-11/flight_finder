import React from 'react';

const SingleFlight = props => {
    const { quote } = props;
    return (
        <div key={quote.QuoteId} className="flight">
            <img src={`airlines/${quote.Carrier.toLowerCase().replace(/ /g, '')}.jpg`} className="airline-logo" />
            <div className="flight-details">
                <h6>{quote.Carrier} (<i>{quote.type}</i>)</h6>
                <p>${quote.MinPrice.toFixed(2)}</p>
            </div>
        </div>
    )
};

export default SingleFlight;
