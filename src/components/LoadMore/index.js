import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import {
  getAllSearchResultsIds,
  getSearchResultsQuery,
  getSearchResultsPage,
  nextPageSearchResults
} from 'redux/modules/searchResults';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
}));

const LoadMore = () => {
  const styles = useStyles();
  const searchResultsIds = useSelector(getAllSearchResultsIds());
  const query = useSelector(getSearchResultsQuery());
  const page = useSelector(getSearchResultsPage());
  const dispatch = useDispatch();

  const loadNextPage = (event) => {
    dispatch(nextPageSearchResults(query, (page + 1)));
  };

  if (query && searchResultsIds.length > 0 && page < 50) {
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
