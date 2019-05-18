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
    }

    componentDidMount() {
        this.props.fetchFlights();
        this.props.fetchAirports();
        this.props.fetchWallets();
        this.props.fetchPrograms();
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
            .then(flights => {
                let quotes = flights.Quotes.map(quote => {
                    return ({
                        QuoteId: quote.QuoteId,
                        MinPrice: quote.MinPrice,
                        Carrier: quote ? flights.Carriers.find(carrier => carrier.CarrierId === quote.OutboundLeg.CarrierIds[0]).Name : null,
                        type: 'USD',
                    })
                })

                // Chase + Amex are price based (1.5c/1c respectively)
                // const amexValue = this.props.wallets.find(w => w.programName === 'Membership Rewards').valuation;
                // const chaseValue = this.props.wallets.find(w => w.programName === 'Ulitmate Rewards').valuation;

                // const amex = quotes.map(quote => {
                //     quote.id = quote.id + 20000;
                //     quote.MinPrice = (quote.MinPrice * amexValue);
                //     quote.type = 'Membership Rewards';
                //     return quote;
                // });

                // const chase = quotes.map(quote => {
                //     quote.id = quote.id + 30000;
                //     quote.MinPrice = (quote.MinPrice * chaseValue / 1.5);
                //     quote.type = 'Ultimate Rewards';
                //     return quote;
                // });

                const awardFlights = this.getAwardFlights();
                quotes = quotes.concat(awardFlights);

                console.log(quotes);

                quotes = quotes.sort((q1, q2) => {
                    return q1.MinPrice - q2.MinPrice;
                })

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
            const value = wallets.find(w => w.programName === program.name).valuation / 100;

            return ({
                QuoteId: 10000 + award.id,
                MinPrice: (2 * award.points * value),
                Carrier: award.carrier,
                type: program.name,
            })
        });
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }

    render() {
        console.log(this.props);
        const { quotes, origin, destination, dateIn, dateOut } = this.state;
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
