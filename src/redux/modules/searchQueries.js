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
      };
    }
    default:
      return state;
  }
}

// Actions
export const runQuery = (text, pageNumber, createdAt, nbHits, nbPages) => ({
  type: RUN,
  payload: {
    query: {
      text,
      pageNumber,
      createdAt,
      nbHits,
      nbPages,
    },
  },
});

// Selectors
export const getLastSearchQueryId = () => (state) => state.searchQueries.allIds.slice(-1)[0];
export const getSearchQueryNumberOfPages = (id) => (state) => state.searchQueries.byId[id] && state.searchQueries.byId[id].nbPages;
export const getSearchQueryPageNumber = (id) => (state) => state.searchQueries.byId[id] && state.searchQueries.byId[id].pageNumber;
export const getSearchQueryText = (id) => (state) => state.searchQueries.byId[id] && state.searchQueries.byId[id].text;
