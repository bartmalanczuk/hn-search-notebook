// Action types
const FETCH = 'searchResults/FETCH';
const NEXT_PAGE = 'searchResults/NEXT_PAGE';

// Reducer
const initialState = {
  allIds: [],
  byId: {},
  page: 0,
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
        page: action.payload.page,
        query: action.payload.query,
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
        page: action.payload.page,
        query: action.payload.query,
      };
    default:
      return state;
  }
}

// Thunks
export const fetchSearchResults = (query) => async (dispatch) => {
  const response = await fetch(`http://hn.algolia.com/api/v1/search?query=${query}`);
  const body = await response.json()

  dispatch({
    type: FETCH,
    payload: {
      searchResults: body.hits,
      query: query,
      page: 0,
    },
  });
}
export const nextPageSearchResults = (query, page) => async (dispatch) => {
  const response = await fetch(`http://hn.algolia.com/api/v1/search?query=${query}&page=${page}`);
  const body = await response.json()

  dispatch({
    type: NEXT_PAGE,
    payload: {
      searchResults: body.hits,
      query: query,
      page: 0,
    },
  });
}

// Selectors
export const getAllSearchResultsIds = () => (state) => state.searchResults.allIds;
export const getSearchResultById = (id) => (state) => state.searchResults.byId[id];
export const getSearchResultTitleById = (id) => (state) => state.searchResults.byId[id].title;
export const getSearchResultAuthorById = (id) => (state) => state.searchResults.byId[id].author;
export const getSearchResultCreatedAtById = (id) => (state) => (new Date(state.searchResults.byId[id].created_at));
export const getSearchResultUrlById = (id) => (state) => state.searchResults.byId[id].url;
export const getSearchResultsQuery = () => (state) => state.searchResults.query;
export const getSearchResultsPage = () => (state) => state.searchResults.page;
