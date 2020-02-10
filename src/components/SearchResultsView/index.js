import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';

import SearchResult from 'components/SearchResult';
import Form from 'components/Form';
import Statistics from 'components/Statistics';
import LoadMore from 'components/LoadMore';
import {
  getAllSearchResultsIds,
} from 'redux/modules/searchResults';
import {
  getLastSearchQueryId,
  getSearchQueryText,
} from 'redux/modules/searchQueries';
import {
  search,
} from 'redux/modules/search';

const SearchResultsView = () => {
  const dispatch = useDispatch();
  const searchResultsIds = useSelector(getAllSearchResultsIds());
  const lastSearchQueryId = useSelector(getLastSearchQueryId());
  const queryText = useSelector(getSearchQueryText(lastSearchQueryId));
  const searchResults = searchResultsIds.map((id) => <SearchResult id={id} key={id} />);

  return (
    <Container maxWidth="sm">
      <Form
        label="Search"
        value={queryText}
        onSubmit={(searchText) => dispatch(search(searchText))}
      />
      <Statistics queryIds={[lastSearchQueryId]}/>
      { searchResults }
      <LoadMore />
    </Container>
  );
};

export default SearchResultsView;
