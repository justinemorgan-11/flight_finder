import axios from 'axios';

// ACTION TYPE
const SET_FLIGHTS = 'SET_FLIGHTS';

// ACTION CREATOR
const setFlights = flights => ({
    type: SET_FLIGHTS,
    flights
});

// THUNKS
export const fetchFlights = () => {
    return dispatch => {
        return axios.get('/awardflights')
            .then(res => res.data)
            .then(flights => dispatch(setFlights(flights)));
    }
}

// REDUCER
export const flights = (state = [], action) => {
    switch (action.type) {
        case SET_FLIGHTS:
            return action.flights;
        default:
            return state;
    }
};
