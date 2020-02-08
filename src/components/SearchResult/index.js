import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import timeFormatter from 'utils/timeFormatter';
import {
  getSearchResultTitleById,
  getSearchResultAuthorById,
  getSearchResultCreatedAtById,
  getSearchResultUrlById,
} from 'redux/modules/searchResults';

const useStyles = makeStyles(theme => ({
  searchItem: {
    margin: `${theme.spacing(2)}px 0`,
  },
}));

const SearchResult = ({ id }) => {
  const styles = useStyles();
  const title = useSelector(getSearchResultTitleById(id));
  const author = useSelector(getSearchResultAuthorById(id));
  const createdAt = useSelector(getSearchResultCreatedAtById(id));
  const url = useSelector(getSearchResultUrlById(id));

  return (
    <Card className={styles.searchItem}>
      <CardContent>
        <Typography component="h2" variant="h6">
          { title }
        </Typography>
        <Typography component="p" color="textSecondary">
          Posted { timeFormatter.format(createdAt) } by { author }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={ url } target="_blank">Read</Button>
        <Button size="small">Add to Notebook</Button>
        <Button size="small">Go to query</Button>
      </CardActions>
    </Card>
  );
};

export default SearchResult;
