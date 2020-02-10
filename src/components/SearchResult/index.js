import React from 'react';
import { useSelector } from 'react-redux';

import SearchResultCard from 'components/SearchResultCard';
import NotebookSelect from 'components/NotebookSelect';
import {
  getSearchResultTitleById,
  getSearchResultAuthorById,
  getSearchResultCreatedAtById,
} from 'redux/modules/searchResults';

const SearchResult = ({ id }) => {
  const title = useSelector(getSearchResultTitleById(id));
  const author = useSelector(getSearchResultAuthorById(id));
  const createdAt = useSelector(getSearchResultCreatedAtById(id));

  return (
    <SearchResultCard
      id={id}
      title={title}
      author={author}
      createdAt={createdAt}
    >
      <NotebookSelect searchResultId={id}/>
    </SearchResultCard>
  );
};

export default SearchResult;
