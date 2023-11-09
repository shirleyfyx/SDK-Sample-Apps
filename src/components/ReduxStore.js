import { createStore } from 'redux';

const SET_CREDENTIALS = 'SET_CREDENTIALS';

export const setCredentials = (credentials) => ({
  type: SET_CREDENTIALS,
  payload: credentials
});

const initialState = {
  credentials: {
    token: null,
    url: null,
    hostId: null
  },
};

const credentialsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CREDENTIALS:
      return { ...state, credentials: action.payload };
    default:
      return state;
  }
};

// Create store
const store = createStore(credentialsReducer);

export default store;
