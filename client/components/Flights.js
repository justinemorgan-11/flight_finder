import React from 'react';
import axios from 'axios';
import SingleFlight from './SingleFlight';

class Flights extends React.Component {

    constructor() {
        super();
        this.state = {
            origin: '',
            destination: '',
            dateOut: '',
            dateIn: '',
            quotes: [],
            carriers: [],
        }

        this.searchFlight = this.searchFlight.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    searchFlight(evt) {
        evt.preventDefault();

        const flight = {
            origin: this.state.origin,
            destination: this.state.destination,
            dateOut: this.state.dateOut,
            dateIn: this.state.dateIn,
        }

        axios.post(`/flights`, flight)
            .then(res => res.data.body)
            .then(flights => this.setState({
                quotes: flights.Quotes,
                carriers: flights.Carriers,
            }));
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }

    render() {
        console.log(this.state);
        const { quotes, origin, destination, dateIn, dateOut, carriers } = this.state;
        return (
            <div>
                <div>
                    <div className="flight-form">
                        <form onSubmit={this.searchFlight}>
                            <label htmlFor="origin">Origin:</label>
                            <br />
                            <input name="origin" value={origin} onChange={this.handleChange} />
                            <br />
                            <label htmlFor="destination">Destination:</label>
                            <br />
                            <input name="destination" value={destination} onChange={this.handleChange} />
                            <br />
                            <label htmlFor="dateOut">Date Out:</label>
                            <br />
                            <input type="date" name="dateOut" value={dateOut} onChange={this.handleChange} />
                            <br />
                            <label htmlFor="dateIn">Date In:</label>
                            <br />
                            <input type="date" name="dateIn" value={dateIn} onChange={this.handleChange} />
                            <br />
                            <button type="submit">Search</button>
                        </form>
                    </div>
                </div>
                <div>
                    {quotes.map(quote => {
                        const name = carriers.find(carrier => carrier.CarrierId === quote.OutboundLeg.CarrierIds[0]).Name;
                        return (
                            <SingleFlight key={quote.QuoteId} name={name} quote={quote} />
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Flights;
