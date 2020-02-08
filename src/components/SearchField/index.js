import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { fetchSearchResults } from 'redux/modules/searchResults';

const useStyles = makeStyles(theme => ({
  form: {
    margin: `${theme.spacing(8)}px 0`,
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    flexGrow: '1',
    marginRight: theme.spacing(2),
  },
}));

const SearchField = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const onFormSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchSearchResults(query));
  };

  return (
    <form onSubmit={onFormSubmit} autoComplete="off" className={styles.form}>
      <TextField
        onChange={(event) => setQuery(event.target.value)}
        label="Search"
        variant="outlined"
        size="small"
        className={styles.searchInput}
      />
      <Button type="submit" variant="contained" color="primary" size="medium">Submit</Button>
    </form>
  );
};

export default SearchField;
