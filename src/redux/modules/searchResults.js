// Action types
const FETCH = 'searchResults/FETCH';
const NEXT_PAGE = 'searchResults/NEXT_PAGE';

// Reducer
const initialState = {
  allIds: [],
  byId: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        allIds: action.payload.searchResults.map((searchResult) => searchResult.objectID),
        byId: action.payload.searchResults.reduce(
          (byId, searchResult) => ({ ...byId, [searchResult.objectID]: searchResult }),
          {},
        ),
      };
    case NEXT_PAGE:
      return {
        ...state,
        allIds: [
          ...state.allIds,
          ...action.payload.searchResults.map((searchResult) => searchResult.objectID),
        ],
        byId: {
          ...state.byId,
          ...action.payload.searchResults.reduce(
            (byId, searchResult) => ({ ...byId, [searchResult.objectID]: searchResult }),
            {},
          ),
        },
      };
    default:
      return state;
  }
}

// Actions & Thunks
export const fetchSearchResults = (searchResults) => ({
  type: FETCH,
  payload: {
    searchResults,
  },
});

export const nextPageSearchResults = (searchResults) => ({
  type: NEXT_PAGE,
  payload: {
    searchResults,
  },
});

// Selectors
export const getAllSearchResultsIds = () => (state) => state.searchResults.allIds;
export const getSearchResultById = (id) => (state) => state.searchResults.byId[id];
export const getSearchResultTitleById = (id) => (state) => state.searchResults.byId[id].title;
export const getSearchResultAuthorById = (id) => (state) => state.searchResults.byId[id].author;
export const getSearchResultCreatedAtById = (id) => (state) => (new Date(state.searchResults.byId[id].created_at));
