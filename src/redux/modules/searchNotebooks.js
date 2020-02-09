// Action types
const DELETE = 'searchNotebooks/DELETE';
const CREATE = 'searchNotebooks/CREATE';
const ADD_SEARCH_RESULT = 'searchNotebooks/ADD_SEARCH_RESULT';
const DELETE_SEARCH_RESULT = 'searchNotebooks/DELETE_SEARCH_RESULT';

// Reducer
const initialState = {
  allIds: [],
  byId: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE: {
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
          [nextId]: {
            title: action.payload.title,
            createdAt: action.payload.createdAt,
            savedSearchResults: []
          },
        },
      };
    }
    case DELETE:
      return {
        ...state,
        allIds: state.allIds.filter((id) => id !== action.payload.id),
        byId: Object.keys(state.byId).reduce((byId, id) => {
          if (id !== action.payload.id) {
            byId[id] = state.byId[id];
          }
          return byId
        }, {}),
      };
    case ADD_SEARCH_RESULT: {
      const notebookToUpdate = state.byId[action.payload.id];
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...notebookToUpdate,
            savedSearchResults: [
              ...notebookToUpdate.savedSearchResults,
              action.payload.savedSearchResultId,
            ].filter((id, index, savedSearchResults) => savedSearchResults.indexOf(id) === index),
          },
        },
      };
    }
    case DELETE_SEARCH_RESULT: {
      const notebookToUpdate = state.byId[action.payload.id];
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...notebookToUpdate,
            savedSearchResults: notebookToUpdate.savedSearchResults
              .filter((id) => id !== action.payload.savedSearchResultId),
          }
        }
      }
    }
    default:
      return state;
  }
}

// Actions & Thunks
export const deleteSearchNotebook = (id) => ({
  type: DELETE,
  payload: {
    id,
  },
});

export const createSearchNotebook = (title, createdAt) => ({
  type: CREATE,
  payload: {
    title,
    createdAt,
  },
});

export const addSavedSearchResultToNotebook = (id, savedSearchResultId) => ({
  type: ADD_SEARCH_RESULT,
  payload: {
    id,
    savedSearchResultId,
  },
});

export const deleteSavedSearchResultFromNotebook = (id, savedSearchResultId) => ({
  type: DELETE_SEARCH_RESULT,
  payload: {
    id,
    savedSearchResultId,
  },
});

// Selectors
export const getAllSearchNotebooksIds = () => (state) => state.searchNotebooks.allIds;
export const getSearchNotebookTitleById = (id) => (state) => state.searchNotebooks.byId[id].title;
export const getSearchNotebookCreatedAtById = (id) => (state) => new Date(state.searchNotebooks.byId[id].createdAt);
export const getSearchNotebookSavedSearchResults = (id) => (state) => state.searchNotebooks.byId[id].savedSearchResults;
