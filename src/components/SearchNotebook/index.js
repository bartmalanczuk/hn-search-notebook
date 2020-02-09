import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import timeFormatter from 'utils/timeFormatter';
import {
  getSearchNotebookTitleById,
  getSearchNotebookCreatedAtById,
  deleteSearchNotebook,
} from 'redux/modules/searchNotebooks'

const useStyles = makeStyles((theme) => ({
  searchNotebook: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const SearchNotebook = ({ id }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const title = useSelector(getSearchNotebookTitleById(id));
  const createdAt = useSelector(getSearchNotebookCreatedAtById(id));

  return (
    <Card className={styles.searchNotebook}>
      <CardContent>
        <Typography component="h2" variant="h6">
          { title }
        </Typography>
        <Typography component="p" color="textSecondary">
          Created { timeFormatter.format(createdAt) }
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          to={`/notebooks/${id}`}
          component={RouterLink}
          size="small"
        >
          Open
        </Button>
        <Button
          onClick={() => dispatch(deleteSearchNotebook(id))}
          size="small"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default SearchNotebook;
