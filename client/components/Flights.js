import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import SingleFlight from './SingleFlight';
import { fetchFlights, fetchAirports, fetchWallets, fetchPrograms } from '../store/index';

class Flights extends React.Component {

    constructor() {
        super();
        this.state = {
            origin: '',
            destination: '',
            dateOut: '',
            dateIn: '',
            quotes: [],
        }

        this.searchFlight = this.searchFlight.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getAwardFlights = this.getAwardFlights.bind(this);
        this.getCashAwardFlights = this.getCashAwardFlights.bind(this);
    }

    componentDidMount() {
        this.props.fetchFlights();
        this.props.fetchAirports();
        this.props.fetchWallets();
        this.props.fetchPrograms();
    }

    searchFlight(evt) {
        evt.preventDefault();

        const { wallets } = this.props;

        const flight = {
            origin: this.state.origin,
            destination: this.state.destination,
            dateOut: this.state.dateOut,
            dateIn: this.state.dateIn,
        }

        axios.post(`/flights`, flight)
            .then(res => res.data.body)
            .then(flights => {
                let quotes = flights.Quotes.map(quote => {
                    return ({
                        QuoteId: quote.QuoteId,
                        MinPrice: quote.MinPrice,
                        Carrier: quote ? flights.Carriers.find(carrier => carrier.CarrierId === quote.OutboundLeg.CarrierIds[0]).Name : null,
                        type: 'USD',
                    })
                })

                const awardFlights = this.getAwardFlights();

                const chase = wallets.find(w => w.programName === 'Ultimate Rewards');
                const amex = wallets.find(w => w.programName === 'Membership Rewards');

                const chaseQuotes = chase ? this.getCashAwardFlights(quotes, chase.valuation, 1.5, chase.programName, 2000) : [];
                const amexQuotes = amex ? this.getCashAwardFlights(quotes, amex.valuation, 1, amex.programName, 3000) : [];

                quotes = quotes.concat(awardFlights);
                quotes = quotes.concat(chaseQuotes);
                quotes = quotes.concat(amexQuotes);
                console.log(amexQuotes);

                quotes = quotes.sort((q1, q2) => {
                    return q1.MinPrice - q2.MinPrice;
                })

                console.log(quotes);
                this.setState({
                    quotes,
                })
            })
    }

    getAwardFlights() {
        const { airports, flights, wallets, programs } = this.props;
        const originRegion = airports.find(a => a.iataCode === this.state.origin).region;
        const destinationRegion = airports.find(a => a.iataCode === this.state.destination).region;
        const awardFlights = flights.filter(f => f.origin === originRegion && f.destination === destinationRegion);
        return awardFlights.map(award => {

            const program = programs.find(p => p.id === award.programId);
            const value = wallets.find(w => w.programName === program.name).valuation * 100;
            return ({
                QuoteId: 10000 + award.id,
                MinPrice: (2 * award.points / value),
                Carrier: award.carrier,
                type: program.name,
            })
        });
    }

    getCashAwardFlights(quotes, valuation, value, name, idx) {
        return quotes.map(quote => {
            return ({
                QuoteId: idx + quote.QuoteId,
                MinPrice: (valuation * quote.MinPrice / value),
                Carrier: quote.Carrier,
                type: name,
            })
        })
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }

    render() {
        console.log(this.props);
        const { quotes, origin, destination, dateIn, dateOut } = this.state;
        if (this.state.quotes.length === 0) {
            return (
                <div className="flight-form center-form">
                    <form onSubmit={this.searchFlight}>
                        <label htmlFor="origin">Origin:</label>
                        <br />
                        <input name="origin" value={origin} onChange={this.handleChange} className="form-control" />
                        <br />
                        <label htmlFor="destination">Destination:</label>
                        <br />
                        <input name="destination" value={destination} onChange={this.handleChange} className="form-control" />
                        <br />
                        <label htmlFor="dateOut">Date Out:</label>
                        <br />
                        <input type="date" name="dateOut" value={dateOut} onChange={this.handleChange} className="form-control" />
                        <br />
                        <label htmlFor="dateIn">Date In:</label>
                        <br />
                        <input type="date" name="dateIn" value={dateIn} onChange={this.handleChange} className="form-control" />
                        <br />
                        <button type="submit" className="btn btn-secondary">Search</button>
                    </form>
                </div>
            )
        }
        return (
            <div className="flight-search">
                <div className="flight-sidebar">
                    <div className="flight-map">
                        <img src="map.jpg" className="map" />
                    </div>
                    <div className="flight-form">
                        <form onSubmit={this.searchFlight}>
                            <label htmlFor="origin">Origin:</label>
                            <br />
                            <input name="origin" value={origin} onChange={this.handleChange} className="form-control" />
                            <br />
                            <label htmlFor="destination">Destination:</label>
                            <br />
                            <input name="destination" value={destination} onChange={this.handleChange} className="form-control" />
                            <br />
                            <label htmlFor="dateOut">Date Out:</label>
                            <br />
                            <input type="date" name="dateOut" value={dateOut} onChange={this.handleChange} className="form-control" />
                            <br />
                            <label htmlFor="dateIn">Date In:</label>
                            <br />
                            <input type="date" name="dateIn" value={dateIn} onChange={this.handleChange} className="form-control" />
                            <br />
                            <button type="submit" className="btn btn-secondary">Search</button>
                        </form>
                    </div>
                </div>
                <div className="flight-list">
                    {quotes.map(quote => {
                        return (
                            <SingleFlight key={quote.QuoteId} quote={quote} />
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { flights, airports, wallets, programs } = state;
    return {
        flights,
        airports,
        wallets,
        programs,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchFlights: () => dispatch(fetchFlights()),
        fetchAirports: () => dispatch(fetchAirports()),
        fetchWallets: () => dispatch(fetchWallets()),
        fetchPrograms: () => dispatch(fetchPrograms()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Flights);
