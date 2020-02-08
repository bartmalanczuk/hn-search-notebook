import React from 'react';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';

import SearchResult from 'components/SearchResult';
import SearchField from 'components/SearchField';
import LoadMore from 'components/LoadMore';
import { getAllSearchResultsIds } from 'redux/modules/searchResults';

const SearchResultsView = () => {
  const searchResultsIds = useSelector(getAllSearchResultsIds());

  const searchResults = searchResultsIds.map((id) => <SearchResult id={id} />);

  return (
    <Container maxWidth="sm">
      <SearchField />
      { searchResults }
      <LoadMore />
    </Container>
  );
};

export default SearchResultsView;
