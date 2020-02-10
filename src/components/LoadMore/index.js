import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import {
  getAllSearchResultsIds,
} from 'redux/modules/searchResults';
import {
  getLastSearchQueryId,
  getSearchQueryText,
  getSearchQueryNumberOfPages,
  getSearchQueryPageNumber,
} from 'redux/modules/searchQueries';
import {
  search,
} from 'redux/modules/search';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
}));

const LoadMore = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const searchResultsIds = useSelector(getAllSearchResultsIds());
  const lastSearchQueryId = useSelector(getLastSearchQueryId());
  const queryText = useSelector(getSearchQueryText(lastSearchQueryId));
  const pageNumber = useSelector(getSearchQueryPageNumber(lastSearchQueryId));
  const numberOfPages = useSelector(getSearchQueryNumberOfPages(lastSearchQueryId));

  const loadNextPage = (event) => {
    dispatch(search(queryText, (pageNumber + 1)));
  };

  if (queryText && searchResultsIds.length > 0 && pageNumber < numberOfPages) {
    return (
      <div className={styles.wrapper}>
        <Button onClick={loadNextPage} variant="contained" color="primary" size="medium">
          Load more
        </Button>
      </div>
    )
  } else {
    return null;
  }
};

export default LoadMore;
