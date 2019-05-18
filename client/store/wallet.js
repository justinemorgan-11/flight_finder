import axios from 'axios';

// ACTION TYPES
const SET_WALLET = 'SET_WALLET';

// ACTION CREATORS
const setWallet = wallet => ({
    type: SET_WALLET,
    wallet,
});

// THUNKS
export const fetchWallet = id => {
    return dispatch => {
        return axios.get(`/wallets/${id}`)
            .then(res => res.data)
            .then(wallet => dispatch(setWallet(wallet)));
    }
};

export const updateWallet = wallet => {
    return dispatch => {
        return axios.put(`/wallets/${wallet.id}`, wallet)
            .then(res => res.data)
            .then(w => dispatch(setWallet(w)));
    }
}

// REDUCER
export const wallet = (state = {}, action) => {
    switch (action.type) {
        case SET_WALLET:
            return action.wallet;
        default:
            return state;
    }
};
