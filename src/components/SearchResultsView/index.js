import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import queryString from 'query-string';

import SearchResult from 'components/SearchResult';
import Form from 'components/Form';
import LoadMore from 'components/LoadMore';
import {
  getAllSearchResultsIds,
  fetchSearchResults,
} from 'redux/modules/searchResults';

const SearchResultsView = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchResultsIds = useSelector(getAllSearchResultsIds());

  const searchResults = searchResultsIds.map((id) => <SearchResult id={id} key={id} />);

  useEffect(() => {
    const query = queryString.parse(location.search).q;
    if (query) {
      dispatch(fetchSearchResults(query));
    }
  }, [dispatch, location.search])

  return (
    <Container maxWidth="sm">
      <Form
        label="Search"
        onSubmit={(text) => dispatch(fetchSearchResults(text))}
      />
      { searchResults }
      <LoadMore />
    </Container>
  );
};

export default SearchResultsView;
