import React from 'react';
import { useSelector } from 'react-redux';

import SearchResultCard from 'components/SearchResultCard';
import {
  getSearchResultTitleById,
  getSearchResultAuthorById,
  getSearchResultCreatedAtById,
  getSearchResultUrlById,
} from 'redux/modules/searchResults';

const SearchResult = ({ id }) => {
  const title = useSelector(getSearchResultTitleById(id));
  const author = useSelector(getSearchResultAuthorById(id));
  const createdAt = useSelector(getSearchResultCreatedAtById(id));
  const url = useSelector(getSearchResultUrlById(id));

  return <SearchResultCard id={id} title={title} author={author} createdAt={createdAt} url={url} />;
};

export default SearchResult;
