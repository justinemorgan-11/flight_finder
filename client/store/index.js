import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { fetchFlights, flights } from './flights';
import { fetchWallets, wallets } from './wallets';
import { fetchPrograms, programs } from './programs';

export {
    fetchFlights,
    fetchPrograms,
    fetchWallets,
};

const reducer = combineReducers({
    flights,
    wallets,
    programs,
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
