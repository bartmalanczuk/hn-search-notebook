import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Statistics from 'components/Statistics';
import SavedSearchResult from 'components/SavedSearchResult';

import {
  getSearchNotebookTitleById,
  getSearchNotebookSavedSearchResults
} from 'redux/modules/searchNotebooks';
import {
  getSavedSearchResultsQueryIds,
} from 'redux/modules/savedSearchResults';

const SearchNotebookView = () => {
  const { id } = useParams();
  const title = useSelector(getSearchNotebookTitleById(id));
  const savedSearchResultsIds = useSelector(getSearchNotebookSavedSearchResults(id));
  const queryIds = useSelector(getSavedSearchResultsQueryIds(savedSearchResultsIds));

  const savedSearchResults = savedSearchResultsIds.map((savedSearchResultId) => (
    <SavedSearchResult id={savedSearchResultId} notebookId={id} key={savedSearchResultId}/>
  ));

  return (
    <Container maxWidth="sm">
      <Typography component="h2" variant="h2">
        { title }
      </Typography>
      <Statistics queryIds={queryIds}/>
      { savedSearchResults }
    </Container>
  );
};

export default SearchNotebookView;
