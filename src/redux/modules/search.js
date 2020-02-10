import {
  fetchSearchResults,
  nextPageSearchResults,
} from './searchResults';
import {
  runQuery,
} from './searchQueries';

// Actions & Thunks
export const search = (searchText, page = 0) => async (dispatch) => {
  const response = await fetch(`http://hn.algolia.com/api/v1/search_by_date?tags=story&query=${searchText}&page=${page}`);
  const body = await response.json()

  dispatch(runQuery(searchText, page, new Date(), body.nbHits, body.nbPages));
  dispatch(page === 0 ? fetchSearchResults(body.hits) : nextPageSearchResults(body.hits));
};
