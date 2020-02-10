// Action types
const RUN = 'searchQueries/RUN';

// Reducer
const initialState = {
  allIds: [],
  byId: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RUN: {
      const lastId = state.allIds[state.allIds.length - 1];
      const nextId = lastId || lastId === 0 ? lastId + 1 : 0;
      return {
        ...state,
        allIds: [
          ...state.allIds,
          nextId,
        ],
        byId: {
          ...state.byId,
          [nextId]: action.payload.query,
        }
      }
    }
    default:
      return state;
  }
}
// Actions

// Selectors
