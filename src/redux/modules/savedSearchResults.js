// Action types
const SAVE = 'savedSearchResults/SAVE';

// Reducer
const initialState = {
  allIds: [],
  byId: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE:
      const id = action.payload.searchResult.objectID;
      return {
        ...state,
        allIds: [
          ...state.allIds,
          id,
        ].filter((id, index, allIds) => allIds.indexOf(id) === index),
        byId: {
          ...state.byId,
          [id]: {
            searchResult: action.payload.searchResult,
            query: action.payload.query,
          },
        }
      }
    default:
      return state;
  }
}

// Actions & thunks
export const saveSearchResult = (searchResult, query) => ({
  type: SAVE,
  payload: {
    searchResult,
    query
  },
});

// Selectors
export const getSavedSearchResultTitleById = (id) => (state) => state.savedSearchResults.byId[id].searchResult.title;
export const getSavedSearchResultAuthorById = (id) => (state) => state.savedSearchResults.byId[id].searchResult.author;
export const getSavedSearchResultCreatedAtById = (id) => (state) => (new Date(state.savedSearchResults.byId[id].searchResult.created_at));
export const getSavedSearchResultUrlById = (id) => (state) => state.savedSearchResults.byId[id].searchResult.url;
