import React from 'react';
import { connect } from 'react-redux';
import { fetchPrograms } from '../store/index';
import WalletEntry from './WalletEntry';

class Wallet extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
        this.props.fetchPrograms();
    }

    render() {
        return (
            <div className="center-form">
                <form onSubmit={this.handleSubmit} className="wallet-form">
                    <table>
                        <thead className="wallet-header">
                            <tr>
                                <th />
                                <th>Program</th>
                                <th>Quantity</th>
                                <th>Valuation</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.programs.map(program => {
                                return (
                                    <WalletEntry key={program.id} program={program} />
                                )
                            })}
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { programs } = state;
    return {
        programs,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPrograms: () => dispatch(fetchPrograms()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
