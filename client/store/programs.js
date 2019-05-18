import axios from 'axios';

// ACTION TYPES
const SET_PROGRAMS = 'SET_PROGRAMS';

// ACTION CREATORS
const setPrograms = programs => ({
    type: SET_PROGRAMS,
    programs,
});

// THUNKS
export const fetchPrograms = () => {
    return dispatch => {
        return axios.get('/programs')
            .then(res => res.data)
            .then(programs => dispatch(setPrograms(programs)));
    }
};

// REDUCER
export const programs = (state = [], action) => {
    switch (action.type) {
        case SET_PROGRAMS:
            return action.programs;
        default:
            return state;
    }
};
