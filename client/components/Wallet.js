import React from 'react';

class Wallet extends React.Component {
    constructor() {
        super();
        this.state = {
            unitedairlines: 0,
            americanairlines: 0,
            delta: 0,
            chase: 0,
            americanexpress: 0,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(evt) {
        evt.preventDefault();
        console.log(this.state);
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="wallet-form">
                    <table>
                        <thead>
                            <tr>
                                <th />
                                <th>Program</th>
                                <th>Quantity</th>
                                <th>Valuation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {['americanairlines', 'unitedairlines', 'delta', 'chase', 'americanexpress'].map(program => {
                                return (
                                    <tr key={program}>
                                        <td><img src={`airlines/${program.toLowerCase().replace(/ /g, '')}.jpg`} className="airline-logo" /></td>
                                        <td>{program}</td>
                                        <td><input className="form-control" type="number" name={program} value={this.state[program]} onChange={this.handleChange} /></td>
                                        <td><input className="form-control" type="number" name={program} value={this.state[program]} onChange={this.handleChange} /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <button type="submit">Update Wallet</button>
                </form>
            </div>
        )
    }
}

export default Wallet;
