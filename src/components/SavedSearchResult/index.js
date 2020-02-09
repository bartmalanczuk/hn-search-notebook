import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from '@material-ui/core/Link';

import SearchResultCard from 'components/SearchResultCard';
import {
  getSavedSearchResultTitleById,
  getSavedSearchResultAuthorById,
  getSavedSearchResultCreatedAtById,
  getSavedSearchResultUrlById,
} from 'redux/modules/savedSearchResults';
import {
  deleteSavedSearchResultFromNotebook,
} from 'redux/modules/searchNotebooks';

const SavedSearchResult = ({ id, notebookId }) => {
  const dispatch = useDispatch();
  const title = useSelector(getSavedSearchResultTitleById(id));
  const author = useSelector(getSavedSearchResultAuthorById(id));
  const createdAt = useSelector(getSavedSearchResultCreatedAtById(id));
  const url = useSelector(getSavedSearchResultUrlById(id));

  return (
    <div>
      <Link onClick={() => dispatch(deleteSavedSearchResultFromNotebook(notebookId, id))} component="button">
        Delete from notebook
      </Link>
      <SearchResultCard id={id} title={title} author={author} createdAt={createdAt} url={url} />
    </div>
  );
};

export default SavedSearchResult;
