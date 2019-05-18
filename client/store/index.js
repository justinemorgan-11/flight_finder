import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { fetchFlights, flights } from './flights';
import { fetchWallets, wallets } from './wallets';
import { fetchPrograms, programs } from './programs';
import { fetchAirports, airports } from './airports';
import { fetchWallet, updateWallet, wallet } from './wallet';

export {
    fetchFlights,
    fetchPrograms,
    fetchWallets,
    fetchAirports,
    fetchWallet,
    updateWallet,
};

const reducer = combineReducers({
    flights,
    wallets,
    programs,
    airports,
    wallet,
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
