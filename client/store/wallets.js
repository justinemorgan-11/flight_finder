import axios from 'axios';

// ACTION TYPES
const SET_WALLETS = 'SET_WALLETS';

// ACTION CREATORS
const setWallets = wallets => ({
    type: SET_WALLETS,
    wallets,
});

// THUNKS
export const fetchWallets = () => {
    return dispatch => {
        return axios.get('/wallets')
            .then(res => res.data)
            .then(wallets => dispatch(setWallets(wallets)));
    }
};

// REDUCER
export const wallets = (state = [], action) => {
    switch (action.type) {
        case SET_WALLETS:
            return action.wallets;
        default:
            return state;
    }
};
