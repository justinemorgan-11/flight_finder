import axios from 'axios';

// ACTION TYPE
const SET_AIRPORTS = 'SET_AIRPORTS';

// ACTION CREATOR
const setAirports = airports => ({
    type: SET_AIRPORTS,
    airports
});

// THUNKS
export const fetchAirports = () => {
    return dispatch => {
        return axios.get('/airports')
            .then(res => res.data)
            .then(airports => dispatch(setAirports(airports)));
    }
}

// REDUCER
export const airports = (state = [], action) => {
    switch (action.type) {
        case SET_AIRPORTS:
            return action.airports;
        default:
            return state;
    }
};
