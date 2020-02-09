import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import NotebookSelect from 'components/NotebookSelect';
import timeFormatter from 'utils/timeFormatter';

const useStyles = makeStyles((theme) => ({
  searchResult: {
    marginBottom: theme.spacing(4),
  },
}));

const SearchResultCard = ({ id, title, author, createdAt, url }) => {
  const styles = useStyles();

  return (
    <Card className={styles.searchResult}>
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
        <NotebookSelect searchResultId={id} />
      </CardActions>
    </Card>
  );
};

export default SearchResultCard;
