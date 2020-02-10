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
            queryId: action.payload.queryId,
          },
        }
      }
    default:
      return state;
  }
}

// Actions & thunks
export const saveSearchResult = (searchResult, queryId) => ({
  type: SAVE,
  payload: {
    searchResult,
    queryId,
  },
});

// Selectors
export const getSavedSearchResultTitleById = (id) => (state) => state.savedSearchResults.byId[id].searchResult.title;
export const getSavedSearchResultAuthorById = (id) => (state) => state.savedSearchResults.byId[id].searchResult.author;
export const getSavedSearchResultCreatedAtById = (id) => (state) => (new Date(state.savedSearchResults.byId[id].searchResult.created_at));
export const getSavedSearchResultUrlById = (id) => (state) => state.savedSearchResults.byId[id].searchResult.url;
export const getSavedSearchResultQueryId = (id) => (state) => state.savedSearchResults.byId[id].queryId;
export const getSavedSearchResultsQueryIds = (ids) => (state) =>
  ids.map(id => state.savedSearchResults.byId[id].queryId)
    .filter((id, index, queryIds) => queryIds.indexOf(id) === index);
