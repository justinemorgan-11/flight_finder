import React from 'react';

const SingleFlight = props => {
    const { quote, name } = props;
    return (
        <div key={quote.QuoteId} className="flight">
            <img src={`airlines/${name.toLowerCase().replace(/ /g, '')}.jpg`} className="airline-logo" />
            <p>{name}</p>
            <p>${quote.MinPrice.toFixed(2)}</p>
        </div>
    )
};

export default SingleFlight;
