import React from 'react';
import { connect } from 'react-redux';
import { fetchWallet, updateWallet } from '../store/index';

class WalletEntry extends React.Component {
    constructor() {
        super();
        this.state = {
            quantity: 0,
            valuation: 0,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.props.fetchWallet(1)
            .then(wallet => this.setState({
                quantity: wallet.wallet.quantity,
                valuation: wallet.wallet.valuation,
            }));
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: Number(target.value),
        })
    }

    handleSubmit(evt) {
        evt.preventDefault();
        const { quantity, valuation } = this.state;
        this.props.updateWallet({ id: 1, quantity, valuation })
    }

    render() {
        const { program } = this.props;
        console.log(this.props);
        return (
            <tr key={program.id} className="wallet-row">
                <td><img src={`airlines/${program.image}`} className="program-logo" /></td>
                <td className="wallet-name">
                    <h6 className="program-name">{program.name}</h6>
                </td>
                <td><input className="form-control" type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange} /></td>
                <td><input className="form-control" type="number" name="valuation" value={this.state.valuation} onChange={this.handleChange} /></td>
                <td><button type="submit" className="btn btn-secondary" onClick={this.handleSubmit}>Update</button></td>
            </tr>
        )
    }
}

const mapStateToProps = state => {
    const { wallet } = state;
    return {
        wallet,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchWallet: id => dispatch(fetchWallet(id)),
        updateWallet: wallet => dispatch(updateWallet(wallet)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletEntry);
